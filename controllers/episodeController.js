const chalk         = require('chalk');
const config        = require('../config/config');
const sequelize     = require('../config/db');
const helpers       = require('../middleware/helpers.js');
var podcastID = 0;
var episodeID = 0;

module.exports = {
  updateUserEpisode: function (req, res) {
    sequelize.UserEpisode.find({
      where: {UserId: req.user.id, EpisodeId: req.body.episodeId}
    }).then(function (foundUserEpisode) {
      foundUserEpisode.update({
        currentTime: req.body.currentTime,
        lastPlayed: req.body.lastPlayed
      }).then(function (updatedUserEpisode) {
        res.status(200).json(updatedUserEpisode);
      });
    }).catch(function (err) {
      res.status(400).send({message: 'Error updating UserEpisode'});
      console.error(err);
    });
  },

  subscribe: function (req, res) {
    var user = req.user || helpers.mockUser();
    console.log(chalk.white('User: ', JSON.stringify(user)));
    if (config.log) {
      console.log(chalk.blue('Subscribing ' + user.username + ' to Episode...'));
      console.log(chalk.white(req.body.episode.title));
    }
    var params = {
      artistId: req.body.podcast.artistId,
      artistName: req.body.podcast.artistName,
      artworkUrl: req.body.podcast.artworkUrl100,
      artworkUrl600: req.body.podcast.artworkUrl600,
      collectionId: req.body.podcast.collectionId,
      feedUrl: req.body.podcast.feedUrl,
      name: req.body.podcast.collectionName,
      primaryGenreName: req.body.podcast.primaryGenreName,
    };
    sequelize.Podcast.findOne({
      where: {
        feedUrl: params.feedUrl
      }
    })
    .then(function (data) {
      if (config.debug) {
        console.log(chalk.blue('Line 49 | Data Returned from Query for Existing Podcast Record: ', JSON.stringify(data, null, 2)));
      }
      // If the Podcast has not been written to the database:
      if (!data) {
        // Create the Podcast record
        sequelize.Podcast.create(params)
        .then(function (data) {
          console.log(chalk.blue('Line 56 | Podcast ID: ' + data.id));
          podcastID = data.id;
          return data;
        });
      } else {
        podcastID = data.id;
        return data;
      }
    })
    .then(() => {
      if (config.debug) {
        console.log(chalk.blue('Line 61 | Episode Data Returned from Request: ', JSON.stringify(req.body.episode, null, 2)));
        console.log(chalk.blue('Line 65 | Podcast ID: ' + podcastID));
      }
      var episode = req.body.episode;
      episode.subtitle = episode.description;
      episode.pubDate = episode.published;
      delete episode.description;
      delete episode.releaseDate;

      sequelize.Episode.findOne({
        where: {
          title: episode.title,
          PodcastId: podcastID
        }
      })
      .then(function (data) {
        if(!data) {
          var episode = req.body.episode;
          episode.subtitle = episode.description;
          episode.pubDate = episode.published;
          delete episode.description;
          delete episode.releaseDate;

          if (config.debug) {
            console.log(chalk.blue('Line 90 | Adding Episode: ' + JSON.stringify(episode)));
          }
          sequelize.Episode.create({
            title: episode.title,
            description: episode.description,
            length: episode.duration,
            releaseDate: episode.published,
            url: episode.enclosure.url,
            PodcastId: podcastID,
            feed: episode
          })
          .then(function (data) {
            console.log(chalk.blue('Line 102 | Episode ID: ' + data.id));
            episodeID = data.id;
          })
          .then(function () {
            var user = req.user; // || helpers.mockUser();
            if (user) {
              sequelize.db.query('INSERT INTO "UserEpisodes" ("UserId", "EpisodeId", "isInInbox", "createdAt", "updatedAt") VALUES (' + user.id + ', ' + episodeID + ', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);')
                .then(function (data) {
                  if (data) {
                    res.status(201).send(data);
                  } else {
                    res.status(500).send('Error subscribing user to Episode: ' + req.body.episode.title);
                  }
                  return;
                });
            }
          });
        } else {
          console.log(chalk.blue('Line 119 | Episode ID: ' + data.id));
          episodeID = data.id;
        }
      })
      .then(function () {
        sequelize.UserEpisode.findOne({
          where: {
            EpisodeId: episodeID,
            UserId: user.id
          }
        })
        .then(function (data) {
          if (!data) {
            var user = req.user || helpers.mockUser();
            if (user) {
              sequelize.db.query('INSERT INTO "UserEpisodes" ("UserId", "EpisodeId", "isInInbox", "createdAt", "updatedAt") VALUES (' + user.id + ', ' + episodeID + ', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);')
                .then(function (data) {
                  if (data) {
                    res.status(201).send(data);
                  } else {
                    res.status(500).send('Error subscribing user to Episode: ' + req.body.episode.title);
                  }
                });
            }
          }
        });
      });
    });
  }
};
