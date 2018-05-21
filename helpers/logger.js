const bunyan = require('bunyan');

const log = bunyan.createLogger({ name: 'tradie-app' });

module.exports = { log };
