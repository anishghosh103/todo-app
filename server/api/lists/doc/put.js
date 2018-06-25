/**
 * @api {put} /api/lists/:id/undo Undo the last operation on a list
 * @apiName UndoList
 * @apiGroup List
 * @apiPermission User
 * 
 * @apiParam {String} id List Id. (URL Parameter)
 * 
 * @apiSuccessExample Success Response (200)
 * {
 *  error: false,
 *  message: 'Undo successful.',
 *  status: 200,
 *  data: {
 *    listId: String,
 *    creatorId: String,
 *    name: String,
 *    tasks: [{
 *      taskId: String,
 *      description: String
 *      done: Boolean,
 *      parentTask: String,
 *      createdAt: Date
 *    }],
 *    state: Number,
 *    createdAt: Date,
 *    private: Boolean
 *  }
 * }
 * @apiUse ListError401
 * @apiUse ListError404
 * @apiUse Error500
 */

/**
 * @api {put} /api/lists/:listId/tasks/:taskId/done Toggle task done
 * @apiName ToggleTaskDone
 * @apiGroup List
 * @apiPermission User
 * 
 * @apiParam {String} listId List Id. (URL Parameter)
 * @apiParam {String} taskId Task Id. (URL Parameter)
 * 
 * @apiSuccessExample Success Response (200)
 * {
 *  error: false,
 *  message: 'Task updated successfully.',
 *  status: 200,
 *  data: {
 *    listId: String,
 *    creatorId: String,
 *    name: String,
 *    tasks: [{
 *      taskId: String,
 *      description: String
 *      done: Boolean,
 *      parentTask: String,
 *      createdAt: Date
 *    }],
 *    state: Number,
 *    createdAt: Date,
 *    private: Boolean
 *  }
 * }
 * @apiUse ListError401
 * @apiUse ListError404
 * @apiUse Error500
 */

/**
 * @api {put} /api/lists/:listId/tasks/:taskId/delete Delete task
 * @apiName DeleteTask
 * @apiGroup List
 * @apiPermission User
 * 
 * @apiParam {String} listId List Id. (URL Parameter)
 * @apiParam {String} taskId Task Id. (URL Parameter)
 * 
 * @apiSuccessExample Success Response (200)
 * {
 *  error: false,
 *  message: 'Task deleted successfully.',
 *  status: 200,
 *  data: {
 *    listId: String,
 *    creatorId: String,
 *    name: String,
 *    tasks: [{
 *      taskId: String,
 *      description: String
 *      done: Boolean,
 *      parentTask: String,
 *      createdAt: Date
 *    }],
 *    state: Number,
 *    createdAt: Date,
 *    private: Boolean
 *  }
 * }
 * @apiUse ListError401
 * @apiUse ListError404
 * @apiUse Error500
 */

/**
 * @api {put} /api/lists/:listId/tasks/:taskId/edit Edit task
 * @apiName EditTask
 * @apiGroup List
 * @apiPermission User
 * 
 * @apiParam {String} listId List Id. (URL Parameter)
 * @apiParam {String} taskId Task Id. (URL Parameter)
 * @apiParam {String} description Task Description. (Body Parameter)
 * 
 * @apiSuccessExample Success Response (200)
 * {
 *  error: false,
 *  message: 'Task edited successfully.',
 *  status: 200,
 *  data: {
 *    listId: String,
 *    creatorId: String,
 *    name: String,
 *    tasks: [{
 *      taskId: String,
 *      description: String
 *      done: Boolean,
 *      parentTask: String,
 *      createdAt: Date
 *    }],
 *    state: Number,
 *    createdAt: Date,
 *    private: Boolean
 *  }
 * }
 * 
 * @apiErrorExample Error Response (400)
 * {
 *  error: true,
 *  message: 'Task description not provided.',
 *  status: 400,
 *  data: null
 * }
 * @apiUse ListError401
 * @apiUse ListError404
 * @apiUse Error500
 */