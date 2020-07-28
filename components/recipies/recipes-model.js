const db = require('../../data/dbConfig')

module.exports = {
    findRecipes,
    findRecipeById,
    findRecipesBy,
    addRecipe,
    updateRecipe,
    removeRecipe,

    getRecipeIngredients,
    getRecipeAllergies,
    getRecipeInstructions,
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

//```
function getRecipeIngredients(recipe_id) {
    return db('ingredients as i')
        .select('i.*')
        .join('recipes_ingredients as ri', 'ri.ingredient_id', 'i.id')
        .join('recipes as r', 'r.id', 'ri.recipe_id')
        .where('recipe_id', '=', recipe_id)
}

function getRecipeAllergies(recipe_id) {
    return db('allergies as a')
        .select('a.*')
        .join('recipes_allergies as ra', 'ra.allergy_id', 'a.id')
        .join('recipes as r', 'r.id', 'ra.recipe_id')
        .where('recipe_id', '=', recipe_id)
}

function getRecipeInstructions(recipe_id) {
    return db('instructions as i')
    .select('i.*')
    .join('recipes as r','r.id', 'i.recipe_id')
    .where('recipe_id', '=', recipe_id)
}