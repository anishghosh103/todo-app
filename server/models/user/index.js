const shortid = require('shortid');

const User = require('./user.model');
const Friend = require('./friend.model');

const utils = require('../../libs/utils');

const actions = {};
const selectArgs = '-_id -__v';
const unknownError = { message: 'Error occurred.', status: 500 };

actions.getAll = ({ term, page = 1 }) => {
  const pageLength = 20;
  term = term || '';
  return utils.promise(cb => {
    User.find({ name: new RegExp(term, 'i'), verified: true })
    .select(selectArgs + ' -password')
    .skip((page - 1) * pageLength).limit(pageLength + 1)
    .lean().exec()
      .then(users => {
        cb.success({
          more: users.length > pageLength,
          users: users.slice(0, pageLength)
        });
      })
      .catch(err => cb.error(unknownError));
  });
};

actions.getById = (userId) => {
  return utils.promise(cb => {
    User.findOne({ userId })
      .select(selectArgs)
      .lean().exec()
      .then(user => {
        if (user) {
          cb.success(user);
        } else {
          cb.reject({ message: 'User not found.', status: 404 });
        }
      })
      .catch(err => cb.error(unknownError));
  });
};

actions.getByEmail = (email) => {
  return utils.promise(cb => {
    User.findOne({ email })
      .select(selectArgs)
      .lean().exec()
      .then(user => {
        if (user) {
          cb.success(user);
        } else {
          cb.error({ message: 'User not found', status: 404 });
        }
      })
      .catch(err => cb.error(unknownError));
  });
};

actions.getFriends = (userId) => {
  return utils.promise(cb => {
    actions.getById(userId)
      .then(user => Friend.find({ users: userId, status: 'friend' }).exec())
      .then(friends => {
        const promises = friends.map(friend => {
          const friendId = friend.users[0] === userId ? friend.users[1] : friend.users[0];
          return actions.getById(friendId);
        });
        return Promise.all(promises);
      })
      .then(friends => cb.success(friends))
      .catch(err => cb.error(err));
  });
};

actions.getFriendIds = (userId) => {
  return utils.promise(cb => {
    Friend.find({ users: userId, status: 'friend' })
      .select('users').exec()
      .then(friends => {
        cb.success(friends.map(
          friends => friends.users[0] === userId ? friends.users[1] : friends.users[0])
        );
      })
      .catch(err => cb.error(unknownError));
  });
};

actions.getFriendStatus = (userId, friendId) => {
  return utils.promise(cb => {
    actions.getById(userId)
      .then(() => {
        getFriendDocument(userId, friendId)
          .then(friend => {
            if (friend) {
              cb.success({ status: friend.status, request: friend.users });
            } else {
              cb.success({ status: 'not-friend' });
            }
          })
          .catch(err => cb.error(unknownError));
      })
      .catch(err => cb.error(err));
  });
};

actions.create = (firstname, lastname, email, password, mobile) => {
  return utils.promise(cb => {
    actions.getByEmail(email)
      .then(() => cb.error({ message: 'Email already present.', status: 400 }))
      .catch(err => {
        if (err.status === 404) {
          const user = {
            firstname, lastname, email, password, mobile,
            name: `${firstname} ${lastname}`,
            userId: shortid.generate(),
            verified: false
          };
          new User(user).save((err, result) => {
            if (err) {
              cb.error(unknownError);
            } else {
              delete user.password;
              cb.success(user);
            }
          });
        } else {
          cb.error(err);
        }
      });
  });
};

actions.activate = (userId) => {
  return utils.promise(cb => {
    User.findOne({ userId })
      .exec()
      .then(user => {
        if (user) {
          user.verified = true;
          user.save((err, result) => {
            if (err) {
              cb.error(unknownError);
            } else {
              cb.success();
            }
          });
        } else {
          cb.error({ message: 'User not found.', status: 404 });
        }
      })
      .catch(err => cb.error(unknownError));
  });
};

actions.update = (userId, { email, password, mobile }) => {
  return utils.promise(cb => {
    User.findOne({ userId })
      .exec()
      .then(user => {
        if (user) {
          user.email = email || user.email;
          user.password = password || user.password;
          user.mobile = mobile || user.mobile;
          user.save((err, result) => {
            if (err) {
              cb.error(unknownError);
            } else {
              cb.success({
                userId,
                firstname: user.firstname,
                lastname: user.lastname,
                email: result.email,
                mobile: result.mobile
              });
            }
          });
        } else {
          cb.error({ message: 'User not found.', status: 404 });
        }
      })
      .catch(err => cb.error(unknownError));
  });
};

actions.sendFriendRequest = (senderId, receiverId) => {
  return utils.promise(cb => {
    actions.getById(senderId)
      .then(() => getFriendDocument(senderId, receiverId))
      .then(friend => {
        if (friend) {
          const message = friend.status === 'friend' ? 'Already friends.' : 'Request Pending.';
          cb.error({ message: message, status: 400 });
        } else {
          new Friend({ users: [senderId, receiverId], status: 'request-pending' })
          .save((err, result) => {
            if (err) {
              cb.error(unknownError);
            } else {
              cb.success();
            }
          });
        }
      })
      .catch(err => cb.error(err));
  });
};

actions.acceptFriendRequest = (senderId, receiverId) => {
  return utils.promise(cb => {
    getFriendDocument(senderId, receiverId, 'request-pending')
      .then(friend => {
        if (friend) {
          friend.status = 'friend';
          friend.save((err, result) => {
            if (err) {
              cb.error(unknownError);
            } else {
              cb.success();
            }
          });
        } else {
          cb.error({ message: 'No request found.', status: 404 });
        }
      })
      .catch(err => cb.error(err || unknownError));
  });
};

actions.rejectFriendRequest = (senderId, receiverId) => {
  return utils.promise(cb => {
    getFriendDocument(senderId, receiverId, 'request-pending')
      .then(request => {
        if (request) {
          return request.remove();
        } else {
          cb.error({ message: 'Request not found.', status: 404 });
        }
      })
      .then(() => cb.success())
      .catch(err => cb.error(unknownError));
  });
};

actions.unfriend = (userId, friendId) => {
  return utils.promise(cb => {
    getFriendDocument(userId, friendId)
      .then(friend => {
        if (friend) {
          friend.remove(err => {
            if (err) {
              cb.error(unknownError);
            } else {
              cb.success();
            }
          });
        } else {
          cb.error({ message: 'Invalid request.', status: 400 });
        }
      })
      .catch(err => cb.error(err));
  });
};

module.exports = actions;

function getFriendDocument(userId, friendId, status) {
  const findParam = { users: userId };
  if (status) {
    findParam.status = status;
  }
  return utils.promise(cb => {
    Friend.find(findParam).exec()
      .then(friends => {
        const friend = friends.find(friend => friend.users.includes(friendId));
        cb.success(friend === undefined ? null : friend);
      })
      .catch(err => cb.error(unknownError));
  });
}