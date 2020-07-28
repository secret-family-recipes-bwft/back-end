const router = require('express').Router()

const RecipeModel = require('./recipes-model')

//````````GET``````````
// get recipes
router.get('/', (req, res) => {
    const { category } = req.query
    if(req.query.category){ //localhost:5000/api/recipes?category=dinner
        RecipeModel.findRecipesBy({ category })
        .then(recipes => {
            if (!recipes.length) {
                res.status(404).json({ message: 'no recipes with that category' })
            } else {
                res.json(recipes)
            }

        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
    } else { //localhost:5000/api/recipes
        RecipeModel.findRecipes()
        .then(recipes => {
            res.json(recipes)
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
    }
  
})

//get recipe by id
router.get('/:id', validateRecipeId, (req, res) => {
    RecipeModel.findRecipeById(req.params.id)
        .then(recipe => {
            res.json(recipe)
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
})

//get recipes by category
// router.get('/', (req, res) => { //--> combine into the base GET 
//     const { category } = req.query
//     RecipeModel.findRecipesBy({ category })
//         .then(recipes => {
//             if (!recipes.length) {
//                 res.status(404).json({ message: 'no recipes with that category' })
//             } else {
//                 res.json(recipes)
//             }

//         })
//         .catch(err => {
//             res.status(500).json({ error: err.message })
//         })
// })

//get most recent 3 recipes
router.get('/recent/:limit', (req, res) => {
    RecipeModel.findRecipes().orderBy('id', 'desc').limit(req.params.limit)
        .then(recipes => {
            res.json(recipes)
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
})

//``````POST````````
//in users-router.js


//``````PUT``````````
router.put('/:id', validateRecipeId, (req, res) => {
    if (!Object.keys(req.body).length) {
        res.status(400).json({ message: 'nothing to update was provided...' })
    }

    RecipeModel.updateRecipe(req.body, req.params.id)
        .then(updatedRecipe => {
            res.json({ success: 'updated!', updatedRecipe })
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
})

//``````DELETE```````
router.delete('/:id', validateRecipeId, (req, res) => {
    RecipeModel.removeRecipe(req.params.id)
        .then(deletedRecipe => {
            res.json({ success: 'deleted!', deletedRecipe })
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
})

//````````custom Middleware``````
function validateRecipeId(req, res, next) {
    RecipeModel.findRecipeById(req.params.id)
        .then(recipe => {
            console.log('validateRecipeId:', recipe)
            if (!recipe) {
                res.status(404).json({ message: 'invalid recipe id' })
            } else {
                req.recipe = recipe
                next()
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'error validating recipe id' })
        })
}


module.exports = router