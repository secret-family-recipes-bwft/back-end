const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

//authentication function

//Routers users/recipes: 

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

server.get('/', (req, res) => {
    res.send("<h1>API up and running ! :) </h1>")
})


// server.use 

module.exports = server