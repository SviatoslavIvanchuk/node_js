const { Router } = require('express');

const usersController = require('../controllers/usersController')
const usersRouter = Router();

usersRouter.get('/', usersController.renderUsers);

module.exports = usersRouter;