const shortid = require('shortid');

const utils = require('../../libs/utils');

const List = require('./list.model');
const ListUpdate = require('./list-update.model');

const actions = {};
const unknownError = { message: 'Error occurred.', status: 500 };

actions.getById = (listId, fromClient = false) => {
  return utils.promise(cb => {
    List.findOne({ listId })
      .exec()
      .then(list => {
        if (list) {
          cb.success(list);
        } else {
          cb.error({ message: 'List not found.', status: 404 });
        }
      })
      .catch(err => cb.error(unknownError));
  });
};

actions.getByCreator = (creatorId, page = 1, onlyPublicLists = false) => {
  const queryArgs = { creatorId };
  if (onlyPublicLists) { queryArgs.private = false; }
  return utils.promise(cb => {
    const pageLength = 10;
    List.find(queryArgs)
      .sort('-createdAt')
      .skip((page - 1) * pageLength).limit(pageLength + 1)
      .lean().exec()
      .then(lists => {
        cb.success({
          more: lists.length > pageLength,
          lists: lists.slice(0, pageLength)
        });
      })
      .catch(err => cb.error(unknownError));
  });
};

actions.validateCreator = (listId, userId) => {
  return utils.promise(cb => {
    actions.getById(listId)
      .then(list => cb.success(list.creatorId === userId))
      .catch(err => cb.error(err));
  });
};

actions.createList = (creatorId, name, private = true) => {
  return utils.promise(cb => {
    List.findOne({ name, creatorId })
      .exec()
      .then(list => {
        if (list) {
          cb.error({ message: 'List name already present.', status: 400 });
        } else {
          const newList = new List({
            creatorId, name, listId: shortid.generate(),
            tasks: [], state: 0, createdAt: Date.now(), private
          });
          return saveModel(newList);
        }
      })
      .then(list => cb.success(list))
      .catch(err => cb.error(unknownError));
  });
};

actions.delete = (listId) => {
  return utils.promise(cb => {
    actions.getById(listId)
      .then(list => {
        const deletedList = {
          listId: list.listId,
          name: list.name,
          creatorId: list.creatorId,
          private: list.private,
          createdAt: list.createdAt
        };
        list.remove((err) => {
          if (err) {
            cb.error(unknownError);
          } else {
            ListUpdate.remove({ listId }, (err) => {
              if (err) { console.log(err); }
            });
            cb.success(deletedList);
          }
        });
      })
      .catch(err => cb.error(err));
  });
};

actions.addTask = (listId, taskDescription, parentTask = '') => {
  const task = {
    taskId: shortid.generate(),
    description: taskDescription,
    done: false,
    parentTask,
    createdAt: Date.now()
  };
  return utils.promise(cb => {
    actions.getById(listId)
      .then(list => {
        list.tasks = [task, ...list.tasks];
        list.state = list.state + 1;
        return saveModel(list);
      })
      .then(list => onListUpdate(list, { taskId: task.taskId }, 'task-added'))
      .then(list => cb.success({ list, task }))
      .catch(err => cb.error(err));
  });
};

actions.undo = (listId) => {
  let undoneData = null;
  return utils.promise(cb => {
    actions.getById(listId)
      .then(list => {
        ListUpdate.findOne({ listId, updatedState: list.state })
          .exec()
          .then(update => {
            undoneData = update;
            return undoList(list, update);
          })
          .then(() => saveModel(list))
          .then(list => cb.success(list))
          .catch(err => cb.error(err || unknownError));
      })
      .catch(err => cb.error(err));
  });
};

actions.doneTask = (listId, taskId) => {
  return utils.promise(cb => {
    actions.getById(listId)
      .then(list => {
        let task = list.tasks.find(task => task.taskId === taskId);
        task.done = !task.done;
        list.state = list.state + 1;
        return saveModel(list);
      })
      .then(list => onListUpdate(list, { taskId }, 'task-toggle-done'))
      .then(list => cb.success(list))
      .catch(err => cb.error(err));
  });
};

actions.deleteTask = (listId, taskId) => {
  let tasks = {};
  return utils.promise(cb => {
    actions.getById(listId)
      .then(list => {
        tasks = list.tasks.filter(task => task.taskId === taskId || task.parentTask === taskId);
        list.tasks = list.tasks.filter(task => task.taskId !== taskId && task.parentTask !== taskId);
        list.state = list.state + 1;
        return saveModel(list);
      })
      .then(list => onListUpdate(list, { tasks }, 'task-deleted'))
      .then(list => cb.success({list, tasks}))
      .catch(err => cb.error(err));
  });
};

actions.editTask = (listId, taskId, description) => {
  let oldDescription = '';
  return utils.promise(cb => {
    actions.getById(listId)
      .then(list => {
        oldDescription = list.tasks.find(task => task.taskId === taskId).description;
        list.tasks = list.tasks.map(task => {
          if (task.taskId === taskId) {
            task.description = description;
          }
          return task;
        });
        list.state = list.state + 1;
        return saveModel(list);
      })
      .then(list => onListUpdate(list, { taskId, oldDescription }, 'task-edited'))
      .then(list => cb.success({ list, oldDescription }))
      .catch(err => cb.error(err));
  });
};

module.exports = actions;

function saveModel(model, successValue) {
  return utils.promise(cb => {
    model.save((err, result) => {
      if (err) {
        cb.error(unknownError);
      } else {
        cb.success(successValue || result);
      }
    });
  });
}

function undoList(list, update) {
  if (!update) {
    return utils.promise(cb => {
      cb.error({ message: 'No operations left to undo.', status: 404 });
    });
  }
  const undoActions = {
    'task-added': () => {
      const taskId = update.data.taskId;
      list.tasks = list.tasks.filter(task => task.taskId !== taskId);
    },
    'task-toggle-done': () => {
      const taskId = update.data.taskId;
      list.tasks = list.tasks.map(task => {
        if (task.taskId === taskId) {
          task.done = !task.done;
        }
        return task;
      });
    },
    'task-deleted': () => {
      const tasks = update.data.tasks;
      list.tasks = [...tasks, ...list.tasks];
    },
    'task-edited': () => {
      const taskId = update.data.taskId;
      const description = update.data.oldDescription;
      list.tasks = list.tasks.map(task => {
        if (task.taskId === taskId) {
          task.description = description;
        }
        return task;
      });
    }
  };
  undoActions[update.type]();
  list.state = list.state - 1;
  return utils.promise(cb => {
    update.remove(err => {
      if (err) {
        cb.error(unknownError);
      } else {
        cb.success();
      }
    });
  });
}

function onListUpdate(list, data, updateType) {
  const update = {
    listId: list.listId,
    type: updateType,
    updatedState: list.state,
    data
  };
  return utils.promise(cb => {
    new ListUpdate(update)
      .save((err) => {
        if (err) {
          cb.error(unknownError);
        } else {
          cb.success(list);
        }
      });
  });
}