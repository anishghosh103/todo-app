const express = require('express');

const auth = require('../../middlewares/auth');
const controller = require('../../controllers/lists');

const router = express.Router();

router.get('/:id', auth, controller.getListById);

router.post('/', auth, controller.createList);
router.post('/:id', auth, controller.addTask);
router.post('/:listId/tasks/:taskId', auth, controller.addSubtask);

router.put('/:id/undo', auth, controller.undoList);
router.put('/:listId/tasks/:taskId/done', auth, controller.doneTask);
router.put('/:listId/tasks/:taskId/delete', auth, controller.deleteTask);
router.put('/:listId/tasks/:taskId/edit', auth, controller.editTask);

router.delete('/:id', auth, controller.deleteList);

module.exports = router;