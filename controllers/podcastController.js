const chalk = require('chalk');
//const config = require('../config/config');
const db = require('../config/db');
//const podcastParser = require('podcast-parser');
const helpers = require('../middleware/helpers.js');
const parsePodcast = require('node-podcast-parser');
const request = require('request');

var mockUser = function () {
  var user = {
    id: 1,
    username: 'danyadsmith',
    email: 'danyadsmith@email.com',
    avatarUrl: 'http://portfolio.pspu.ru/uploads/avatars/noimage.png',
    password: '$2a$10$unjENmy67P14fIOkdAC0WOBN76Z4zV3wiq8XwFqHWfEUYdt1MJgYi',
    createdAt: '2017-04-15T18:23:32.674Z',
    updatedAt: '2017-04-15T18:23:32.674Z'
  };
  return user;
};

module.exports = {
  getFeed: function (req, res) {
    request(req.query.url, (err, response, data) => {
      if (err) {
        console.error('Network error', err);
        return;
      }
      parsePodcast(data, (err, data) => {
        if (err) {
          console.error('Parsing error', err);
          return;
        }
        data.episodes = helpers.feedSanitizer(data.episodes);
        console.log(data);
        console.log(chalk.yellow(req.user));
        res.send(JSON.stringify(data));
      });
    });
  },

  subscribe: function (req, res) {
    var user = req.user || mockUser();
    console.log(chalk.white('User: ', JSON.stringify(user)));

    var params = {
      artistId: req.body.artistId,
      artistName: req.body.artistName,
      artworkUrl: req.body.artworkUrl100,
      artworkUrl600: req.body.artworkUrl600,
      collectionId: req.body.collectionId,
      feedUrl: req.body.feedUrl,
      name: req.body.collectionName,
      primaryGenreName: req.body.primaryGenreName,
    };
    db.Podcast.findOne({
      where: {
        feedUrl: params.feedUrl
      }
    })
    .then(function (data) {
      console.log(chalk.blue('Data: ', JSON.stringify(data, null, 2)));
      console.log(chalk.blue('on line 62...'));
      // If the Podcast has not been written to the database:
      if (!data) {
        // Create the Podcast record
        db.Podcast.create(params)
          .then(function (data) {
            // Then Insert the Podcast into UserPodcasts
            console.log(chalk.blue('Data: ', JSON.stringify(data, null, 2)));
            console.log(chalk.blue('on line 67...'));
            var user = req.user || mockUser();
            //console.log(chalk.blue(Object.keys(db.db)));
            // Remove hardcoded user - for current testing
            db.db.query('INSERT INTO "UserPodcasts" ("UserId", "PodcastId", "createdAt", "updatedAt") VALUES(' + user.id + ', ' + data.id + ', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);');
          });
      } else {
        // If the Podcast has been written to the database
        // Check to see if this is already in UserPodcasts
        db.UserPodcast.find({
          where: {
            PodcastId: data.id,
            UserId: user.id
          }
        })
        .then(function (data) {
          console.log(chalk.blue('Data: ', JSON.stringify(data, null, 2)));
          console.log(chalk.blue('on line 87...'));
          if(!data) {
            // If not, get a reference to the Podcast record
            db.Podcast.findOne({
              where: {
                feedUrl: params.feedUrl
              }
            })
            .then(function (data) {
              // Then add the association to UserPodcasts
              var user = req.user || mockUser();
              //console.log(chalk.blue(Object.keys(db.db)));
              db.db.query('INSERT INTO "UserPodcasts" ("UserId", "PodcastId", "createdAt", "updatedAt") VALUES(' + user.id + ', ' + data.id + ', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);');
            });
          }
        });
      }
    })
    .then(function (data) {
      res.status(201).send(data);
    });
  }
};
