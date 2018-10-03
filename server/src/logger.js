const bunyan = require('bunyan');

const logger = bunyan.createLogger({ name: 'server', level: 'debug' });
module.exports = logger;
