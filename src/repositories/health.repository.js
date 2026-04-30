const { ping } = require('../config/db');

async function checkDatabase() {
  try {
    await ping();

    return {
      status: 'up',
    };
  } catch (error) {
    return {
      status: 'down',
      message: error.message,
    };
  }
}

module.exports = {
  checkDatabase,
};
