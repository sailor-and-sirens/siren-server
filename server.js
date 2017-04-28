const chalk = require('chalk');
const config = require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const middleware = require('./middleware');
const podcastRouter = require('./routers/podcasts');
const userRouter = require('./routers/users');
const episodeRouter = require('./routers/episodes');
const playlistRouter = require('./routers/playlists');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(middleware.auth);

app.use(morgan('dev'));
app.use(middleware.headers);

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
});

module.exports = app;
