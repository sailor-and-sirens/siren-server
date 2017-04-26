const secret = require('../config/secret.json');
const jwt = require('jsonwebtoken');

var authenticate = function (req, res, next) {
//   if(req.url.includes('/inbox')){
//     getNewEpisodes();
//   }
  if(req.url.includes('/logout')) {
    delete req.user;
  }
  if (!req.url.includes('/createUser') && !req.url.includes('/login')) {
    var token = req.headers.authorization;
    if (!token) {
      res.status(500).send('No authorization header with request.');
      return;
    } else {
      console.log('TOKEN: ', token);
      var userObj = jwt.decode(token, secret.secret);
      req.user = userObj;
      console.log('USER: ', userObj.id);
      return next();
    }
  }
  return next();
};

module.exports = {
  authenticate: authenticate
};
