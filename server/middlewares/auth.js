const response = require('../libs/response');
const utils = require('../libs/utils');

const User = require('../models/user');

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    utils.verifyJwt(token)
      .then(decodedToken => {
        User.getById(decodedToken.userId)
          .then(user => {
            req.user = user;
            next();
          })
          .catch(err => response.error(res));
      })
      .catch(err => response.error(res, 'You are not authorized to access this route.', 401));
  } else {
    response.error(res, 'You are not authorized to access this route.', 401);
  }
};