const response = {};

const generate = (res, error, message, status, data) => {
  res.json({ error, message, status, data });
};

/**
 * Success Response
 * @param {Object} res Response Object
 * @param {Any} [data=null] Response Data (null)
 * @param {String} [message=Success.] Response Message (Success.)
 * @param {Number} [status=200] Status code of response (200)
 */
response.success = (res, data = null, message = 'Success.', status = 200) => {
  generate(res, false, message, status, data);
};

/**
 * Error Response
 * @param {Object} res Response Object
 * @param {String} [message=Error occurred.] Response Message (Error occrred.)
 * @param {Number} [status=500] Status code of response (500)
 */
response.error = (res, message = 'Error occurred.', status = 500) => {
  generate(res, true, message, status, null);
};

module.exports = response;