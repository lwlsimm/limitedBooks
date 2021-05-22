const loginRouter = require('express').Router();
const { urlencoded, json } = require('express');
const pool = require('./db');
const {getUserDataFromDB, createASession, checkSessionId, checkSessionStillValid} = require('./sessionQueries')

module.exports = loginRouter;

loginRouter.use(urlencoded({ extended: true }));
loginRouter.use(json());


//Login Attempt
loginRouter.get('/', async(req, res, next) => {
try {
  const {email, password} = req.query;
  const userData = await getUserDataFromDB(email);
  if(await userData.password === password) {
    const userId = userData.id;
    const name = await `${userData.first_name} ${userData.last_name}`
    const sessionId = await createASession(userId)
    const status = 'Success';
    await res.status(200).send({status, sessionId, name, userId})
  } else {
    res.send('Wrong PW')
  }
} catch (err) {
  res.status(404).send(err.message)
}
})

//CheckingLogin
loginRouter.get('/check', async(req, res, next) => {
  try {
    const {userId, sessionId} = req.query;
    const newDate = new Date()
    const timeNow = newDate.getTime();
    const validity = await checkSessionStillValid(userId, sessionId, timeNow);
    if (validity) {
      res.send({'valid_session': true})
    } else {
      res.send({'valid_session': false})
    }
  } catch (err) { 
    res.status(404).send(err.message)
  }
})

//Logout
loginRouter.put('/logout', async(req, res, next) => {
  try {
    const {id, sessionid} = req.query;
    const isSessionValid = await checkSessionId(sessionid, id);
    await console.log(isSessionValid)
    if(await isSessionValid) {
      pool.query("DELETE FROM sessions WHERE customer_id = $1", [id])
    } 
    res.status(204);
  } catch (err) {
    res.status(404).send(err.message);
  }
})

