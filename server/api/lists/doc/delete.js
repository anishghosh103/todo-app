/**
 * @api {delete} /api/lists/:id Delete list
 * @apiName EditTask
 * @apiGroup List
 * @apiPermission User
 * 
 * @apiParam {String} id List Id. (URL Parameter)
 * 
 * @apiSuccessExample Success Response (200)
 * {
 *  error: false,
 *  message: 'Task edited successfully.',
 *  status: 200,
 *  data: null
 * 
 * @apiErrorExample Error Response (401)
 * {
 *  error: true,
 *  message: 'You are not authorized to delete this list.',
 *  status: 401,
 *  data: null
 * }
 * @apiUse ListError404
 * @apiUse Error500
 */