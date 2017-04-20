const episodeRouter = require('express').Router();
const episodeController = require('../controllers/episodeController.js');

episodeRouter.post('/', episodeController.subscribe);
episodeRouter.put('/user-episode', episodeController.updateUserEpisode);

module.exports = episodeRouter;
