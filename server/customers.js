// const customersRouter = require('express').Router();
// const { urlencoded, json } = require('express');
// const pool = require('./db');
// const cors = require('cors')

// module.exports = customersRouter;



// customersRouter.use(urlencoded({ extended: true }));
// customersRouter.use(json());
// customersRouter.use(cors({credentials: true, origin: 'http://localhost:3000'}))

// //Session Auth

// customersRouter.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
// }))

// //logout
// customersRouter.put('/logout', (req, res, next) => {
//   req.session.destroy()
//   console.log('Session Ended')
// })

// //Login
// customersRouter.post('/login', async (req, res, next) => {
//   console.log(req.query)
//   const {email, password} = req.query;
//   const dataFromDB = await getUserDataFromDB(email);
//   if(password === dataFromDB.password) {
//     const { email, id } = dataFromDB; 
//     req.session.userId = id;
//     req.session.email = email;  
//     console.log(id);
//   }
//   res.status(204).send();
// })

// //retrive user data
// customersRouter.get('/login', async (req, res, next) => {
// try {
//   const searchForEmail = req.session.email;
//   const user = await getUserDataFromDB(searchForEmail);
//   const {first_name, last_name, email, id} = await user;
//   const name = await `${first_name} ${last_name}`
//   await res.send({name, email, id})
// } catch (error) {
//   res.status(404)
// }
// })

// // Checks if the email address already exists in the system
// const emailUnique = async (email) => {
//   const serverCheck = await pool.query("SELECT email FROM customers WHERE email = $1", [email]);
//   if(await JSON.stringify(serverCheck.rows[0])) {return false} else {return true};
// }

// //Get the user data from db
// const getUserDataFromDB = async (email) => {
//   const data = await pool.query("SELECT * FROM customers WHERE email = $1", [email]);
//   const userByEmail = await data.rows[0]
//   return userByEmail;
// }



// //create user
// customersRouter.post('/', async (req, res, next) => {
//   try {
//     const {email, password, first_name, last_name} = req.query;
//     const emailAvailable = await emailUnique(email);
//     if(await emailAvailable) {
//       pool.query("INSERT INTO customers (email, password, first_name, last_name) VALUES ($1, $2, $3, $4)", 
//       [email, password, first_name, last_name])
//       res.status(200).send()
//     } else {
//       res.status(409).send('this email already exists')
//     }
//   } catch (err) {
//     console.error(err.message)
//   }
// })

