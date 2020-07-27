const db = require('../data/dbConfig')

module.exports = {
    addUser,
    findUsers,
    findUserById,
    findUsersBy
}

function addUser (newUser) {
    return db('users')
    .insert(newUser, 'id')
    .then( ([id]) => {
        return findUserById(id)
    })
}

function findUsers() {
    return db('users as u')
        .select('u.id', 'u.username', 'u.email')
        .orderBy('u.id')
}

function findUsersBy(filter) {
    return db('users')
    .where(filter)
    .orderBy('id')
}

function findUserById(id) {
    return db('users')
    .where({id})
    .first()
}