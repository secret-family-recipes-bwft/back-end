const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

//authentication function

//Routers users/recipes:
const AuthRouter = require('./components/auth/auth-router')
const UserRouter = require('./components/users/users-router') 
const RecipeRouter = require('./components/recipies/recipes-router')

const authenticate = require('./components/auth/authenticate-middleware')

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

server.get('/', (req, res) => {
    res.send("<h1>API up and running ! :) </h1>")
})

// server.use 
server.use('/api/auth', AuthRouter)
server.use('/api/users',  UserRouter) //needs authentication
server.use('/api/recipes',  RecipeRouter) //needs authentication

module.exports = server