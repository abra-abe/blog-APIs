const { Pool } = require('pg');

const { env } = require('./env');
const logger = require('../utils/logger');

const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: env.dbSsl ? { rejectUnauthorized: false } : false,
});

pool.on('error', (error) => {
  logger.error({ err: error }, 'Unexpected PostgreSQL client error');
});

function query(text, params) {
  return pool.query(text, params);
}

async function ping() {
  await query('SELECT 1');
}

async function closePool() {
  await pool.end();
}

module.exports = {
  closePool,
  ping,
  pool,
  query,
};
