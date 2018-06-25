const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config/app.config');

const utils = {};

utils.promise = (callback) => {
  return new Promise((resolve, reject) => {
    const obj = {};
    callback({
      set: (key, value) => obj[key] = value,
      success: (data) => resolve(data !== undefined ? data : obj),
      error: (data) => reject(data !== undefined ? data : obj)
    });
  });
};

utils.iterator = (array, callback) => {
  let index = 0;
  let halt = false;
  return utils.promise(cb => {
    if (array.length === 0) {
      cb.success();
      return;
    }
    const param = {};
    param.data = array[index++];
    param.next = () => {
      if (!halt && index < array.length) {
        param.data = array[index++];
        callback(param);
      } else {
        cb.success();
      }
    };
    param.stop = () => {
      halt = true;
      cb.success();
    };
    param.error = err => cb.error(err);
    callback(param);
  });
};

utils.verifyJwt = (token, secret) => {
  return utils.promise(cb => {
    jwt.verify(token, secret || config.secret, (err, decodedToken) => {
      if (err || !decodedToken) {
        cb.error({ message: 'Invalid token', status: 400 });
      } else {
        cb.success(decodedToken);
      }
    });
  });
};

utils.generateJwt = (payload, secret = config.secret) => {
  return jwt.sign(payload, secret);
};

utils.decodeJwt = (token, key) => {
  return jwt.decode(token);
};

utils.tokenExpired = (token) => {
  const decodedToken = jwt.decode(token);
  if (decodedToken.exp) {
    return new Date(decodedToken.exp).getTime() - Date.now() <= 0;
  } else {
    return true;
  }
};

utils.comparePassword = (value, hash) => {
  return utils.promise(cb => {
    bcrypt.compare(value, hash, (err, same) => {
      if (err) {
        cb.error();
      } else {
        cb.success(same);
      }
    });
  });
};

utils.hashPassword = (value) => {
  return utils.promise(cb => {
    bcrypt.hash(value, 10, (err, hash) => {
      if (err) {
        cb.error();
      } else {
        cb.success(hash);
      }
    });
  });
};

module.exports = utils;