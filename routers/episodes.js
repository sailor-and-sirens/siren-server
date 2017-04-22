const episodeRouter = require('express').Router();
const episodeController = require('../controllers/episodeController.js');

episodeRouter.post('/', episodeController.subscribe);
episodeRouter.put('/user-episode', episodeController.updateUserEpisode);
episodeRouter.delete('/user-episode-inbox', episodeController.removeEpisodeFromInbox);

module.exports = episodeRouter;
