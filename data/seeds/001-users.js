const bcryptjs = require('bcryptjs')

const martaPassword = 'marta'
const isaacPassword = 'isaac'
const joePassword = 'joe'

const hashMarta = bcryptjs.hashSync(martaPassword, 12)
const hashIsaac = bcryptjs.hashSync(isaacPassword, 12)
const hashJoe = bcryptjs.hashSync(joePassword, 12)

exports.seed = function(knex) {
  // 000-cleanup.js already cleaned out all tables

  const users = [
    { username: 'marta', password: hashMarta, email: 'marta@marta.com'},
    { username: 'isaac', password: hashIsaac, email: 'isaac@isaac.com'},
    { username: 'joe', password: hashJoe, email: 'joe@joe.com'}
  ]

      return knex('users')
      .insert(users)
      .then(() => console.log("\n== Seed data for users table added. ==\n"));
   
};
