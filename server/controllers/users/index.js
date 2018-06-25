const response = require('../../libs/response');
const utils = require('../../libs/utils');
const mailer = require('../../libs/mailer');
const eventEmitter = require('../../libs/event-emitter');

const User = require('../../models/user');
const List = require('../../models/lists');
const Notification = require('../../models/notification');

const controller = {};

const generateResponse = (res, query, successMessage, successStatus) => {
  query
    .then(data => response.success(res, data, successMessage, successStatus))
    .catch(err => response.error(res, err.message, err.status));
};

controller.getAllUsers = (req, res) => {
  const query = User.getAll(req.query);
  generateResponse(res, query, 'Users found.');
};

controller.getAuthStatus = (req, res) => {
  const data = { authenticated: true, userId: req.user.userId };
  response.success(res, data, 'User authorized.');
};

controller.getLists = (req, res) => {
  const userId = req.user.userId;
  const page = req.query.page || 1;
  List.getByCreator(userId, page)
    .then(data => response.success(res, data, 'Lists found.'))
    .catch(err => response.error(res, err.message, err.status));
};

controller.getNotifications = (req, res) => {
  const userId = req.user.userId;
  const page = req.query.page || 1;
  Notification.getByUser(userId, page)
    .then(notifications => response.success(res, notifications, 'Notifications found'))
    .catch(err => response.error(res, err.message, err.status));
};

controller.getUserById = (req, res) => {
  User.getById(req.params.id)
    .then(user => {
      delete user.password;
      response.success(res, user, 'User found.');
    })
    .catch(err => response.error(res, err.message, err.status));
};

controller.getListsOfUser = (req, res) => {
  const userId = req.params.id;
  const page = req.query.page || 1;
  List.getByCreator(userId, page, true)
    .then(lists => response.success(res, lists, 'Lists found.'))
    .catch(err => response.error(res, err.message, err.status));
};

controller.getFriendsOfUser = (req, res) => {
  const userId = req.params.id;
  User.getFriends(userId)
    .then(friends => response.success(res, friends, 'Friends found.'))
    .catch(err => response.error(res, err.message, err.status));
};

controller.getFriendStatus = (req, res) => {
  const userId = req.user.userId;
  const friendId = req.params.id;
  User.getFriendStatus(userId, friendId)
    .then(data => response.success(res, data, 'Friend status.'))
    .catch(err => response.error(res, err.message, err.status));
};

controller.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    response.error(res, 'Email/Password not provided.', 400);
    return;
  }
  User.getByEmail(email)
    .then(user => {
      if (user.verified === false) {
        response.error(res, 'User is not verified.', 400);
        return;
      }
      utils.comparePassword(password, user.password)
        .then((same) => {
          if (same) {
            // generate json web token for authorization
            const token = utils.generateJwt({ userId: user.userId });
            res.cookie('token', token);
            delete user.password;
            response.success(res, user, 'Login successful.');
          } else {
            response.error(res, 'Password does not match.', 400);
          }
        })
        .catch(() => response.error(res));
    })
    .catch(err => response.error(res, err.message, err.status));
};

controller.signup = (req, res) => {
  let user = { firstname, lastname, email, password, mobile } = req.body;
  if (!firstname || !lastname || !email || !password || !mobile) {
    response.error(res, 'Some field is empty.', 400);
    return;
  }
  utils.hashPassword(password)
    .then(hash => {
      password = hash;
      User.create(firstname, lastname, email, password, mobile)
        .then(mailer.sendActivationMail)
        .then(user => response.success(res, user, 'Registration Successful.'))
        .catch(err => response.error(res, err && err.message, err && err.status));
    })
    .catch(err => response.error(res));
};

controller.logout = (req, res) => {
  res.clearCookie('token');
  eventEmitter.emit('logout', { userId: req.user.userId });
  response.success(res, null, 'Logout successful.');
};

