const compression = require('compression');
const cors = require('cors');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const pinoHttp = require('pino-http');

const { env } = require('./config/env');
const errorHandler = require('./middlewares/error-handler');
const notFound = require('./middlewares/not-found');
const routes = require('./routes');
const logger = require('./utils/logger');

const app = express();

const corsOrigin = env.corsOrigin === '*'
  ? true
  : env.corsOrigin.split(',').map((origin) => origin.trim());

app.disable('x-powered-by');
app.set('trust proxy', env.trustProxy);

app.use(
  pinoHttp({
    logger,
    customLogLevel(_req, res, error) {
      if (error || res.statusCode >= 500) {
        return 'error';
      }

      if (res.statusCode >= 400) {
        return 'warn';
      }

      return 'info';
    },
  })
);
app.use(helmet());
app.use(cors({ origin: corsOrigin }));
app.use(compression());
app.use(
  rateLimit({
    windowMs: env.rateLimitWindowMs,
    limit: env.rateLimitMax,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
