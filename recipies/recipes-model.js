const db = require('../data/dbConfig')

module.exports = {
    findRecipes
}

function findRecipes () {
    return db('recipes')
}