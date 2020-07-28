const db = require('../../data/dbConfig')

module.exports = {
    getIngredients,
    addIngredientToRecipe
}

function getIngredients() {
    return db('ingredients')
}

function addIngredientToRecipe(newIngredient, recipe_id, quantity, measure) {

    return db('ingredients')
    .insert( newIngredient, 'id')
    .then( ([id])=> {
        return db('recipes_ingredients')
        .insert({recipe_id, ingredient_id: id, quantity, measure}, 'id')
        .then(() =>{
            return db('ingredients')
            .where({id})
            .first()
        })
    })
}