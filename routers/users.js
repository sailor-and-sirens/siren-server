const userRouter = require('express').Router();
const userController = require('../controllers/userController.js');

userRouter.post('/', userController.createUser);
userRouter.post('/login', userController.checkUser);

module.exports = userRouter;
