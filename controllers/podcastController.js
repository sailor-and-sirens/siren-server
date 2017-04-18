const chalk = require('chalk');
//const config = require('../config/config');
const db = require('../middleware/db');
//const podcastParser = require('podcast-parser');
const helpers = require('../helpers.js');
const parsePodcast = require('node-podcast-parser');
const request = require('request');


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
      if (!data) {
        db.Podcast.create(params)
          .then(function (data) {
            // Remove hardcoded user - for current testing
            db.db.sequelize.query('INSERT INTO "UserPodcasts" ("UserId", "PodcastId", "createdAt", "updatedAt") VALUES(1, ' + data.id + ', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);');
          });
      } else {
        db.UserPodcast.find({
          where: {
            PodcastId: data.id,
            UserId: 1
          }
        })
        .then(function (data) {
          if(!data) {
            db.db.sequelize.query('INSERT INTO "UserPodcasts" ("UserId", "PodcastId", "createdAt", "updatedAt") VALUES(1, ' + data.id + ', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);');
          }
        });
      }
      var feed = helpers.getFeed(req.body.feedUrl);
      feed.episodes.forEach((episode) => {
        db.Episode.create({
          title: episode.title,
          description: episode.description,
          length: episode.duration,
          releaseDate: episode.published,
          url: episode.enclosure.url,
          PodcastId: data.id
        });
      });
      console.log(chalk.magenta(JSON.stringify(feed, null, 2)));
    })
    .then(function (data) {
      res.status(201).send(data);
    });
  }
};
