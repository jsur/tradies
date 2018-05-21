const mongoose = require('mongoose');

const { log } = require('../helpers/logger');
require('dotenv').config();

mongoose.connect(`${process.env.MONGODB_URI}`);
const db = mongoose.connection;
db.on('error', (err) => {
  log.error(`🙅 🚫 → ${err.message}`);
});
db.once('open', () => {
  log.info(`Connected to ${process.env.MONGODB_URI}!`);
});