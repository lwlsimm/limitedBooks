const registerRouter = require('express').Router();
const { urlencoded, json } = require('express');
const pool = require('./db');
const {isEmailUnique, createASession} = require ('./sessionQueries')

module.exports = registerRouter;

registerRouter.use(urlencoded({ extended: true }));
registerRouter.use(json());

//create a new customer
registerRouter.post('/', async (req, res, next) => {
  try {
  const {email, password,first_name, last_name, address_1, address_2, postal_town, postcode} = req.query;
  const name = `${first_name} ${last_name}`
  const emailIsUnique = await isEmailUnique(email);
  let status = ''
  if(await emailIsUnique) {  
    await pool.query("INSERT INTO customers (email, password, first_name, last_name) VALUES ($1, $2, $3, $4)", [email, password, first_name, last_name])
    const data = await pool.query("SELECT id FROM customers WHERE email = $1", [email])
    const userId = await data.rows[0].id;
    await pool.query("INSERT INTO addresses (customer_id, address_1, address_2, postal_town, postcode) VALUES($1, $2, $3, $4, $5)", [userId, address_1, address_2, postal_town, postcode])
    status = 'Success';
    const sessionId = await createASession(userId);
    res.send({status, sessionId, name, userId})
  } else {
    status = 'Email Already Exists'
    res.send({status})
  }
    res.send({status, sessionId, name, userId})
  } catch (err) {
    console.error(err.message)
  } 
})



