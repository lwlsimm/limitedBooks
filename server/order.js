const orderRouter = require('express').Router();
const { urlencoded, json } = require('express');
const pool = require('./db');
const {getUserDataFromDB, createASession, checkSessionId, checkSessionStillValid, getFullCustomerData} = require('./sessionQueries')

module.exports = orderRouter;

orderRouter.use(urlencoded({ extended: true }));
orderRouter.use(json());

orderRouter.use('/', async(req, res , next) => {
  try {
    const {userId, sessionId} = req.query;
    const newDate = new Date()
    const timeNow = newDate.getTime();
    const validity = await checkSessionStillValid(userId, sessionId, timeNow);
    if(await validity) {
      console.log('Valid')
      next();
    } else {
      res.status(401).send({'valid_session' : false})
    }
  } catch (err) {
    res.status(401).send()
  }
})

orderRouter.post('/', async(req, res, next) => {
  console.log('Step 2')
  console.log(req.body);
  res.send()
})