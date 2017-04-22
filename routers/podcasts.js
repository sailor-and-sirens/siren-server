
//const db = require('../middleware/db');
const podcastRouter = require('express').Router();
const podcastController = require('../controllers/podcastController.js');

podcastRouter.get('/feeds', podcastController.getFeed);
podcastRouter.get('/', podcastController.getSubscriptions);
podcastRouter.post('/', podcastController.subscribe);

module.exports = podcastRouter;
