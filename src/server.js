require('dotenv').config();

const http = require('node:http');

const app = require('./app');
const { closePool } = require('./config/db');
const { env } = require('./config/env');
const logger = require('./utils/logger');

const server = http.createServer(app);

function startServer() {
    server.listen(env.port, env.host, () => {
        logger.info(
            {
                host: env.host,
                port: env.port,
                env: env.nodeEnv,
            },
            'HTTP server started'
        );
    });
}

async function shutdown(signal) {
    logger.info({ signal }, 'Shutdown signal received');

    server.close(async (serverError) => {
        if (serverError) {
            logger.error({ err: serverError }, 'HTTP server shutdown failed');
            process.exitCode = 1;
        }

        try {
            await closePool();
            logger.info('PostgreSQL pool closed');
        } catch (poolError) {
            logger.error({ err: poolError }, 'Failed to close PostgreSQL pool');
            process.exitCode = 1;
        } finally {
            process.exit();
        }
    });
}

['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, () => {
        void shutdown(signal);
    });
});

startServer();