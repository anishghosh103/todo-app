const shortid = require('shortid');

const utils = require('../../libs/utils');

const Notification = require('./notification');

const actions = {};
const unknownError = { message: 'Error occurred.', status: 500 };

actions.getByUser = (userId, page = 1) => {
  const pageLength = 20;
  return utils.promise(cb => {
    Notification.find({ userId })
      .select('-_id -__v')
      .exec()
      .then(notifications => {
        const count = notifications.length;
        const offset = (page - 1) * pageLength;
        cb.success({
          total: count,
          notifications: notifications.slice(offset, offset + pageLength)
        });
      })
      .catch(err => cb.error(unknownError));
  });
};

actions.create = (type, data, users) => {
  const notification = {
    type, data,
    createdAt: Date.now()
  };
  const promises = users.map(userId => utils.promise(cb => {
    notification.userId = userId;
    notification.notificationId = shortid.generate();
    new Notification(notification)
      .save((err, result) => {
        if (err) {
          console.log(err);
          cb.error(unknownError);
        } else {
          cb.success(result);
        }
      });
  }));
  return utils.promise(cb => {
    Promise.all(promises)
      .then(notifications => cb.success(notifications))
      .catch(err => cb.error(err));
  });
};

actions.deleteById = (notificationId) => {
  return utils.promise(cb => {
    Notification.remove({ notificationId }, err => {
      if (err) {
        cb.error(unknownError);
      } else {
        cb.success();
      }
    });
  });
};

actions.deleteByUser = (userId) => {
  return utils.promise(cb => {
    Notification.remove({ userId }, err => {
      if (err) {
        cb.error(unknownError);
      } else {
        cb.success();
      }
    });
  });
};

module.exports = actions;