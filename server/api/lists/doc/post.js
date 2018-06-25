/**
 * @api {post} /api/lists/ Create new list
 * @apiName CreateNewList
 * @apiGroup List
 * @apiPermission User
 * 
 * @apiParam {String} name List name. (Body Parameter)
 * @apiParam {Boolean} [personal=true] If personal is true, then list will be accessed only by the creator, otherwise it can be accessed by him as well as any of his friends. (Body Parameter)
 * 
 * @apiSuccessExample Success Response (200)
 * {
 *  error: false,
 *  message: 'List created successfully.',
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
 *  message: 'List name not provided.',
 *  status: 400,
 *  data: null
 * }
 * @apiErrorExample Error Response (400)
 * {
 *  error: true,
 *  message: 'List name already present.',
 *  status: 400,
 *  data: null
 * }
 * @apiUse Error500
 */

/**
 * @api {post} /api/lists/:id Add task
 * @apiName AddTask
 * @apiGroup List
 * @apiPermission User
 * 
 * @apiParam {String} id List Id. (URL Parameter)
 * @apiParam {String} description Task description. (Body Parameter)
 * 
 * @apiSuccessExample Success Response (200)
 * {
 *  error: false,
 *  message: 'Task added successfully.',
 *  status: 200,
 *  data: {
 *    taskId: String,
 *    description: String
 *    done: Boolean,
 *    parentTask: String,
 *    createdAt: Date
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

/**
 * @api {post} /api/lists/:listId/tasks/:taskId Add subtask
 * @apiName AddSubtask
 * @apiGroup List
 * @apiPermission User
 * 
 * @apiParam {String} listId List Id. (URL Parameter)
 * @apiParam {String} taskId Task Id of the parent task. (URL Parameter)
 * @apiParam {String} description Subtask description. (Body Parameter)
 * 
 * @apiSuccessExample Success Response (200)
 * {
 *  error: false,
 *  message: 'Subtask added successfully.',
 *  status: 200,
 *  data: {
 *    taskId: String,
 *    description: String
 *    done: Boolean,
 *    parentTask: String,
 *    createdAt: Date
 *  }
 * }
 * 
 * @apiErrorExample Error Response (400)
 * {
 *  error: true,
 *  message: 'Subtask description not provided.',
 *  status: 400,
 *  data: null
 * }
 * @apiUse ListError401
 * @apiUse ListError404
 * @apiUse Error500
 */