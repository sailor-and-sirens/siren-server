const playlistRouter = require('express').Router();
const playlistController = require('../controllers/playlistController.js');

playlistRouter.get('/add-playlist-modal', playlistController.getPlaylistsForAddPlaylistModal);
playlistRouter.post('/create-playlist', playlistController.createPlaylist);
playlistRouter.post('/add-episode', playlistController.addEpisodeToPlaylist);
playlistRouter.delete('/remove-episode', playlistController.removeEpisodeFromPlaylist);

module.exports = playlistRouter;
