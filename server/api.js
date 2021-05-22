const express = require('express');
const apiRouter = express.Router();
const pool = require('./db')

//Routes
//const customersRouter = require('./customers');
//apiRouter.use('/customers',customersRouter);

const booksRouter = require('./books');
apiRouter.use('/books',booksRouter);

const addressesRouter = require('./addresses');
apiRouter.use('/addresses',addressesRouter);

const loginRouter = require('./login');
apiRouter.use('/login',loginRouter);

const registerRouter = require('./register');
apiRouter.use('/register',registerRouter);

const orderRouter = require('./order');
apiRouter.use('/order',orderRouter);


module.exports = apiRouter;