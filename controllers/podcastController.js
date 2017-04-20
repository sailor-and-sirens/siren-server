const chalk         = require('chalk');
const config        = require('../config/config');
const sequelize     = require('../config/db');
const helpers       = require('../middleware/helpers.js');
const parsePodcast  = require('node-podcast-parser');
const request       = require('request');
const Promise       = require('bluebird');

var podcastID = 1;

module.exports = {
  getFeed: function (req, res) {
    request(req.query.url, (err, response, data) => {
      if (err) {
        console.error('Network error', err);
        return;
      }
      parsePodcast(data, (err, podcast) => {
        if (err) {
          console.error('Parsing error', err);
          return;
        }
        episodes = helpers.feedSanitizer(podcast.episodes);
        console.log(chalk.yellow(req.user));
        res.status(200).send(episodes);
      });
    });
  },

  subscribe: function (req, res) {
    var user = req.user || helpers.mockUser();
    console.log(chalk.white('User: ', JSON.stringify(user)));
    if (config.log) {
      console.log(chalk.blue('Subscribing ' + user.username + ' to Podcast...'));
      console.log(chalk.white(req.body.collectionName));
    }
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
    sequelize.Podcast.findOne({
      where: {
        feedUrl: params.feedUrl
      }
    })
    .then(function (data) {
      if (config.debug) {
        console.log(chalk.blue('Line 60 | Data: ', JSON.stringify(data, null, 2)));
      }
      // If the Podcast has not been written to the database:
      if (!data) {
        // Create the Podcast record
        sequelize.Podcast.create(params)
          .then(function (data) {
            podcastID = data.id;
            // Then Insert the Podcast into UserPodcasts
            if (config.debug) {
              console.log(chalk.blue('Line 67 | Data: ', JSON.stringify(data, null, 2)));
            }
            var user = req.user || helpers.mockUser();
            // Remove hardcoded user - for current testing
            sequelize.db.query('INSERT INTO "UserPodcasts" ("UserId", "PodcastId", "createdAt", "updatedAt") VALUES(' + user.id + ', ' + data.id + ', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);');
          });
      } else {
        podcastID = data.id;
        // If the Podcast has been written to the database
        // Check to see if this is already in UserPodcasts
        sequelize.UserPodcast.find({
          where: {
            PodcastId: data.id,
            UserId: user.id
          }
        })
        .then(function (data) {
          if (config.debug) {
            console.log(chalk.blue('Line 83 | Data: ', JSON.stringify(data, null, 2)));
          }
          if(!data) {
            // If not, get a reference to the Podcast record
            sequelize.Podcast.findOne({
              where: {
                feedUrl: params.feedUrl
              }
            })
            .then(function (data) {
              // Then add the association to UserPodcasts
              var user = req.user || helpers.mockUser();
              sequelize.db.query('INSERT INTO "UserPodcasts" ("UserId", "PodcastId", "createdAt", "updatedAt") VALUES(' + user.id + ', ' + data.id + ', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);');
            });
          }
        });
      }
    })
    .then(function () {
      return helpers.getFeed(req.body.feedUrl);
    })
    .then((data) => {
      console.log(chalk.blue('Line 108 | Data: ', JSON.stringify(data.data, null, 2)));
      return Promise.each(data.data, (episode) => {
        if (config.log) {
          console.log(chalk.blue('Adding Podcast Episode...'));
          console.log(chalk.white(episode.title));
        }
        episode.subtitle = episode.description;
        episode.pubDate = episode.published;
        delete episode.description;
        delete episode.releaseDate;

        if(episode) {
          sequelize.Episode.create({
            title: episode.title,
            description: episode.subtitle,
            length: episode.duration,
            releaseDate: episode.pubDate,
            url: episode.enclosure.url,
            PodcastId: podcastID,
            feed: episode
          });
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      });
    })
    .then(function () {
      var user = req.user || helpers.mockUser();
      sequelize.db.query('INSERT INTO "UserEpisodes" ("UserId", "EpisodeId", "isInInbox", "createdAt", "updatedAt") SELECT ' + user.id + ' as "UserId", id as "EpisodeId", true as "isInInbox", CURRENT_TIMESTAMP as "createdAt", CURRENT_TIMESTAMP as "updatedAt" FROM "Episodes" WHERE "PodcastId" = ' + podcastID + ' ORDER BY "releaseDate" DESC LIMIT 10');
    })
    .then(function (data) {
      res.status(201).send(data);
    });
  }
};
