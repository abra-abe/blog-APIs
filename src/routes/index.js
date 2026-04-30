const express = require('express');

const { env } = require('../config/env');
const v1Routes = require('./v1');

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json({
    name: 'blog-api',
    status: 'ok',
    version: env.apiVersion,
  });
});

router.use(`${env.apiPrefix}/${env.apiVersion}`, v1Routes);

module.exports = router;
