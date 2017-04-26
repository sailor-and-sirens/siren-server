const chalk         = require('chalk');
const config        = require('../config/config');
const sequelize     = require('../config/db');
const utils       = require('../middleware/helpers.js');
const helpers       = require('../middleware/subscriptionHelpers.js');

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
    var user = req.user || utils.mockUser();
    console.log(chalk.white('User: ', JSON.stringify(user)));

    var episode = req.body.episode;
    episode.subtitle = episode.description;
    episode.pubDate = episode.published;
    delete episode.description;
    delete episode.releaseDate;

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

    var podcast = null;

    if (config.log) {
      console.log(chalk.blue('Subscribing ' + user.username + ' to Episode...'));
      console.log(chalk.white(req.body.episode.title));
    }

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
      console.log(chalk.yellow(podcast));
      return utils.getFeed(req.body.podcast.feedUrl);
    })
    .then(function (data) {
      helpers.addEpisodes(data, podcast);
    })
    .then(function () {
      return helpers.getEpisode(podcast, episode);
    })
    .then(function (data) {
      episode = data;
      console.log(chalk.white(data));
      return helpers.addUserEpisode(req.user, data);
    })
    .then(function (data) {
      if (data) {
        res.status(201).send('Subscribed ' + user.username + ' to episode ' + req.body.episode.title + ' with ID ' + data.id);
      } else {
        res.status(500).send('Error subscribing user to Episode: ' + req.body.episode.title);
      }
    });
  },

  removeEpisodeFromInbox: function (req, res) {
    sequelize.Playlist.findAll({
      where: { UserId: req.user.id },
      include: { model: sequelize.Episode, where: {id: req.body.episodeId} }
    })
    .then(function (foundPlaylist) {
      if (foundPlaylist.length > 0) {
        sequelize.UserEpisode.update(
          { isInInbox: false },
          { where: { UserId: req.user.id, EpisodeId: req.body.episodeId}}
        )
        .then(function () {
          res.status(200).send({ message: 'Episode removed from inbox' });
        });
      } else {
        sequelize.UserEpisode.destroy({
          where: {UserId: req.user.id, EpisodeId: req.body.episodeId}
        })
        .then(function () {
          res.status(200).send({ message: 'Episode removed' });
        });
      }
    })
    .catch(function (err) {
      res.status(400).send('Error removing episode: ' + err);
    });
  },

  deleteUserEpisode: function (req, res) {
    console.log(chalk.blue('Deleting UserEpisode:'));
    console.log(chalk.white('Deleting Episode ' + req.params.id + ' from User ' + req.user.username));
    sequelize.db.query('DELETE FROM "UserEpisodes" WHERE "UserId" = ' + req.user.id + ' AND "EpisodeId" = ' + req.params.id)
      .then(function (data) {
        if (data) {
          res.status(201).send(data);
        } else {
          res.status(500).send('Error deleting user episode with ID: ' + req.body.EpisodeId);
        }
      });
  }

};
