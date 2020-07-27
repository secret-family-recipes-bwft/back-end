const router = require('express').Router()

const RecipeModel = require('./recipes-model')

//````````GET``````````
//get recipes
router.get('/', (req, res) => {
    RecipeModel.findRecipes()
    .then( recipes => {
        res.json(recipes)
    })
    .catch( err => {
        res.status(500).json({error: err.message})
    })
})

//get recipe by id
router.get('/:id',validateRecipeId, (req, res) => {
    RecipeModel.findRecipeById(req.params.id)
    .then( recipe => {
        res.json(recipe)
    })
    .catch( err => {
        res.status(500).json({error: err.message})
    })
})

//get recipes by category
router.get('/category/:category', (req, res) => {
    const category = req.params.category  
    RecipeModel.findRecipesBy({ category })
    .then( recipes => {
        if(!recipes.length){
            res.status(404).json({message: 'no recipes with that category'})
        } else {
            res.json(recipes)
        }
       
    })
    .catch( err => {
        res.status(500).json({error: err.message})
    })
})

//get most recent 3 recipes
router.get('/recent/:limit', (req, res) => {
    RecipeModel.findRecipes().orderBy('id', 'desc').limit(req.params.limit)
    .then( recipes => {
        res.json(recipes)
    })
    .catch( err => {
        res.status(500).json({error: err.message})
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