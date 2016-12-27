var APP_CONFIG_FILE = process.env.APP_CONFIG_FILE;

if (!APP_CONFIG_FILE) {
    APP_CONFIG_FILE = '../../conf/app.json';
}

module.exports = require(APP_CONFIG_FILE);