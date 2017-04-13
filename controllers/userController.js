const db = require('../middleware/db');

module.exports = {
  createUser: function (req, res) {
    db.User.create(req.body)
    .then(function (data) {
      res.status(201).json(data);
    });
  }
};
