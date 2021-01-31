const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user');
const { checkAuth } = require('../middleware/auth');

// user
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/me', userController.getMe);
userRouter.patch('/me', checkAuth(), userController.updateMyInfo);
userRouter.patch('/password/me', checkAuth(), userController.updateMyPassword);

userRouter.get('/', checkAuth('admin'), userController.getAllUser);
userRouter.get('/:id', checkAuth('admin'), userController.getUser);
// id 須放置最後方避免上方兩個參數也被當作 url params 解析
userRouter.patch('/:id', checkAuth('admin'), userController.updateUserAuth);

module.exports = userRouter;
