const { env } = require('../config/env');

function errorHandler(error, req, res, _next) {
  const statusCode = error.statusCode || 500;

  req.log.error({ err: error }, 'Request failed');

  res.status(statusCode).json({
    error: {
      message: error.message || 'Internal Server Error',
      ...(env.nodeEnv !== 'production' && { stack: error.stack }),
    },
  });
}

module.exports = errorHandler;
