
//const db = require('../middleware/db');
const podcastRouter = require('express').Router();
const podcastController = require('../controllers/podcastController.js');
const updater = require('../middleware/getNewEpisodes.js');

podcastRouter.get('/feeds', podcastController.getFeed);
podcastRouter.get('/', podcastController.getSubscriptions);
podcastRouter.post('/', podcastController.subscribe);
podcastRouter.get('/newEpisodes', updater.getNewEpisodes)

module.exports = podcastRouter;
