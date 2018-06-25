/**
 * @api {delete} /api/users/notifications Delete All Notifications
 * @apiName DeleteAllNotifications
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiSuccessExample Success Response
 * {
 *  error: false,
 *  message: 'All notifications deleted.',
 *  status: 200,
 *  data: null
 * }
 * 
 * @apiUse RouteError401
 * @apiUse Error500
 */

/**
 * @api {delete} /api/users/notifications/:id Delete Notification By Id
 * @apiName DeleteNotificationById
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiSuccessExample Success Response
 * {
 *  error: false,
 *  message: 'Notification deleted.',
 *  status: 200,
 *  data: null
 * }
 * 
 * @apiUse RouteError401
 * @apiUse Error500
 */