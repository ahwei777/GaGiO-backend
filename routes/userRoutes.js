const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user');
const { checkAuth } = require('../middleware/auth');

// user
userRouter.post('/user', userController.register);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
userRouter.get('/user', checkAuth('admin'), userController.getAllUser);
userRouter.get('/user/:id', checkAuth('admin'), userController.getUser);
userRouter.patch('/user/:id', checkAuth(), userController.updateUserInfo);
userRouter.patch('/user/password/:id', userController.updateUserPassword);
userRouter.get('/me', userController.getMe);
userRouter.get(
  '/me/bought-courses',
  checkAuth(),
  userController.getMyBoughtCourse
);
userRouter.get('/me/orders', userController.getMe);

module.exports = userRouter;
