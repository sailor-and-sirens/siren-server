const db = require('../middleware/db');
const jwt = require('jsonwebtoken');
const config = require('../secret.json');
_ = require('lodash');

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, {expiresIn:60*60*5});
}

module.exports = {
  createUser: function (req, res) {
    db.User.find({where: {username: req.body.username}})
      .then(function (user) {
        console.log('Found user: ', user);
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
    db.User.find({where: {username: req.body.username, password: req.body.password}})
    .then(function (data) {
      console.log('Data', data)
      if (!data) {
        res.status(400).send({message: 'Incorrect username and/or password'})
      } else {
        var tokenData = createToken(req.body);
        console.log('Token data: ', tokenData)
        res.status(201).json({id_token: tokenData});
      }
    });
  }
};
