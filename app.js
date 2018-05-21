const express = require('express');
const path = require('path');

const app = express();
const routes = require('./routes/index');
const { log } = require('./helpers/logger');

// connect to db
require('./config/database');

// static files
app.use(express.static(path.join(__dirname, '/apidoc')));

// routes
app.use('/', routes);

// start app
app.set('port', process.env.PORT || 3000);
const port = app.get('port');
app.listen(port, () => {
  log.info(`Example app listening on port ${port}!`);
});

module.exports = app;
