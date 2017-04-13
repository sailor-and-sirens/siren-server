const db = require('../middleware/db');

module.exports = {
  createEpisode: function (req, res) {
    var episode = req.body;
    db.Episode.create(episode)
    .then(function (data) {
      res.status(201).json(data);
    });
  }
};
