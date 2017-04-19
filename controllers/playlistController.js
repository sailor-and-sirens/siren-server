const db = require('../config/db');

module.exports = {

  createPlaylist: function (req, res) {
    db.Playlist.findOrCreate({
      where: {name: req.body.name, UserId: req.body.userId}
    })
    .then(function (playlist) {
      res.status(201).json(playlist);
    })
    .catch(function (err) {
      res.status(400).send({ message: 'Error creating playlist: ' + err});
      console.error(err);
    });
  },

  addEpisodeToPlaylist: function (req, res) {
    db.PlaylistEpisode.findOrCreate({
      where: {PlaylistId: req.body.playlistId, EpisodeId: req.body.episodeId}
    })
    .then(function (playlistEpisode) {
      res.status(201).json(playlistEpisode);
    })
    .catch(function (err) {
      res.status(400).send({ message: 'Error adding episode to playlist: ' + err});
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
  }

};
