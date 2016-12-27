var logger = require('winston');
var config = require('./config').logs;

// configuration du logger
logger.remove(logger.transports.Console);

logger.add(logger.transports.Console, {
    level: config.level,
    colorize: true,
    handleExceptions: true
});

if (config.file) {
    logger.add(logger.transports.File, {
        name: 'file',
        level: config.level,
        datePattern: '.yyyy-MM-dd',
        filename: config.directory + '/' + config.filename,
        maxsize: 20 * 1024 * 1024,
        maxFiles: 30,
        json: false,
        handleExceptions: true
    });
}

// export du logger
module.exports = logger;