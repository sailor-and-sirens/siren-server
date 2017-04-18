//const db = require('../middleware/db');
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
    db.Podcast.create(params)
      .then(function (data) {
        podcastParser.execute(data.feedUrl, {},
          function (err, response) {
            if (err) {
              console.log(err);
              return res.send(err);
            }
            var data = response.channel.items;
            data.forEach((item) => {
              //sanitize to remove HTML heavy description + summary
              delete item.description;
              delete item.summary;
              item.PodcastId = data.id;
              // TODO: Check incoming length, throwing error because 255 is not enough characters...
              //item.description = item.content;
              // TODO: Parse time into format Postgres needs...
              //item.length = item.duration;
              item.releaseDate = item.pubDate;
              // Use .findOrCreate instead...
              db.Episode.create(item);
            });
          }
        );
        // Add Podcast to UserPodcasts
        // Add Episodes to UserEpisodes
        res.status(201).json(data);
      });
  }
};
