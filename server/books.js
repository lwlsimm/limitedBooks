const booksRouter = require('express').Router();
const pool = require('./db');

module.exports = booksRouter;


booksRouter.get('/', async (req, res, next) => {
  try {
    const booksData = await pool.query("SELECT * FROM books");
    res.json(booksData.rows);
  } catch (err) {
    console.error(err.message);
  }
})

booksRouter.get('/:id', async (req, res, next) => {
  try {
    const {id} = await req.params;
    const todo = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})