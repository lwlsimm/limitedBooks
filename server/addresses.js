const addressesRouter = require('express').Router();
const { json } = require('express');
const pool = require('./db')

module.exports = addressesRouter;

addressesRouter.use(json())


const getAddressesFromId = async(id) => {
  const request = await pool.query("SELECT * FROM addresses WHERE customer_id = $1", [id]);
  const addressObj = await JSON.stringify(request.rows);
  return await addressObj;
}

//retrives all addresses for customer id, returns empty obj where nothing found
addressesRouter.get('/:id', async(req, res, next) => {
  const id = req.params.id;
  const addresses = await getAddressesFromId(id);
  await res.status(200).send(JSON.parse(addresses));
})

//add an address to the db
addressesRouter.post ('/', async(req, res, next) => {
  try {
    const {customer_id, address_1, address_2, postal_town, postcode} = req.body;
    pool.query("INSERT INTO addresses (customer_id, address_1, address_2, postal_town, postcode) VALUES ($1, $2, $3, $4, $5)",[customer_id, address_1, address_2, postal_town, postcode]);
    res.status(200).send()
  } catch (err) {
    console.error(err.message)
  }
})