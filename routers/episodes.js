const episodeRouter = require('express').Router();
const episodeController = require('../controllers/episodeController.js');

episodeRouter.post('/', episodeController.subscribe);
episodeRouter.put('/user-episode', episodeController.updateUserEpisode);
episodeRouter.delete('/user-episode-inbox', episodeController.removeEpisodeFromInbox);
episodeRouter.delete('/:id', episodeController.deleteUserEpisode);

module.exports = episodeRouter;
