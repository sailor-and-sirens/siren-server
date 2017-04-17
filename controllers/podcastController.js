const chalk = require('chalk');
const config = require('../config/config');
const db = require('../middleware/db');
const podcastParser = require('podcast-parser');
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
        res.send(JSON.stringify(data));
      });
    });
  },

  subscribe: function (req, res) {
    var podcast;
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
    // Use .findOrCreate instead...
    // // {defaults: params, where: {feedUrl: params.feedUrl}}
    db.Podcast.findOne({
      where: {
        feedUrl: params.feedUrl
      }
    })
    .then(function (data) {
      podcast = data;
      if (!podcast) {
        db.Podcast.create(params)
          .then(function (data) {
            podcastParser.execute(data.feedUrl, {options: {timeAs: 'number'}},
              function (err, response) {
                if (err) {
                  console.log(err);
                  //return res.send(err);
                }
                let items = response.channel.items;
                items.forEach((item) => {
                  if (item.title) {
                    if (config.debug) {
                      console.log(item);
                    }
                    //sanitize to remove HTML heavy description + summary
                    delete item.description;
                    delete item.summary;
                    // TODO: Check incoming length, throwing error because 255 is not enough characters...
                    item.description = item.subtitle;
                    //item.length = item.duration;
                    // TODO: Parse time into format Postgres needs...
                    if (item.enclosure) {
                      //if (item.enclosure.length) {
                      //}
                      item.length = item.enclosure.length;
                      if (item.enclosure.url) {
                        item.url = item.enclosure.url;
                      }
                    }

                    item.releaseDate = item.pubDate;
                    item.PodcastId = data.id;
                    // Use .findOrCreate instead...
                    db.Episode.create(item)
                }
              }
            );
            // Add Podcast to UserPodcasts
            // Add Episodes to UserEpisodes
          });
        });
      }
    })
    .then(function (podcast) {
      res.status(201).json(JSON.parse(podcast));
    })
  }
};
