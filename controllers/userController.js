const db = require('../middleware/db');
const jwt = require('jsonwebtoken');
const config = require('../secret.json');
_ = require('lodash');

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, {expiresIn:60*60*5});
}

module.exports = {
  createUser: function (req, res) {
    db.User.find({username: req.body.username})
      .then(function (user) {
        if (user) {
          res.status(409).send({message: 'User already exists'});
        } else {
        db.User.create(req.body)
        .then(function (data) {
          var tokenData = createToken(req.body);
          res.status(201).json({id_token: tokenData});
        });
        }
      })
  },

  checkUser: function (req, res) {
    // db.User.find(req.body)
    // .then(function (data) {
    //   console.log('Data', data)
      if (!data) {
        res.status(400).send('User not found.')
      }
      var tokenData = createToken(req.body);
      console.log('Token data: ', tokenData)
      res.status(201).json({id_token: tokenData});
    // });
  }
};
