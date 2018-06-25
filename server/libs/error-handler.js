const response = require('./response');

const handler = {};

handler.globalErrorHandler = (err, req, res, next) => {
  let message = 'Error occurred.';
  if (err.status === 404) {
    message = 'Page not found.';
  }
  response.error(res, message, err.status);
};

handler.notFoundHandler = (req, res, next) => {
  response.error(res, 'Route not found.', 404);
};

module.exports = handler;