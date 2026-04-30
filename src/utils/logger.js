const pino = require('pino');

const logger =
  process.env.NODE_ENV === 'development'
    ? pino({
        level: process.env.LOG_LEVEL || 'info',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
          },
        },
      })
    : pino({ level: process.env.LOG_LEVEL || 'info' });

module.exports = logger;