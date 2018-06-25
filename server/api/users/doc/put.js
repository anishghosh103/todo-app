/**
 * @api {put} /api/users/reset-password Reset Password
 * @apiName ResetPassword
 * @apiGroup User
 * 
 * @apiParam {String} token JSON Web Token from the password reset email. (Body Parameter)
 * @apiParam {String} password Password of the user. (Body Parameter)
 * 
 * @apiSuccessExample Success Response
 * {
 *  error: false,
 *  message: 'Password reset successful.',
 *  status: 200,
 *  data: {
 *    userId: String,
 *    firstname: String,
 *    lastname: String,
 *    name: String,
 *    email: String,
 *    mobile: String
 *  }
 * }
 * 
 * @apiErrorExample Error Response (400)
 * {
 *  error: true,
 *  message: 'Password not provided.',
 *  status: 400,
 *  data: null
 * }
 * @apiErrorExample Error Response (400)
 * {
 *  error: true,
 *  message: 'Invalid token.',
 *  status: 400,
 *  data: null
 * }
 * @apiUse UserError404
 * @apiUse RouteError401
 * @apiUse Error500
 */

/**
 * @api {put} /api/users/:id/send-friend-request Send Friend Request
 * @apiName SendFriendRequest
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiParam {String} id User Id of the user whom the request is being send to. (Body Parameter)
 * 
 * @apiSuccessExample Success Response
 * {
 *  error: false,
 *  message: 'Friend request sent.',
 *  status: 200,
 *  data: null
 * }
 * 
 * @apiErrorExample Error Response (400)
 * {
 *  error: true,
 *  message: 'Invalid request.',
 *  status: 400,
 *  data: null
 * }
 * @apiUse UserError404
 * @apiUse RouteError401
 * @apiUse Error500
 */

/**
 * @api {put} /api/users/:id/accept-friend-request Accept Friend Request
 * @apiName AcceptFriendRequest
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiParam {String} id User Id of the user who sent the request. (Body Parameter)
 * 
 * @apiSuccessExample Success Response
 * {
 *  error: false,
 *  message: 'Friend request accepted.',
 *  status: 200,
 *  data: null
 * }
 * 
 * @apiErrorExample Error Response (400)
 * {
 *  error: true,
 *  message: 'Invalid request.',
 *  status: 400,
 *  data: null
 * }
 * @apiUse UserError404
 * @apiUse RouteError401
 * @apiUse Error500
 */

/**
 * @api {put} /api/users/:id/reject-friend-request Reject Friend Request
 * @apiName RejectFriendRequest
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiParam {String} id User Id of the user who sent the request. (Body Parameter)
 * 
 * @apiSuccessExample Success Response
 * {
 *  error: false,
 *  message: 'Friend request rejected.',
 *  status: 200,
 *  data: null
 * }
 * 
 * @apiErrorExample Error Response (400)
 * {
 *  error: true,
 *  message: 'Invalid request.',
 *  status: 400,
 *  data: null
 * }
 * @apiUse UserError404
 * @apiUse RouteError401
 * @apiUse Error500
 */

/**
 * @api {put} /api/users/:id/unfriend Unfriend
 * @apiName Unfriend
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiParam {String} id User Id of the friend. (Body Parameter)
 * 
 * @apiSuccessExample Success Response
 * {
 *  error: false,
 *  message: 'Unfriended successfully.',
 *  status: 200,
 *  data: null
 * }
 * 
 * @apiErrorExample Error Response (400)
 * {
 *  error: true,
 *  message: 'Invalid request.',
 *  status: 400,
 *  data: null
 * }
 * @apiUse UserError404
 * @apiUse RouteError401
 * @apiUse Error500
 */