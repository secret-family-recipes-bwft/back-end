const bcryptjs = require('bcryptjs')

const martaPassword = 'marta'
const isaacPassword = 'isaac'
const joePassword = 'joe'

const hashMarta = bcryptjs.hashSync(martaPassword, 12)
const hashIsaac = bcryptjs.hashSync(isaacPassword, 12)
const hashJoe = bcryptjs.hashSync(joePassword, 12)

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'marta', password: hashMarta, email: 'marta@marta.com'},
        { username: 'isaac', password: hashIsaac, email: 'isaac@isaac.com'},
        { username: 'joe', password: hashJoe, email: 'joe@joe.com'}
      ]);
    });
};
