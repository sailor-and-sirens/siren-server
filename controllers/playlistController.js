const db = require('../config/db');
const getTotalDuration = require('../middleware/helpers.js').getTotalDuration;

module.exports = {

  getPlaylistsForAddPlaylistModal: function (req, res) {
    db.Playlist.findAll({
      where: {
        name: {
          $notIn: ['Listening To', 'Bookmarks']
        },
        UserId: req.user.id
      },
      attributes: ['id', 'name', 'createdAt'],
      include: { model: db.Episode, attributes: ['id', 'length'] }
    })
    .then(function (playlists) {
      var playlistsWithDuration = playlists.map(playlist => {
        var data = playlist.dataValues;
        var episodeIds = data.Episodes.map(function (episode) {
          return episode.dataValues.id;
        });
        return {
          id: data.id,
          name: data.name,
          createdAt: data.createdAt,
          totalEpisodes: data.Episodes.length,
          totalTime: getTotalDuration(data.Episodes),
          episodeIds: episodeIds
        };
      });
      console.log(playlistsWithDuration);
      res.status(200).json(playlistsWithDuration);
    })
    .catch(function (err) {
      res.status(400).send({ message: 'Error retrieving playlists: ' + err});
      console.error(err);
    });
  },

  createPlaylist: function (req, res) {
    db.Playlist.findOrCreate({
      where: {name: req.body.name, UserId: req.user.id}
    })
    .then(function (playlist) {
      res.status(201).json(playlist);
    })
    .catch(function (err) {
      res.status(400).send({ message: 'Error creating playlist: ' + err});
      console.error(err);
    });
  },

  getPlaylists: function (req, res) {
    db.Playlist.findAll({
      where: {UserId: req.user.id},
      include: [
        {model: db.Episode}
      ]
    })
    .then(function (playlists) {
      console.log('playlists?', playlists);
      res.status(200).send(playlists);
    })
    .catch(function (err) {
      res.status(400).send({ message: 'Error fetching playlist: ' + err});
      console.error(err);
    });
  },

  addEpisodeToPlaylist: function (req, res) {
    db.Playlist.find({
      where: {
        name: {
          $notIn: ['Listening To', 'Bookmarks']
        },
        UserId: 4
      },
      include: {model: db.Episode, where: {id: 1}}
    })
    .then(function (playlist) {
      db.PlaylistEpisode.findOrCreate({
        where: {PlaylistId: req.body.playlistId, EpisodeId: req.body.episodeId}
      })
      .then(function (playlistEpisode) {
        if (playlist && playlist.id !== req.body.playlistId) {
          db.PlaylistEpisode.destroy({
            where: {PlaylistId: playlist.id, EpisodeId: req.body.episodeId}
          });
        }
        res.status(201).json(playlistEpisode);
      });
    })
    .catch(function (err) {
      res.status(400).send({ message: 'Error adding episode to playlist: ' + err});
      console.error(err);
    });
  },

  addEpisodeToListeningTo: function (req, res) {
    db.Playlist.find({
      where: {name: 'Listening To', UserId: req.user.id}
    })
    .then(function (playlist) {
      db.PlaylistEpisode.findOrCreate({
        where: {PlaylistId: playlist.id, EpisodeId: req.body.episodeId}
      })
      .then(function (playlistEpisode) {
        res.status(201).json(playlistEpisode);
      });
    })
    .catch(function (err) {
      res.status(400).send({ message: 'Error adding episode to Listening To: ' + err});
      console.error(err);
    });
  },

  removeEpisodeFromPlaylist: function (req, res) {
    db.PlaylistEpisode.destroy({
      where: {PlaylistId: req.body.playlistId, EpisodeId: req.body.episodeId}
    })
    .then(function () {
      res.status(204).send({ messaged: 'Episode successfully removed from playlist'});
    })
    .catch(function (err) {
      res.status(400).send({ message: 'Error removing episode from playlist: ' + err});
      console.error(err);
    });
  },

  removeEpisodeFromListeningTo: function (req, res) {
    db.Playlist.find({
      where: {name: 'Listening To', UserId: req.user.id}
    })
    .then(function (playlist) {
      db.PlaylistEpisode.destroy({
        where: {PlaylistId: playlist.id, EpisodeId: req.body.episodeId}
      })
      .then(function () {
        res.status(204).send({ messaged: 'Episode successfully removed from Listening To playlist'});
      });
    })
    .catch(function (err) {
      res.status(400).send({ message: 'Error removing episode from playlist: ' + err});
      console.error(err);
    });
  },

  getEpisodesFromPlaylist: function (req, res) {
    db.PlaylistEpisode.findAll({
      where: {PlaylistId: req.body.playlistId}
    })
    .then(function (playlist) {
      res.status(200).json(playlist);
    })
    .catch(function (err) {
      res.status(400).send({ message: 'Error fetching playlist: ' + err});
      console.error(err);
    });
  },

  updatePlaylistTitle: function (req, res) {
    console.log('hit create playlist', req.body);
    db.Playlist.find({
      where: {PlaylistId: req.body.playlistId}
    })
    .then(function (foundPlaylist) {
      foundPlaylist.update({
        name: req.body.name
      }).then(function (updatedPlaylist) {
        res.status(201).json(updatedPlaylist);
      });
    })
    .catch(function (err) {
      res.status(400).send({ message: 'Error updating playlist title: ' + err});
      console.error(err);
    });
  },

  removePlaylist: function (req, res) {
    db.Playlist.destroy({
      where: {PlaylistId: req.body.playlistId}
    })
    .then(function () {
      res.status(204).send({ messaged: 'Playlist successfully removed'});
    })
    .catch(function (err) {
      res.status(400).send({ message: 'Error removing playlist: ' + err});
      console.error(err);
    });
  }

};
