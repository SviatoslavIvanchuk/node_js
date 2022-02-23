const { Router } = require('express');

const usersRouter = require('./usersRouter')
const userRouter = require('./userRouter')
const loginRouter = require('./loginRouter')
const signinRouter = require("./signinRouter");
const deleteRouter = require("./deleteRouter");
const notfoundRouter = require("./notfoundRouter");

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/user', userRouter);
routes.use('/login', loginRouter);
routes.use('/signin', signinRouter);
routes.use('/delete', deleteRouter);
routes.use('/notFound', notfoundRouter);
routes.use((req, res) => {
    res.render('notFound');
});

module.exports = routes;