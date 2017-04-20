const userRouter = require('express').Router();
const userController = require('../controllers/userController.js');

userRouter.post('/createUser', userController.createUser);
userRouter.post('/login', userController.checkUser);
userRouter.post('/likeEpisode', userController.likeEpisode);
userRouter.post('/bookmarkEpisode', userController.bookmarkEpisode);
userRouter.get('/inbox', userController.getInbox);

module.exports = userRouter;
