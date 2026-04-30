const healthRepository = require('../repositories/health.repository');

async function getHealth() {
  const database = await healthRepository.checkDatabase();

  return {
    status: database.status === 'up' ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database,
  };
}

module.exports = {
  getHealth,
};
