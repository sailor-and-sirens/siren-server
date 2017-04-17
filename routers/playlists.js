const playlistRouter = require('express').Router();
const playlistController = require('../controllers/playlistController.js');

playlistRouter.post('/add-episode', playlistController.addEpisodeToPlaylist);

module.exports = playlistRouter;
