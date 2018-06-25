/**
 * @api {post} /api/users/login Login
 * @apiName Login
 * @apiGroup User
 * 
 * @apiParam {String} email Email of the user. (Body Parameter)
 * @apiParam {String} password Password of the user. (Body Parameter)
 * 
 * @apiSuccessExample Success Response
 * {
 *  error: false,
 *  message: 'Login successful.',
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
 *  message: 'Email/Password not provided.',
 *  status: 400,
 *  data: null
 * }
 * @apiErrorExample Error Response (400)
 * {
 *  error: true,
 *  message: 'User is not verified.',
 *  status: 400,
 *  data: null
 * }
 * @apiErrorExample Error Response (400)
 * {
 *  error: true,
 *  message: 'Password does not match.',
 *  status: 400,
 *  data: null
 * }
 * @apiUse Error500
 */

/**
 * @api {post} /api/users/signup Sign Up
 * @apiName SignUp
 * @apiGroup User
 * 
 * @apiParam {String} firstname First name of the user. (Body Parameter)
 * @apiParam {String} lastname Last name of the user. (Body Parameter)
 * @apiParam {String} email Email of the user. (Body Parameter)
 * @apiParam {String} password Password of the user. (Body Parameter)
 * @apiParam {String} mobile Mobile no. of the user. (Body Parameter)
 * 
 * @apiSuccessExample Success Response
 * {
 *  error: false,
 *  message: 'Registration successful.',
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
 *  message: 'Some field is empty.',
 *  status: 400,
 *  data: null
 * }
 * @apiErrorExample Error Response (400)
 * {
 *  error: true,
 *  message: 'Email already present.',
 *  status: 400,
 *  data: null
 * }
 * @apiUse Error500
 */

/**
 * @api {post} /api/users/logout Logout
 * @apiName Logout
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiSuccessExample Success Response
 * {
 *  error: false,
 *  message: 'Logout successful.',
 *  status: 200,
 *  data: null
 * }
 * 
 * @apiUse RouteError401
 * @apiUse Error500
 */

/**
 * @api {post} /api/users/forgot-password Forgot Password
 * @apiName ForgotPassword
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiSuccessExample Success Response
 * {
 *  error: false,
 *  message: 'Password reset mail sent successfully.',
 *  status: 200,
 *  data: null
 * }
 * 
 * @apiErrorExample Error Response (400)
 * {
 *  error: true,
 *  message: 'User is not verified.',
 *  status: 400,
 *  data: null
 * }
 * @apiErrorExample Error Response (404)
 * {
 *  error: true,
 *  message: 'User not found.',
 *  status: 404,
 *  data: null
 * }
 * @apiUse Error500
 */

/**
 * @api {post} /api/users/activate Activate User
 * @apiName ActivateUser
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiParam {String} userId User Id. (Body Parameter)
 * 
 * @apiSuccessExample Success Response
 * {
 *  error: false,
 *  message: 'User verified.',
 *  status: 200,
 *  data: null
 * }
 * 
 * @apiErrorExample Error Response (404)
 * {
 *  error: true,
 *  message: 'User not found.',
 *  status: 404,
 *  data: null
 * }
 * @apiUse Error500
 */