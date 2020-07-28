const db = require('../../data/dbConfig')

module.exports = {
    getInstructions,
    addInstructionsToRecipe
}

function getInstructions() {
    return db('instructions')
}

function addInstructionsToRecipe(newStep) {

    return db('instructions')
    .insert( newStep, 'id')
    .then( ([id])=> {
            return db('instructions')
            .where({id})
            .first()     
    })
    
}