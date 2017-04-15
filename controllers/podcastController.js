//const db = require('../middleware/db');
const db = require('../middleware/db');
const podcastParser = require('podcast-parser');

module.exports = {
  getFeed: function (req, res) {
    var feedUrl = req.query.url;
    podcastParser.execute(feedUrl, {},
      function (err, response) {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        let data = response.channel.items;
        data.forEach((item) => {
          var duration = item.duration;
          //parse duration
          if(duration) {
            if (!duration.includes(':')) {
              var formattedDuration = '';
              if (duration.length % 2 !== 0) {
                duration = '0' + duration;
              }
              for(var i = 0; i < duration.length; i ++) {
                formattedDuration += duration.charAt(i);
                if ((i + 1) % 2 === 0 && (i + 1) !== duration.length) {
                  formattedDuration += ':';
                }
              }
              item.duration = formattedDuration;
            }
          }
          //sanitize to remove HTML heavy description + summary
          delete item.description;
          delete item.summary;
        });
        res.send(JSON.stringify(data));
      }
    );
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
