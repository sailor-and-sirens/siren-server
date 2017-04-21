const playlistRouter = require('express').Router();
const playlistController = require('../controllers/playlistController.js');

playlistRouter.get('/add-playlist-modal', playlistController.getPlaylistsForAddPlaylistModal);
playlistRouter.post('/create-playlist', playlistController.createPlaylist);
playlistRouter.post('/add-episode', playlistController.addEpisodeToPlaylist);
playlistRouter.post('/create-playlist', playlistController.createPlaylist);
playlistRouter.delete('/remove-playlist', playlistController.removePlaylist);
playlistRouter.delete('/remove-episode', playlistController.removeEpisodeFromPlaylist);
playlistRouter.get('/playlist-episodes', playlistController.getEpisodesFromPlaylist);
playlistRouter.post('/get-playlists', playlistController.getPlaylists);
playlistRouter.put('/update-title', playlistController.updatePlaylistTitle);
playlistRouter.post('/listening-to', playlistController.addEpisodeToListeningTo);

module.exports = playlistRouter;
