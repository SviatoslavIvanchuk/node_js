const { Router } = require('express');

const userController = require('../controllers/userController');
const userRouter = Router();

userRouter.get('/', userController.renderUser);
userRouter.get('/:id', userController.findUser);

module.exports = userRouter;