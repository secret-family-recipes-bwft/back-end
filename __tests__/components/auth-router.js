
const supertest = require('supertest')

const server = require('../../server')

const db = require('../../data/dbConfig')

const bcryptjs = require('bcryptjs')

const knexCleaner = require('knex-cleaner')

describe('auth-router', () => {

    beforeEach(async () => {
        await knexCleaner.clean(db)

        const user = { username: 'frania', password: 'frania', email: 'frania@frania.com' }

        const hash = bcryptjs.hashSync(user.password, 12)

        user.password = hash

        // await db('users').truncate()
        await db('users').insert(user)
    })

    //```````Register````````
    describe('POST /api/auth/register', () => {
        // beforeEach(async () => {
        //     await db('users').truncate()
        // })

        it('should respond with status 201 OK', async () => {
            // return supertest(server)
            //     .post('/api/auth/register')
            //     .send({ username: "marta", password: "marta", email: "marta@marta.com" })
            //     .then(res => {
            //         expect(res.status).toBe(201)
            //     })

            const res = await supertest(server)
                .post('/api/auth/register')
                .send({ username: "marta", password: "marta", email: "marta@marta.com" })

            expect(res.status).toBe(201)
        })

        it('should respond with token', async () => {
            const res = await supertest(server)
                .post('/api/auth/register')
                .send({ username: "marta", password: "marta", email: "marta@marta.com" })
                // .then(res => {
                    expect(res.body.token).toBeDefined()
                // })
        })

        it('should respond with new user', async () => {
            const res = await supertest(server)
                .post('/api/auth/register')
                .send({ username: "marta", password: "marta", email: "marta@marta.com" })
                // .then(res => {
                    expect(res.body.data.username).toBe('marta')
                    expect(res.body.data.email).toBe('marta@marta.com')
                // })
        })


        it('should respond with status 400 when sending an empty object and a json msg', async () => {
            const res = await supertest(server)
                .post('/api/auth/register')
                .send({})
                // .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.type).toMatch(/json/i)
                // })
        })



    })

    //````````Login````````
    describe('POST /api/auth/login', () => {
        // beforeEach(async () => {
        //     const user = { username: 'frania', password: 'frania', email: 'frania@frania.com' }

        //     const hash = bcryptjs.hashSync(user.password, 12)

        //     user.password = hash

        //     await db('users').truncate()
        //     await db('users').insert(user)
        // })

        it('should respond with status 201 OK', async () => {

            const res = await supertest(server)
                .post('/api/auth/login')
                .send({ username: 'frania', password: 'frania' })
                // .then(res => {
                    expect(res.status).toBe(201)
                // })
        })

        it('should respond with a welcome message and token', () => {

            return supertest(server)
                .post('/api/auth/login')
                .send({ username: 'frania', password: 'frania' })
                .then(res => {
                    expect(res.body.message).toContain('Welcome')
                    expect(res.body.token).toBeDefined()
                })
        })

        it('should respond with a welcome message', () => {

            return supertest(server)
                .post('/api/auth/login')
                .send({ username: 'frania', password: 'frania' })
                .then(res => {
                    expect(res.body.message).toContain('Welcome')
                })
        })

        it('should respond with json invalid credentials message when given wrong creds', () => {

            return supertest(server)
                .post('/api/auth/login')
                .send({ username: 'marta', password: 'marta' })
                .then(res => {
                    expect(res.type).toMatch(/json/i)
                    expect(res.body.message).toContain('invalid cred')
                })
        })

        it('should respond with status 400 BAD REQUEST and a message about missing required fields', () => {
            return supertest(server)
                .post('/api/auth/login')
                .send({ username: 'marta' })
                .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.body.message).toContain('Must provide required fields')
                })
        })
    })

})

it('', () => {

})