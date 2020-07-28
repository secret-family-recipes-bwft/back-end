const router = require('express').Router()

const UserModel = require('./users-model')
const RecipeModel = require('../recipies/recipes-model')


router.use('/:id', validateUserId)
//````````GET````````
//get users
router.get('/', (req, res) => {
    UserModel.findUsers()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
})

//get user by id
router.get('/:id', (req, res) => {
    UserModel.findUserById(req.params.id).select('users.id', 'users.username', 'users.email')
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
})


//get user's recipes
router.get('/:id/recipes', (req, res) => {
    UserModel.findUserRecipes(req.params.id)
        .then(recipes => {
            res.json(recipes)
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })
})

//```````POST````````
//post recipe by user id
router.post('/:id/recipes', (req, res) => {

    if (!Object.keys(req.body).length) {
        res.status(400).json({ message: 'nothing to add was provided...' }) 
    } else if (!req.body.title || !req.body.category) {
        res.status(400).json({ message: 'missing required field title and/or category ' })
    }

    UserModel.findUserById(req.params.id)
    .then(user => {

        RecipeModel.addRecipe({...req.body, user_id: req.params.id, source: user.username})
        .then(newRecipe => {
            res.status(201).json(newRecipe)
        })
        .catch(err => {
            res.status(500).json({ error: err.message })
        })

    })
    .catch( err => {
        res.status(500).json({error: err.message})
    })

})


//``````custom Middleware```````
function validateUserId(req, res, next) {
    UserModel.findUserById(req.params.id)
        .then(user => {
            console.log('validateUserId:', user)
            if (!user) {
                res.status(404).json({ message: 'invalid user id' })
            } else {
                req.user = user
                next()
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'error validating user id' })
        })
}



module.exports = router