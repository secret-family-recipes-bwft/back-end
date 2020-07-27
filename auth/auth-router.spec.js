const supertest = require('supertest')

const server = require('../server')

const db = require('../data/dbConfig')

const bcryptjs = require('bcryptjs')

describe('auth-router', () => {

    //```````Register````````
    describe('POST /api/auth/register', () => {
        beforeEach(async () => {
            await db('users').truncate()
        })

        it('', () => {

        })
    })

    //````````Login````````
    describe('POST /api/auth/login', () => {
        beforeEach(async () => {
            const user = { username: 'frania', password: 'frania', email: 'frania@frania.com'}

            const hash = bcryptjs.hashSync(user.password, 12)

            user.password = hash

            await db('users').truncate()
            await db('users').insert(user)
        })

  it('', () => {
            
        })
    })

})