const PlaylistEpisode = require('../models').PlaylistEpisode;

module.exports = {
  addEpisodeToPlaylist: function (req, res) {
    PlaylistEpisode.findOrCreate({
      where: {PlaylistId: req.body.playlistId, EpisodeId: req.body.episodeId}
    })
    .then(function (playlistEpisode) {
      res.status(201).json(playlistEpisode);
    })
    .catch(function (err) {
      res.status(400).send({ message: 'Error adding episode to playlist'});
      console.error(err);
    });
  }

};
