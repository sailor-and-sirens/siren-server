const podcastRouter = require('express').Router();
const podcastController = require('../controllers/podcastController.js');

podcastRouter.get('/feeds', podcastController.getFeed);

module.exports = podcastRouter;
