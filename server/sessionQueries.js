const pool = require('./db');

const createASession = async (id) => {
  const newDate = new Date();
  const loginTime = newDate.getTime();
  const expiryTime = loginTime + (1000 * 60 * 60 * 2)
  const sessionCode = makeSessionCode(12);
  const session_id = `${loginTime}-${sessionCode}`
  await pool.query("INSERT INTO sessions (id, customer_id, expiry, created) VALUES ($1, $2, $3, $4)", [session_id, id, expiryTime, loginTime])
  await pool.query("DELETE FROM sessions WHERE customer_id = $1 AND expiry < $2", [id, expiryTime])
  return session_id;
}

const isEmailUnique = async (email) => {
  const serverCheck = await pool.query("SELECT email FROM customers WHERE email = $1", [email]);
  if(await JSON.stringify(serverCheck.rows[0])) {return false} else {return true};
}

const getUserDataFromDB = async (email) => {
  const data = await pool.query("SELECT * FROM customers WHERE email = $1", [email]);
  const userByEmail = await data.rows[0];
  console.log(userByEmail)
  return userByEmail;
}

const checkSessionStillValid = async (userId, sessionId, timeNow) => {
  
  try {
    const data = await pool.query("SELECT * FROM sessions WHERE id = $1", [sessionId]);
    const {expiry, customer_id} = await data.rows[0];
    if(await timeNow > expiry || customer_id != userId) {
      return false
    } 
    return true
  } catch (err) {
    return false;
  }
}

const checkSessionId = async (session_id, customer_id) => {
  console.log(session_id)
  const serverCheck= await pool.query("SELECT id FROM sessions WHERE customer_id = $1", [customer_id]);
  const sessIdFromServer = serverCheck.rows[0]
  const { id } = await sessIdFromServer;
  if(await id  === session_id) {
    return true
  } else {
    return false
  }
}

const makeSessionCode = (length) => {
  const result = [];
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
  charactersLength)));
  }
  return result.join('');
}

module.exports = {makeSessionCode, checkSessionId, getUserDataFromDB, isEmailUnique, createASession, checkSessionStillValid}