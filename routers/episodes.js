const episodeRouter = require('express').Router();
const episodeController = require('../controllers/episodeController.js');

episodeRouter.post('/', episodeController.createEpisode);

module.exports = episodeRouter;
