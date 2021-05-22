const orderRouter = require('express').Router();
const { urlencoded, json } = require('express');
const pool = require('./db');

module.exports = orderRouter;

orderRouter.use(urlencoded({ extended: true }));
orderRouter.use(json());