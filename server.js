const chalk = require('chalk');
const config = require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const podcastRouter = require('./routers/podcasts');
const userRouter = require('./routers/users');
const episodeRouter = require('./routers/episodes');
const playlistRouter = require('./routers/playlists');
const secret = require('./config/secret.json');
const jwt = require('jsonwebtoken');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// AUTHENTICATION MIDDLEWEAR: comment out if testing without token in auth header
app.use(function (req, res, next) {
  if (!req.url.includes('/createUser') && !req.url.includes('/login')) {
    var token = req.headers.authorization;
    if (!token) {
      res.status(500).send('No authorization header with request.');
      return;
    } else {
      var userObj = jwt.decode(token, secret.secret);
      req.user = userObj;
      return next();
    }
  }
  return next();
});

app.use(morgan('dev'));
app.use(function (req, res, next) {
  res.header('access-control-allow-origin', '*');
  res.header('access-control-allow-methods', 'GET, POST, PUT, OPTIONS, DELETE');
  res.header('access-control-allow-headers', 'content-type, accept');
  res.header('access-control-max-age', 10);
  res.header('x-xss-protection', 0);
  next();
});

app.use('/api/podcasts', podcastRouter);
app.use('/api/users', userRouter);
app.use('/api/episodes', episodeRouter);
app.use('/api/playlists', playlistRouter);

app.use(function (err, req, res, next) {
  console.error(chalk.red.bold('ERROR: ', err));
  res.send(err);
  next();
});

app.listen(config.port, function () {
  console.log('Listening on port ' + config.port);
  // require('./middleware/db.js');
});

module.exports = app;
