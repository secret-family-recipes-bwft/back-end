const knex = require('knex');

const knexConfig = require('../knexfile.js');

const environment = process.env.DB_ENV || "development"; //adding for testing environment to run properly

module.exports = knex(knexConfig[environment]);