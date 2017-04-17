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
      where: {UserId: 1, EpisodeId: 1}
    }).then(function (foundUserEpisode) {
      console.log(req.body);
      foundUserEpisode.update({
        bookmarked: req.body.bookmarked || foundUserEpisode.bookmarked,
        liked: req.body.liked || foundUserEpisode.liked,
        currentTime: req.body.currentTime || null,
        lastPlayed: req.body.lastPlayed || null
      }).then(function (updatedUserEpisode) {
        res.status(200).json(updatedUserEpisode);
      });
    }).catch(function (err) {
      res.status(400).send({message: 'Error updating UserEpisode'});
      console.error(err);
    });
  }

};
