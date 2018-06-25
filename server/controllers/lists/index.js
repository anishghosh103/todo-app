const response = require('../../libs/response');
const utils = require('../../libs/utils');
const eventEmitter = require('../../libs/event-emitter');

const List = require('../../models/lists');
const Notification = require('../../models/notification');
const User = require('../../models/user');

const controller = {};

controller.getListById = (req, res) => {
  const listId = req.params.id;
  List.getById(listId, true)
    .then(list => {
      response.success(res, list, 'List found.');
    })
    .catch(err => response.error(res, err.message, err.status));
};

controller.createList = (req, res) => {
  const creatorId = req.user.userId;
  const name = req.body.name;
  const private = req.body.personal !== undefined ? req.body.personal : true;
  if (!name) {
    response.error(res, 'List name not provided.', 400);
  } else {
    List.createList(creatorId, name, private)
      .then(list => {
        response.success(res, list, 'List created successfully.');
        createNotification('created', list, req.user, { list });
      })
      .catch(err => response.error(res, err.message, err.status));
  }
};

controller.addTask = (req, res) => {
  const listId = req.params.id;
  const description = req.body.description;
  if (!description) {
    response.error(res, 'Task description not provided.', 400);
  } else {
    validateUserForListModification(listId, req.user.userId)
      .then(() => List.addTask(listId, description))
      .then(data => {
        response.success(res, data.task, 'Task added successfully.');
        createNotification('added-task', data.list, req.user, { task: data.task });
      })
      .catch(err => response.error(res, err.message, err.status));
  }
};

controller.addSubtask = (req, res) => {
  const userId = req.user.userId;
  const listId = req.params.listId;
  const taskId = req.params.taskId;
  const description = req.body.description;
  if (!description) {
    response.error(res, 'Subtask description not provided.', 400);
  } else {
    validateUserForListModification(listId, userId)
      .then(() => List.addTask(listId, description, taskId))
      .then(data => {
        response.success(res, data.task, 'Subtask added successfully.');
        createNotification('added-subtask', data.list, req.user, {
          parentTask: data.list.tasks.find(task => task.taskId === taskId),
          subtask: data.task
        });
      })
      .catch(err => response.error(res, err.message, err.status));
  }
};

controller.undoList = (req, res) => {
  const listId = req.params.id;
  validateUserForListModification(listId, req.user.userId)
    .then(() => List.undo(listId))
    .then(list => {
      response.success(res, list, 'Undo successful.');
      createNotification('undo', list, req.user, { list });
    })
    .catch(err => response.error(res, err.message, err.status));
};

controller.doneTask = (req, res) => {
  const listId = req.params.listId;
  const taskId = req.params.taskId;
  validateUserForListModification(listId, req.user.userId)
    .then(() => List.doneTask(listId, taskId))
    .then(list => {
      response.success(res, list, 'Task updated successfully.');
      createNotification('done-task', list, req.user, {
        task: list.tasks.find(task => task.taskId === taskId)
      });
    })
    .catch(err => response.error(res, err.message, err.status));
  };
  
controller.deleteTask = (req, res) => {
  const listId = req.params.listId;
  const taskId = req.params.taskId;
  validateUserForListModification(listId, req.user.userId)
    .then(() => List.deleteTask(listId, taskId))
    .then(data => {
      response.success(res, data.list, 'Task deleted successfully.');
      createNotification('deleted-task', data.list, req.user, {
        task: data.tasks.find(task => task.taskId === taskId)
      });
    })
    .catch(err => response.error(res, err.message, err.status));
  };
  
controller.editTask = (req, res) => {
  const listId = req.params.listId;
  const taskId = req.params.taskId;
  const description = req.body.description;
  if (!description) {
    response.error(res, 'Task description not provided.', 400);
  } else {
    validateUserForListModification(listId, req.user.userId)
      .then(() => List.editTask(listId, taskId, description))
      .then(data => {
        response.success(res, data.list, 'Task edited successfully.');
        createNotification('edited-task', data.list, req.user, {
          taskId: taskId,
          oldTask: data.oldDescription,
          newTask: description
        });
      })
      .catch(err => response.error(res, err.message, err.status));
  }
};

controller.deleteList = (req, res) => {
  const listId = req.params.id;
  List.validateCreator(listId, req.user.userId)
    .then(valid => {
      if (valid) {
        return List.delete(listId);
      } else {
        response.error(res, 'You are not authorized to delete this list.', 401);
      }
    })
    .then(list => {
      response.success(res, null, 'List deleted successfully.');
      createNotification('deleted-list', list, req.user);
    })
    .catch(err => response.error(res, err.message, err.status));
};

module.exports = controller;

function validateUserForListModification(listId, userId) {
  const unauthorizedError = { message: 'You are not authorized to modify this list.', status: 401 };
  return utils.promise(cb => {
    List.getById(listId)
      .then(list => {
        const creatorId = list.creatorId;
        if (creatorId === userId) {
          cb.success();
        } else if (list.private === false) {
          User.getFriendIds(creatorId)
            .then(friendIds => {
              if (friendIds.includes(userId)) {
                cb.success();
              } else {
                cb.error(unauthorizedError);
              }
            })
            .catch(err => cb.error(err));
        } else {
          cb.error(unauthorizedError);
        }
      })
      .catch(err => cb.error(err));
  });
}

/**
 * Creates a notification
 * @param {String} type Type of notification
 * @param {Object} list List object
 * @param {Object} user User object
 * @param {Object} data Notification data
 * @param {Object} successData Optional. If provided returned as success response of promise otherwise list is returned.
 */
function createNotification(type, list, user, data = {}, successData = null) {
  return utils.promise(cb => {
    data.userId = user.userId;
    data.userName = user.name;
    data.listId = list.listId;
    data.listName = list.name;
    data.listCreatorId = list.creatorId;
    data.type = type;
    
    if (list.private) {
      eventEmitter.emit('private-list-update', data);
      cb.success(successData || list);
      return;
    }

    eventEmitter.emit('list-update', data);

    User.getFriendIds(list.creatorId)
      .then(friendIds => {
        if (friendIds && friendIds.length > 0) {
          friendIds = friendIds.map(friendId => friendId === user.userId ? list.creatorId : friendId);
          return Notification.create('list', data, friendIds);
        }
      })
      .then(notifications => {
        notifications.forEach(notification => eventEmitter.emit('notification', notification));
        cb.success(successData || list);
      })
      .catch(err => {
        console.log(err);
        cb.success(successData || list);
      });
  });
}