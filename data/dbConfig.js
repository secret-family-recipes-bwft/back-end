const knex = require('knex');

const knexConfig = require('../knexfile.js');

const environment = process.env.DB_ENV

module.exports = knex(knexConfig[environment]);