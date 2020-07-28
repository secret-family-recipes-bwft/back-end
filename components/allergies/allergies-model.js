const db = require('../../data/dbConfig')

module.exports = {
    getAllergies,
    addAllergyToRecipe
}

function getAllergies() {
    return db('allergies')
}

function addAllergyToRecipe(newAllergy, recipe_id) {

    return db('allergies')
    .insert( newAllergy, 'id')
    .then( ([id])=> {
        return db('recipes_allergies')
        .insert({recipe_id, allergy_id: id}, 'id')
        .then(() =>{
            return db('allergies')
            .where({id})
            .first()
        })
    })
}