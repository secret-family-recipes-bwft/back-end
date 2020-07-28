const db = require('../../data/dbConfig')

module.exports = {
    addUser,
    findUsers,
    findUserById,
    findUsersBy,
    findUserRecipes,
    findUserRecipesWithAllInfo // <--
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

function findUserRecipes (user_id) {
    return db('users as u')
    .select('r.*','u.username')
    .join('recipes as r', 'r.user_id', 'u.id')
    .where('u.id','=', user_id)
}

function findUserRecipesWithAllInfo (user_id) {

}