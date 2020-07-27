const router = require('express').Router()

const RecipeModel = require('./recipes-model')

//````````GET``````````
router.get('/', (req, res) => {
    RecipeModel.findRecipes()
    .then( recipes => {
        res.json(recipes)
    })
    .catch( err => {
        res.status(500).json({error: err.message})
    })
})

module.exports = router