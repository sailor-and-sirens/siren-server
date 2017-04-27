const chalk         = require('chalk');
const config        = require('../config/config');
const sequelize     = require('../config/db');
const utils       = require('../middleware/helpers.js');
const helpers       = require('../middleware/subscriptionHelpers.js');
const parsePodcast  = require('../middleware/node-podcast-parser');
const request       = require('request');
//const Promise       = require('bluebird');

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
        var episodes = utils.feedSanitizer(podcast.episodes);
        delete podcast.episodes;
        episodes[0].podcast = podcast;
        console.log(chalk.yellow(req.user));
        res.status(200).send(episodes);
      });
    });
  },

  getSubscriptions: function (req, res) {
    var user = req.user || utils.mockUser();
    sequelize.db.query('SELECT "Podcasts"."id", "Podcasts"."artistName", "Podcasts"."name", "Podcasts"."primaryGenreName", "Podcasts"."artworkUrl" FROM "Podcasts", "UserPodcasts" WHERE "Podcasts"."id" = "UserPodcasts"."PodcastId" AND "UserPodcasts"."UserId" = ' + user.id)
      .then(function (data) {
        if (data) {
          res.status(201).send(data);
        } else {
          res.status(500).send('User ' + req.user.username + ' has no podcast subscriptions.');
        }
      });
  },

  subscribe: function (req, res) {
    var user = req.user || utils.mockUser();
    //console.log(chalk.white('User: ', JSON.stringify(user)));
    if (config.log) {
      console.log(chalk.blue('Subscribing ' + user.username + ' to Podcast...'));
      console.log(chalk.white(req.body.collectionName));
    }
    if (config.debug) {
      console.log(chalk.blue('Data passed from client...'));
      console.log(chalk.white(JSON.stringify(req.body, null, 2)));
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
    var podcast = null;

    helpers.getPodcast(params)
    .then(function (data) {
      if (!data) {
        return helpers.createPodcast(params);
      } else {
        return data;
      }
    })
    .then(function (data) {
      podcast = data;
      utils.getFeed(req.body.feedUrl)
      .then(function (data) {
        return helpers.addEpisodes(data, podcast);
      })
      .then(function () {
        return helpers.createUserPodcast(req.user, podcast);
      })
      .then(function () {
        return helpers.addPodcastEpisodes(podcast, req.user);
      })
      .then(function (data) {
        if (data) {
          res.status(201).send('Subscribed ' + user.username + ' to podcast ' + req.body.collectionName + ' with ID ' + podcast.id);
        } else {
          res.status(500).send('Error subscribing user to Podcast: ' + req.body.collectionName);
        }
      });
    });
  },

  deleteSubscription: function (req, res) {
    console.log(chalk.blue('Deleting Podcat Subscription:'));
    console.log(chalk.white('Deleting Podcast ID ' + req.params.id + ' from User ' + req.user.username));
    //sequelize.db.query('DELETE FROM "UserEpisodes" WHERE "UserId" = ' + req.user.id + ' AND "EpisodeId" IN (SELECT "id" FROM "Episodes" WHERE "PodcastId" = ' + req.params.id + ');');
    sequelize.db.query('DELETE FROM "UserPodcasts" WHERE "UserId" = ' + req.user.id + ' AND "PodcastId" = ' + req.params.id)
      .then(function (data) {
        if (data) {
          res.status(201).send(data);
        } else {
          res.status(500).send('Error deleting user episode with ID: ' + req.body.EpisodeId);
        }
      });
  }
};
