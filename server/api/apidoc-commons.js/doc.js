/**
 * @apiDefine Error500
 * @apiErrorExample Error Response (500)
 * {
 *  error: true,
 *  message: 'Error occurred.',
 *  status: 500,
 *  data: null
 * }
 */

/**
 * @apiDefine RouteError401
 * @apiErrorExample Error Response (401)
 * {
 *  error: true,
 *  message: 'You are not authorized to access this route.',
 *  status: 401,
 *  data: null
 * }
 */

/**
 * @apiDefine ListError401
 * @apiErrorExample Error Response (401)
 * {
 *  error: true,
 *  message: 'You are not authorized to modify this list.',
 *  status: 401,
 *  data: null
 * }
 * @apiErrorExample Error Response (401)
 * {
 *  error: true,
 *  message: 'You are not authorized to access this route.',
 *  status: 401,
 *  data: null
 * }
 */

/**
 * @apiDefine ListError404
 * @apiErrorExample Error Response (404)
 * {
 *  error: true,
 *  message: 'List not found.',
 *  status: 404,
 *  data: null
 * }
 */

/**
 * @apiDefine UserError404
 * @apiErrorExample Error Response (404)
 * {
 *  error: true,
 *  message: 'User not found.',
 *  status: 404,
 *  data: null
 * }
 */

 // TODO: Change /api/... to ${baseUrl}/api/...