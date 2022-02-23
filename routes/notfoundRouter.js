const { Router } = require('express');

const notFoundController = require('../controllers/notfoundController')
const notfoundRouter = Router();

notfoundRouter.get('/notFound', notFoundController.renderNotFound)

module.exports = notfoundRouter;