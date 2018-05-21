const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config({ path: '.env' });

const app = express();
const { log } = require('./helpers/logger');

// connect to db
mongoose.connect(`${process.env.MONGODB_URI}`);
const db = mongoose.connection;
db.on('error', (err) => {
  log.error(`🙅 🚫 → ${err.message}`);
});
db.once('open', () => {
  log.info(`Connected to ${process.env.MONGODB_URI}!`);
});

// routes

app.get('/', (req, res) => res.send('Hello World!'));

// start app

app.set('port', process.env.PORT || 3000);
const port = app.get('port');
app.listen(port, () => {
  log.info(`Example app listening on port ${port}!`);
});
