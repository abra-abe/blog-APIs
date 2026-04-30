const healthService = require('../services/health.service');
const asyncHandler = require('../utils/async-handler');

const getHealth = asyncHandler(async (_req, res) => {
  const health = await healthService.getHealth();
  const statusCode = health.database.status === 'up' ? 200 : 503;

  res.status(statusCode).json(health);
});

module.exports = {
  getHealth,
};
