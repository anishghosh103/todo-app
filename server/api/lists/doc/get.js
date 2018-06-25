/**
 * @api {get} /api/lists/:id Get List By Id
 * @apiName GetListById
 * @apiGroup List
 * @apiPermission User
 * 
 * @apiParam {String} id List Id. (URL Parameter)
 * @apiSuccessExample Success Response (200)
 * {
 *  error: false,
 *  message: 'List found.',
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
 * @apiUse ListError404
 * @apiUse Error500
 */