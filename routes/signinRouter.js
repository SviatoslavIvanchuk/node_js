const { Router } = require('express');

const signinController = require('../controllers/signinController');
const signinValid = require("../middleware/signinValid");
const signinRouter = Router();

signinRouter.get('/', signinController.renderSignin);
signinRouter.post('/', signinValid, signinController.findUser);


module.exports = signinRouter;