var router = require('express').Router();
var podcastController = require('./controllers/podcastController.js');
var userController = require('./controllers/userController.js');

router.get('/podcastFeed', podcastController.getFeed);

module.exports = router;