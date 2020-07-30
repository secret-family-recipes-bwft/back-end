const bcryptjs = require('bcryptjs') //encryption
const jwt = require('jsonwebtoken') //token

const router = require('express').Router()

const UserModel = require('../users/users-model')
const { isValid, gotEmail } = require('../users/users-middleware')

require('dotenv').config()
//````````POST`````````
//register
router.post('/register', (req, res) => {
    if (isValid(req.body) && gotEmail(req.body)) {
        const rounds = +process.env.BCRYPT_ROUNDS

        const hash = bcryptjs.hashSync(req.body.password, rounds)

        req.body.password = hash

        UserModel.addUser(req.body)
            .then(newUser => {
                const token = makeJWTToken(newUser) // can login after registering with token

                res.status(201).json({ data: newUser, token }) //give them token after registering
            })
            .catch(err => {
                UserModel.findUsers()
                    .then(users => {
                        if (users.filter(user => user.username === req.body.username)) {
                            res.status(400).json({ message: 'username must be unique' })
                        } else {
                            res.status(500).json({ error: err.message })
                        }
                    })
            })
    } else {
        res.status(400).json({ message: 'Must provide require fields username and/or password and/or email' })
    }
})

//login
router.post('/login', (req, res) => {
    const { username, password } = req.body

    if (isValid(req.body)) {
        UserModel.findUsersBy({ username })
            .then(([user]) => {
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = makeJWTToken(user)

                    res.status(201).json({ message: `Welcome to the API ${user.username}`, token })
                } else {
                    res.status(401).json({ message: 'invalid credentials' })
                }
            })
    } else {
        res.status(400).json({ message: 'Must provide required fields username and/or password' })
    }
})


//```````TOKEN helpers````````
function makeJWTToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    }

    const secret = process.env.JWT_SECRET 

    const options = {
        expiresIn: '1h'
    }

    return jwt.sign(payload, secret, options)
}


module.exports = router