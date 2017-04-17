const db = require('../middleware/db');
const UserEpisode = require('../models').UserEpisode;

module.exports = {
  createEpisode: function (req, res) {
    var episode = req.body;
    db.Episode.create(episode)
    .then(function (data) {
      res.status(201).json(data);
    });
  },

  updateUserEpisode: function (req, res) {
    UserEpisode.find({
      where: {UserId: 1, EpisodeId: req.body.episodeId} // TODO update with req.user.id
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
  }

};
