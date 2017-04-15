const db = require('../middleware/db');
const jwt = require('jsonwebtoken');
const config = require('../secret.json');
const bcrypt = require('bcrypt');
_ = require('lodash');

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, {expiresIn:60*60*5});
}

module.exports = {
  createUser: function (req, res) {
    bcrypt.hash(req.body.password, 10)
    .then(function(hash) { return hash })
    .then((hash) => {
      req.body.password = hash;
      db.User.find({where: {username: req.body.username}})
    })
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
    db.User.find({where: {username: req.body.username}})
    .then(function (data) {
      if (!data) {
        res.status(400).send({message: 'Incorrect username and/or password'})
      } else {
        bcrypt.compare(req.body.password, data.password, function(err, response) {
          if(err || !response) {
            console.log('Error ', err);
            res.status(400).send({message: 'Incorrect username and/or password'})
          } else {
            var tokenData = createToken(req.body);
            res.status(201).json({id_token: tokenData});
          }
        });
      }
    })
    .catch((error) => {
        console.warn('Error: ', error);
    });
  }
};
