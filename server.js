const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

//authentication function

//Routers users/recipes:
const AuthRouter = require('./auth/auth-router')
const UserRouter = require('./users/users-router') 
const RecipeRouter = require('./recipies/recipes-router')

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

server.get('/', (req, res) => {
    res.send("<h1>API up and running ! :) </h1>")
})

// server.use 
server.use('/api/auth', AuthRouter)
server.use('/api/users', UserRouter)
server.use('/api/recipes', RecipeRouter)

module.exports = server