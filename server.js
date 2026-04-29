require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const logger = require('./utils/logger');

// configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});