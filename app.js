const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const routes = require('./routes/index');
const { log } = require('./helpers/logger');

// connect to db
require('./config/database');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/', routes);

// start app
app.set('port', process.env.PORT || 3000);
const port = app.get('port');
app.listen(port, () => {
  log.info(`Example app listening on port ${port}!`);
});

module.exports = app;
