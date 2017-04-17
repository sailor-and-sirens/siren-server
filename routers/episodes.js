const episodeRouter = require('express').Router();
const episodeController = require('../controllers/episodeController.js');

episodeRouter.post('/', episodeController.createEpisode);
episodeRouter.put('/user-episodes', episodeController.updateUserEpisode);

module.exports = episodeRouter;
