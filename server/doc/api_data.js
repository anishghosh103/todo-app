define({ "api": [
  {
    "type": "post",
    "url": "/api/lists/:listId/tasks/:taskId",
    "title": "Add subtask",
    "name": "AddSubtask",
    "group": "List",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listId",
            "description": "<p>List Id. (URL Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskId",
            "description": "<p>Task Id of the parent task. (URL Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Subtask description. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n error: false,\n message: 'Subtask added successfully.',\n status: 200,\n data: {\n   taskId: String,\n   description: String\n   done: Boolean,\n   parentTask: String,\n   createdAt: Date\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (400)",
          "content": "{\n error: true,\n message: 'Subtask description not provided.',\n status: 400,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to modify this list.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to access this route.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (404)",
          "content": "{\n error: true,\n message: 'List not found.',\n status: 404,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/lists/doc/post.js",
    "groupTitle": "List"
  },
  {
    "type": "post",
    "url": "/api/lists/:id",
    "title": "Add task",
    "name": "AddTask",
    "group": "List",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>List Id. (URL Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Task description. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n error: false,\n message: 'Task added successfully.',\n status: 200,\n data: {\n   taskId: String,\n   description: String\n   done: Boolean,\n   parentTask: String,\n   createdAt: Date\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (400)",
          "content": "{\n error: true,\n message: 'Task description not provided.',\n status: 400,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to modify this list.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to access this route.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (404)",
          "content": "{\n error: true,\n message: 'List not found.',\n status: 404,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/lists/doc/post.js",
    "groupTitle": "List"
  },
  {
    "type": "post",
    "url": "/api/lists/",
    "title": "Create new list",
    "name": "CreateNewList",
    "group": "List",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>List name. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "personal",
            "defaultValue": "true",
            "description": "<p>If personal is true, then list will be accessed only by the creator, otherwise it can be accessed by him as well as any of his friends. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n error: false,\n message: 'List created successfully.',\n status: 200,\n data: {\n   listId: String,\n   creatorId: String,\n   name: String,\n   tasks: [{\n     taskId: String,\n     description: String\n     done: Boolean,\n     parentTask: String,\n     createdAt: Date\n   }],\n   state: Number,\n   createdAt: Date,\n   private: Boolean\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (400)",
          "content": "{\n error: true,\n message: 'List name not provided.',\n status: 400,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (400)",
          "content": "{\n error: true,\n message: 'List name already present.',\n status: 400,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/lists/doc/post.js",
    "groupTitle": "List"
  },
  {
    "type": "put",
    "url": "/api/lists/:listId/tasks/:taskId/delete",
    "title": "Delete task",
    "name": "DeleteTask",
    "group": "List",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listId",
            "description": "<p>List Id. (URL Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskId",
            "description": "<p>Task Id. (URL Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n error: false,\n message: 'Task deleted successfully.',\n status: 200,\n data: {\n   listId: String,\n   creatorId: String,\n   name: String,\n   tasks: [{\n     taskId: String,\n     description: String\n     done: Boolean,\n     parentTask: String,\n     createdAt: Date\n   }],\n   state: Number,\n   createdAt: Date,\n   private: Boolean\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/lists/doc/put.js",
    "groupTitle": "List",
    "error": {
      "examples": [
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to modify this list.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to access this route.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (404)",
          "content": "{\n error: true,\n message: 'List not found.',\n status: 404,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/lists/:listId/tasks/:taskId/edit",
    "title": "Edit task",
    "name": "EditTask",
    "group": "List",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listId",
            "description": "<p>List Id. (URL Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskId",
            "description": "<p>Task Id. (URL Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Task Description. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n error: false,\n message: 'Task edited successfully.',\n status: 200,\n data: {\n   listId: String,\n   creatorId: String,\n   name: String,\n   tasks: [{\n     taskId: String,\n     description: String\n     done: Boolean,\n     parentTask: String,\n     createdAt: Date\n   }],\n   state: Number,\n   createdAt: Date,\n   private: Boolean\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (400)",
          "content": "{\n error: true,\n message: 'Task description not provided.',\n status: 400,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to modify this list.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to access this route.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (404)",
          "content": "{\n error: true,\n message: 'List not found.',\n status: 404,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/lists/doc/put.js",
    "groupTitle": "List"
  },
  {
    "type": "delete",
    "url": "/api/lists/:id",
    "title": "Delete list",
    "name": "EditTask",
    "group": "List",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>List Id. (URL Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n error: false,\n message: 'Task edited successfully.',\n status: 200,\n data: null",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to delete this list.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (404)",
          "content": "{\n error: true,\n message: 'List not found.',\n status: 404,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/lists/doc/delete.js",
    "groupTitle": "List"
  },
  {
    "type": "get",
    "url": "/api/lists/:id",
    "title": "Get List By Id",
    "name": "GetListById",
    "group": "List",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>List Id. (URL Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n error: false,\n message: 'List found.',\n status: 200,\n data: {\n   listId: String,\n   creatorId: String,\n   name: String,\n   tasks: [{\n     taskId: String,\n     description: String\n     done: Boolean,\n     parentTask: String,\n     createdAt: Date\n   }],\n   state: Number,\n   createdAt: Date,\n   private: Boolean\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/lists/doc/get.js",
    "groupTitle": "List",
    "error": {
      "examples": [
        {
          "title": "Error Response (404)",
          "content": "{\n error: true,\n message: 'List not found.',\n status: 404,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/lists/:listId/tasks/:taskId/done",
    "title": "Toggle task done",
    "name": "ToggleTaskDone",
    "group": "List",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "listId",
            "description": "<p>List Id. (URL Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskId",
            "description": "<p>Task Id. (URL Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n error: false,\n message: 'Task updated successfully.',\n status: 200,\n data: {\n   listId: String,\n   creatorId: String,\n   name: String,\n   tasks: [{\n     taskId: String,\n     description: String\n     done: Boolean,\n     parentTask: String,\n     createdAt: Date\n   }],\n   state: Number,\n   createdAt: Date,\n   private: Boolean\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/lists/doc/put.js",
    "groupTitle": "List",
    "error": {
      "examples": [
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to modify this list.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to access this route.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (404)",
          "content": "{\n error: true,\n message: 'List not found.',\n status: 404,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/lists/:id/undo",
    "title": "Undo the last operation on a list",
    "name": "UndoList",
    "group": "List",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>List Id. (URL Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n error: false,\n message: 'Undo successful.',\n status: 200,\n data: {\n   listId: String,\n   creatorId: String,\n   name: String,\n   tasks: [{\n     taskId: String,\n     description: String\n     done: Boolean,\n     parentTask: String,\n     createdAt: Date\n   }],\n   state: Number,\n   createdAt: Date,\n   private: Boolean\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/lists/doc/put.js",
    "groupTitle": "List",
    "error": {
      "examples": [
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to modify this list.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to access this route.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (404)",
          "content": "{\n error: true,\n message: 'List not found.',\n status: 404,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/users/:id/accept-friend-request",
    "title": "Accept Friend Request",
    "name": "AcceptFriendRequest",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User Id of the user who sent the request. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "{\n error: false,\n message: 'Friend request accepted.',\n status: 200,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (400)",
          "content": "{\n error: true,\n message: 'Invalid request.',\n status: 400,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (404)",
          "content": "{\n error: true,\n message: 'User not found.',\n status: 404,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to access this route.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/users/doc/put.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/users/activate",
    "title": "Activate User",
    "name": "ActivateUser",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "{\n error: false,\n message: 'User verified.',\n status: 200,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (404)",
          "content": "{\n error: true,\n message: 'User not found.',\n status: 404,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/users/doc/post.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/api/users/notifications",
    "title": "Delete All Notifications",
    "name": "DeleteAllNotifications",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "{\n error: false,\n message: 'All notifications deleted.',\n status: 200,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/users/doc/delete.js",
    "groupTitle": "User",
    "error": {
      "examples": [
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to access this route.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/api/users/notifications/:id",
    "title": "Delete Notification By Id",
    "name": "DeleteNotificationById",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "{\n error: false,\n message: 'Notification deleted.',\n status: 200,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/users/doc/delete.js",
    "groupTitle": "User",
    "error": {
      "examples": [
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to access this route.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/users/forgot-password",
    "title": "Forgot Password",
    "name": "ForgotPassword",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "{\n error: false,\n message: 'Password reset mail sent successfully.',\n status: 200,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (400)",
          "content": "{\n error: true,\n message: 'User is not verified.',\n status: 400,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (404)",
          "content": "{\n error: true,\n message: 'User not found.',\n status: 404,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/users/doc/post.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/users/",
    "title": "Get All Users",
    "name": "GetAllUsers",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "term",
            "description": "<p>Term that needed to be present in the name of the users to be returned. (Query Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Page number of the search result (each page contains 20 results). (Query Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n error: false,\n message: 'Users found.'\n status: 200,\n data: {\n   more: Boolean,\n   users: [{\n     userId: String,\n     firstname: String,\n     lastname: String,\n     name: String,\n     email: String,\n     mobile: String\n   }]\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/users/doc/get.js",
    "groupTitle": "User",
    "error": {
      "examples": [
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to access this route.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/users/auth-status",
    "title": "Get Authorization Status of User",
    "name": "GetAuthStatus",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n error: false,\n message: 'User authorized.'\n status: 200,\n data: {\n   authenticated: Boolean,\n   userId: String\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/users/doc/get.js",
    "groupTitle": "User",
    "error": {
      "examples": [
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to access this route.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "api/users/:id/friend-status",
    "title": "Get Friend Status with User",
    "name": "GetFriendStatusWithUser",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User Id. (URL Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n error: false,\n message: 'Friend status.'\n status: 200,\n data: {\n   status: String,     // 'friend', 'not-friend', 'request-pending'\n   request: [senderId, receiverId] | undefined\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/users/doc/get.js",
    "groupTitle": "User",
    "error": {
      "examples": [
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to access this route.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "api/users/:id/friends",
    "title": "Get Friends Of User",
    "name": "GetFriendsOfUser",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User Id. (URL Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n error: false,\n message: 'Friends found.'\n status: 200,\n data: [{\n   userId: String,\n   firstname: String,\n   lastname: String,\n   name: String,\n   email: String,\n   mobile: String\n }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (404)",
          "content": "{\n error: true,\n message: 'No friends found.',\n status: 404,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to access this route.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/users/doc/get.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/users/lists",
    "title": "Get Lists created by the logged in User",
    "name": "GetListsOfLoggedInUser",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Page number of the list results (every page contains 10 lists). (Query Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n error: false,\n message: 'Lists found.'\n status: 200,\n data: {\n   more: Boolean,\n   lists: [{\n     listId: String,\n     creatorId: String,\n     name: String,\n     tasks: [{\n       taskId: String,\n       description: String\n       done: Boolean,\n       parentTask: String,\n       createdAt: Date\n     }],\n     state: Number,\n     createdAt: Date,\n     private: Boolean\n   }]\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (404)",
          "content": "{\n error: true,\n message: 'No lists found.',\n status: 404,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to access this route.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/users/doc/get.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "api/users/:id/lists",
    "title": "Get Lists Of a User",
    "name": "GetListsOfUser",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User Id. (URL Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>User list page number. Each page contains 10 lists. (Query Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n error: false,\n message: 'Lists found.',\n status: 200,\n data: {\n   more: Boolean,\n   lists: [{\n     listId: String,\n     creatorId: String,\n     name: String,\n     tasks: [{\n       taskId: String,\n       description: String\n       done: Boolean,\n       parentTask: String,\n       createdAt: Date\n     }],\n     state: Number,\n     createdAt: Date,\n     private: Boolean\n   }]\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/users/doc/get.js",
    "groupTitle": "User",
    "error": {
      "examples": [
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to access this route.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/users/notifications",
    "title": "Get Notifications of the logged in User",
    "name": "GetNotificationsOfUser",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>Page number of the notifications to be returned (every page contains 20 notifications). (Query Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n error: false,\n message: 'Notifications found.'\n status: 200,\n data: [{\n   total: Number,\n   notifications: [\n     notificationId: String,\n     type: String,\n     data: [...],\n     createdAt: Date\n   ]\n }]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/users/doc/get.js",
    "groupTitle": "User",
    "error": {
      "examples": [
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to access this route.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "api/users/:id",
    "title": "Get User By Id",
    "name": "GetUserById",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User Id. (URL Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200)",
          "content": "{\n error: false,\n message: 'User found.'\n status: 200,\n data: {\n   userId: String,\n   firstname: String,\n   lastname: String,\n   name: String,\n   email: String,\n   mobile: String\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (404)",
          "content": "{\n error: true,\n message: 'User not found.',\n status: 404,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to access this route.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/users/doc/get.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/users/login",
    "title": "Login",
    "name": "Login",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "{\n error: false,\n message: 'Login successful.',\n status: 200,\n data: {\n   userId: String,\n   firstname: String,\n   lastname: String,\n   name: String,\n   email: String,\n   mobile: String\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (400)",
          "content": "{\n error: true,\n message: 'Email/Password not provided.',\n status: 400,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (400)",
          "content": "{\n error: true,\n message: 'User is not verified.',\n status: 400,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (400)",
          "content": "{\n error: true,\n message: 'Password does not match.',\n status: 400,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/users/doc/post.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/users/logout",
    "title": "Logout",
    "name": "Logout",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "{\n error: false,\n message: 'Logout successful.',\n status: 200,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/users/doc/post.js",
    "groupTitle": "User",
    "error": {
      "examples": [
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to access this route.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/users/:id/reject-friend-request",
    "title": "Reject Friend Request",
    "name": "RejectFriendRequest",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User Id of the user who sent the request. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "{\n error: false,\n message: 'Friend request rejected.',\n status: 200,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (400)",
          "content": "{\n error: true,\n message: 'Invalid request.',\n status: 400,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (404)",
          "content": "{\n error: true,\n message: 'User not found.',\n status: 404,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to access this route.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/users/doc/put.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/api/users/reset-password",
    "title": "Reset Password",
    "name": "ResetPassword",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JSON Web Token from the password reset email. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "{\n error: false,\n message: 'Password reset successful.',\n status: 200,\n data: {\n   userId: String,\n   firstname: String,\n   lastname: String,\n   name: String,\n   email: String,\n   mobile: String\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (400)",
          "content": "{\n error: true,\n message: 'Password not provided.',\n status: 400,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (400)",
          "content": "{\n error: true,\n message: 'Invalid token.',\n status: 400,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (404)",
          "content": "{\n error: true,\n message: 'User not found.',\n status: 404,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to access this route.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/users/doc/put.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/api/users/:id/send-friend-request",
    "title": "Send Friend Request",
    "name": "SendFriendRequest",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User Id of the user whom the request is being send to. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "{\n error: false,\n message: 'Friend request sent.',\n status: 200,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (400)",
          "content": "{\n error: true,\n message: 'Invalid request.',\n status: 400,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (404)",
          "content": "{\n error: true,\n message: 'User not found.',\n status: 404,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to access this route.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/users/doc/put.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/users/signup",
    "title": "Sign Up",
    "name": "SignUp",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>First name of the user. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>Last name of the user. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobile",
            "description": "<p>Mobile no. of the user. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "{\n error: false,\n message: 'Registration successful.',\n status: 200,\n data: {\n   userId: String,\n   firstname: String,\n   lastname: String,\n   name: String,\n   email: String,\n   mobile: String\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (400)",
          "content": "{\n error: true,\n message: 'Some field is empty.',\n status: 400,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (400)",
          "content": "{\n error: true,\n message: 'Email already present.',\n status: 400,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/users/doc/post.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/api/users/:id/unfriend",
    "title": "Unfriend",
    "name": "Unfriend",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User Id of the friend. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "{\n error: false,\n message: 'Unfriended successfully.',\n status: 200,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (400)",
          "content": "{\n error: true,\n message: 'Invalid request.',\n status: 400,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (404)",
          "content": "{\n error: true,\n message: 'User not found.',\n status: 404,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (401)",
          "content": "{\n error: true,\n message: 'You are not authorized to access this route.',\n status: 401,\n data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500)",
          "content": "{\n error: true,\n message: 'Error occurred.',\n status: 500,\n data: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/users/doc/put.js",
    "groupTitle": "User"
  }
] });
