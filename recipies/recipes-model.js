const db = require('../data/dbConfig')

module.exports = {
    findRecipes,
    findRecipeById,
    findRecipesBy,
    addRecipe
}

function findRecipes() {
    return db('recipes')
}

function findRecipeById(id) {
    return db('recipes')
        .where({ id })
        .first()
}

function findRecipesBy(filter) {
    return db('recipes')
        .where(filter)
        .orderBy('id')
}

function addRecipe(newRecipe) {
    return db('recipes')
        .insert(newRecipe, 'id')
        .then(([id]) => {
            return findRecipeById(id)
        })
}