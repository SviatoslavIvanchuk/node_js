const { Router } = require('express');

const loginValid = require("../middleware/loginValid");
const loginController = require('../controllers/loginController');
const loginRouter = Router();

loginRouter.get('/', loginController.renderLogin);
loginRouter.post('/', loginValid, loginController.redirectUsers);

module.exports = loginRouter;