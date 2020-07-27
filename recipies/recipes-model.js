const db = require('../data/dbConfig')

module.exports = {
    findRecipes,
    findRecipeById,
    findRecipesBy,
    addRecipe,
    updateRecipe,
    removeRecipe
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

function updateRecipe(changes, id) {
    return db('recipes')
        .where({ id })
        .update(changes)
        .then(() => {
            return findRecipeById(id)
        })
}

function removeRecipe(id) {
    return findRecipeById(id)
        .then(deletedRecipe => {
            return db('recipes')
                .where({ id })
                .del()
                .then(() => {
                    return deletedRecipe
                })
        })
}