controller.forgotPassword = (req, res) => {
  const email = req.body.email;
  User.getByEmail(email)
    .then(user => {
      if (!user.verified) {
        response.error(res, 'User is not verified.', 400);
      } else {
        return mailer.sendResetPasswordMail(user);
      }
    })
    .then(user => response.success(res, null, 'Password reset mail sent successfully.'))
    .catch(err => response.error(res, err.message, err.status));
};

controller.activateUser = (req, res) => {
  const userId = req.body.userId;
  User.activate(userId)
    .then(() => response.success(res, null, 'User verified.'))
    .catch(err => response.error(res, err.message, err.status));
};

controller.resetPassword = (req, res) => {
  let userId = null;
  const token = req.body.token;
  const password = req.body.password;
  if (!password) {
    response.error(res, 'Password not provided.', 400);
    return;
  }
  utils.verifyJwt(token)
    .then(data => {
      if (!data.userId) {
        return utils.promise(cb => cb.error({ message: 'Invalid token', status: 400 }));
      }
      userId = data.userId;
      return utils.hashPassword(password);
    })
    .then(hash => User.update(userId, { password: hash }))
    .then(user => response.success(res, user, 'Password reset successful.'))
    .catch(err => response.error(res, err.message, err.status));
};

controller.sendFriendRequest = (req, res) => {
  const senderId = req.user.userId;
  const receiverId = req.params.id;
  if (senderId === receiverId) {
    response.error(res, 'Invalid request.', 400);
  } else {
    User.sendFriendRequest(senderId, receiverId)
      .then(() => createNotification('sent-request', req.user, receiverId))
      .then(() => response.success(res, null, 'Friend request sent.'))
      .catch(err => response.error(res, err.message, err.status));
  }
};

controller.acceptFriendRequest = (req, res) => {
  const senderId = req.params.id;
  const receiverId = req.user.userId;
  if (senderId === receiverId) {
    response.error(res, 'Invalid request.', 400);
  } else {
    User.acceptFriendRequest(senderId, receiverId)
      .then(() => createNotification('accepted-request', req.user, senderId))
      .then(() => response.success(res, null, 'Friend request accepted.'))
      .catch(err => response.error(res, err.message, err.status));
  }
};

controller.rejectFriendRequest = (req, res) => {
  const senderId = req.params.id;
  const receiverId = req.user.userId;
  if (senderId === receiverId) {
    response.error(res, 'Invalid Request.', 400);
  } else {
    User.rejectFriendRequest(senderId, receiverId)
      .then(() => createNotification('rejected-request', req.user, senderId))
      .then(() => response.success(res, null, 'Friend request rejected.'))
      .catch(err => response.error(res, err.message, err.status));
  }
};

controller.unfriend = (req, res) => {
  const userId = req.user.userId;
  const friendId = req.params.id;
  if (userId === friendId) {
    response.error(res, 'Invalid request.', 400);
  } else {
    User.unfriend(userId, friendId)
      .then(() => createNotification('unfriended', req.user, friendId))
      .then(() => response.success(res, null, 'Unfriended successfully.'))
      .catch(err => response.error(res, err.message, err.status));
  }
};

controller.deleteAllNotifications = (req, res) => {
  const userId = req.user.userId;
  Notification.deleteByUser(userId)
    .then(() => response.success(res, null, 'All notifications deleted.'))
    .catch(err => response.error(res, err.message, err.status));
};

controller.deleteNotificationById = (req, res) => {
  const notificationId = req.params.id;
  Notification.deleteById(notificationId)
    .then(() => response.success(res, null, 'Notifcation deleted.'))
    .catch(err => response.error(res, err.message, err.status));
};

module.exports = controller;

function createNotification(notificationType, user, ...notificationFor) {
  const data = {
    userId: user.userId,
    userName: user.name,
    type: notificationType
  };
  // FIXME: on error also sends success response
  return utils.promise(cb => {
    Notification.create('friend', data, notificationFor)
      .then(notifications => {
        notifications.forEach(notification => {
          eventEmitter.emit('notification', notification);
        })
        cb.success();
      })
      .catch(err => cb.success());
  });
}