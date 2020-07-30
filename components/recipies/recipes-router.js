const router = require('express').Router()

const RecipeModel = require('./recipes-model')
const IngredientModel = require('../ingredients/ingredients-model')
const AllergyModel = require('../allergies/allergies-model')
const InstructionsModel = require('../instructions/instructions-model')

//``````standup``````````
// const cloudinary = require('../../config/cloudinaryConfig')
// const multer = require('../../config/multerConfig')
// // const { dataUri } = require('../../config/multerConfig')
// const cloudinaryConfig = cloudinary.cloudinaryConfig
// const uploader = cloudinary.uploader
// const multerUploads = multer.multerUploads
// // const Datauri = multer.dataUri
// //recipe must be uploaded first -- then we can upload picture through multer
// const datauri = multer.dataUri
//`````````````````````




//````````GET``````````
// get recipes
router.get('/', (req, res) => {
    const { category } = req.query
    if (req.query.category) { //localhost:5000/api/recipes?category=dinner
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

//get recipe by id with all details
router.get('/:id', validateRecipeId, (req, res) => {
    const { id } = req.params
    promises = [
        RecipeModel.findRecipeById(id),
        RecipeModel.getRecipeIngredients(id),
        RecipeModel.getRecipeAllergies(id),
        RecipeModel.getRecipeInstructions(id)
    ]

    Promise.all(promises)
        .then(([recipe, ingredients, allergies, instructions]) => {
            res.json({ recipe, ingredients, allergies, instructions })
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
    // RecipeModel.findRecipeById(req.params.id)
    //     .then(recipe => {
    //         res.json(recipe)
    //     })
    //     .catch(err => {
    //         res.status(500).json({ error: err.message })
    //     })
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
//post recipes in user-router


//post ingredient by recipe id
router.post('/:id/ingredients', validateRecipeId, (req, res) => {
    if (!Object.keys(req.body).length) {
        res.status(400).json({ message: 'nothing to add was provided..' })
    } else if (!req.body.name) {
        res.status(400).json({ message: 'missing required field name' })
    } else if (!req.body.quantity || !req.body.measure) {
        res.status(400).json({ message: 'please provide quantity and measure(ex: cups, tbs, etc) for yor indgredient' })
    }

    const name = { name: req.body.name }

    IngredientModel.addIngredientToRecipe(name, req.params.id, req.body.quantity, req.body.measure)
        .then(newIngredient => {
            console.log(newIngredient)
            res.status(201).json(newIngredient)
        })
        .catch(err => {
            console.log(name)
            res.status(500).json({ error: err.message })
        })
})

//post allergies by recipe id
router.post('/:id/allergies', validateRecipeId, (req, res) => {
    if (!Object.keys(req.body).length) {
        res.status(400).json({ message: 'nothing to add was provided..' })
    } else if (!req.body.type) {
        res.status(400).json({ message: 'missing required field type' })
    }

    AllergyModel.addAllergyToRecipe(req.body, req.params.id)
        .then(newAllergy => {
            res.status(201).json(newAllergy)
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
})

//post instructions by recipe id
router.post('/:id/instructions', validateRecipeId, (req, res) => {
    if (!Object.keys(req.body).length) {
        res.status(400).json({ message: 'nothing to add was provided..' })
    } else if (!req.body.step_number || !req.body.instructions) {
        res.status(400).json({ message: 'missing required fields step_number and/or instructions' })
    }

    InstructionsModel.addInstructionsToRecipe({ ...req.body, recipe_id: req.params.id })
        .then(newStep => {
            res.status(201).json(newStep)
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
})


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

//```````````````Uploading picture, standup``````````````````
// router.put('/:id/image',validateRecipeId, multerUploads.single('image-raw'), cloudinaryConfig,  (req, res) => { //'image-raw' => whatever you call it in the body
//     const file = datauri(req)

//     uploader.upload(file.content,
//         { dpr: "auto", responsive:true, width: "auto", crop: "scale"}, //object for transformations that you can do
//         (error, response) => {
//   console.log(response)
//             req.image = response.secure_url
//             RecipeModel.updateRecipe({picture_url: req.image}, +req.params.id)
//             .then( recipe => {
//                 res.status(200).json({recipe})
//             })
//             .catch(err => {
//                 res.status(500).json({error: err.message})
//             })
//         }
//         )
// })

module.exports = router