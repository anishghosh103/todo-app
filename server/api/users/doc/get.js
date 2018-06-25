/**
 * @api {get} /api/users/ Get All Users
 * @apiName GetAllUsers
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiParam {Number} [term=''] Term that needed to be present in the name of the users to be returned. (Query Parameter)
 * @apiParam {Number} [page=1] Page number of the search result (each page contains 20 results). (Query Parameter)
 * 
 * @apiSuccessExample Success Response (200)
 * {
 *  error: false,
 *  message: 'Users found.'
 *  status: 200,
 *  data: {
 *    more: Boolean,
 *    users: [{
 *      userId: String,
 *      firstname: String,
 *      lastname: String,
 *      name: String,
 *      email: String,
 *      mobile: String
 *    }]
 *  }
 * }
 * 
 * @apiUse RouteError401
 * @apiUse Error500
 */

/**
 * @api {get} /api/users/auth-status Get Authorization Status of User
 * @apiName GetAuthStatus
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiSuccessExample Success Response (200)
 * {
 *  error: false,
 *  message: 'User authorized.'
 *  status: 200,
 *  data: {
 *    authenticated: Boolean,
 *    userId: String
 *  }
 * }
 * 
 * @apiUse RouteError401
 * @apiUse Error500
 */

/**
 * @api {get} /api/users/lists Get Lists created by the logged in User
 * @apiName GetListsOfLoggedInUser
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiParam [page=1] Page number of the list results (every page contains 10 lists). (Query Parameter)
 * 
 * @apiSuccessExample Success Response (200)
 * {
 *  error: false,
 *  message: 'Lists found.'
 *  status: 200,
 *  data: {
 *    more: Boolean,
 *    lists: [{
 *      listId: String,
 *      creatorId: String,
 *      name: String,
 *      tasks: [{
 *        taskId: String,
 *        description: String
 *        done: Boolean,
 *        parentTask: String,
 *        createdAt: Date
 *      }],
 *      state: Number,
 *      createdAt: Date,
 *      private: Boolean
 *    }]
 *  }
 * }
 * 
 * @apiErrorExample Error Response (404)
 * {
 *  error: true,
 *  message: 'No lists found.',
 *  status: 404,
 *  data: null
 * }
 * @apiUse RouteError401
 * @apiUse Error500
 */


/**
 * @api {get} /api/users/notifications Get Notifications of the logged in User
 * @apiName GetNotificationsOfUser
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiParam [page=1] Page number of the notifications to be returned (every page contains 20 notifications). (Query Parameter)
 * 
 * @apiSuccessExample Success Response (200)
 * {
 *  error: false,
 *  message: 'Notifications found.'
 *  status: 200,
 *  data: [{
 *    total: Number,
 *    notifications: [
 *      notificationId: String,
 *      type: String,
 *      data: [...],
 *      createdAt: Date
 *    ]
 *  }]
 * }
 * 
 * @apiUse RouteError401
 * @apiUse Error500
 */

 /**
 * @api {get} api/users/:id Get User By Id
 * @apiName GetUserById
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiParam {String} id User Id. (URL Parameter)
 * 
 * @apiSuccessExample Success Response (200)
 * {
 *  error: false,
 *  message: 'User found.'
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
 * @apiErrorExample Error Response (404)
 * {
 *  error: true,
 *  message: 'User not found.',
 *  status: 404,
 *  data: null
 * }
 * @apiUse RouteError401
 * @apiUse Error500
 */

/**
 * @api {get} api/users/:id/lists Get Lists Of a User
 * @apiName GetListsOfUser
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiParam {String} id User Id. (URL Parameter)
 * @apiParam {Number} [page=1] User list page number. Each page contains 10 lists. (Query Parameter)
 * 
 * @apiSuccessExample Success Response (200)
 * {
 *  error: false,
 *  message: 'Lists found.',
 *  status: 200,
 *  data: {
 *    more: Boolean,
 *    lists: [{
 *      listId: String,
 *      creatorId: String,
 *      name: String,
 *      tasks: [{
 *        taskId: String,
 *        description: String
 *        done: Boolean,
 *        parentTask: String,
 *        createdAt: Date
 *      }],
 *      state: Number,
 *      createdAt: Date,
 *      private: Boolean
 *    }]
 *  }
 * }
 * 
 * @apiUse RouteError401
 * @apiUse Error500
 */

/**
 * @api {get} api/users/:id/friends Get Friends Of User
 * @apiName GetFriendsOfUser
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiParam {String} id User Id. (URL Parameter)
 * 
 * @apiSuccessExample Success Response (200)
 * {
 *  error: false,
 *  message: 'Friends found.'
 *  status: 200,
 *  data: [{
 *    userId: String,
 *    firstname: String,
 *    lastname: String,
 *    name: String,
 *    email: String,
 *    mobile: String
 *  }]
 * }
 * 
 * @apiErrorExample Error Response (404)
 * {
 *  error: true,
 *  message: 'No friends found.',
 *  status: 404,
 *  data: null
 * }
 * @apiUse RouteError401
 * @apiUse Error500
 */

/**
 * @api {get} api/users/:id/friend-status Get Friend Status with User
 * @apiName GetFriendStatusWithUser
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiParam {String} id User Id. (URL Parameter)
 * 
 * @apiSuccessExample Success Response (200)
 * {
 *  error: false,
 *  message: 'Friend status.'
 *  status: 200,
 *  data: {
 *    status: String,     // 'friend', 'not-friend', 'request-pending'
 *    request: [senderId, receiverId] | undefined
 *  }
 * }
 * 
 * @apiUse RouteError401
 * @apiUse Error500
 */