const supertest = require('supertest')

const server = require('../../server')

const db = require('../../data/dbConfig')


describe('users-router', () => {
    let token
    beforeEach(async () => {

        await db('users').truncate()
  
        //generate a token here/ register here 
        await supertest(server)
            .post('/api/auth/register')
            .send({ username: 'francisco', password: 'francisco', email: 'francisco@francisco.com' })
            .then(res => {
                token = res.body.token
            })

        await db('recipes').truncate()
        await db('recipes').insert({ title: 'test', category: 'test', user_id: 1, source: 'francisco' })
    })

    describe('GET /api/users', () => {

        it('should respond with status 401 UNAUTHOIRIZED and a message when not logged in', () => {
            return supertest(server)
                .get('/api/users')
                .then(res => {
                    expect(res.status).toBe(401)
                    expect(res.body.you).toContain('must be logged in')
                })
        })

        it('should respond with status 200 OK when logged in', () => {

            return supertest(server)
                .get('/api/users')
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('should respond with an array of users when logged in', () => {
            return supertest(server)
                .get('/api/users')
                .set({ Authorization: token })
                .then(res => {
                    expect(res.body).toHaveLength(1) //keeps on changing..
                })
        })

    })

    describe('GET /api/users/:id', () => {


        it('should respond with status 401 UNAUTHOIRIZED and a message when not logged in', () => {
            return supertest(server)
                .get('/api/users/1')
                .then(res => {
                    expect(res.status).toBe(401)
                    expect(res.body.you).toContain('must be logged in')
                })
        })

        it('should respond with status 200 OK when logged in', () => {

            return supertest(server)
                .get('/api/users/1')
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('should respond with a user object', () => {
            return supertest(server)
                .get('/api/users/1')
                .set({ Authorization: token })
                .then(res => {
                    expect(res.body.username).toBe('francisco')
                })
        })

    })

    describe('GET /api/users/:id/recipes', () => {


        it('should respond with status 401 UNAUTHOIRIZED and a message when not logged in', () => {
            return supertest(server)
                .get('/api/users/1/recipes')
                .then(res => {
                    expect(res.status).toBe(401)
                    expect(res.body.you).toContain('must be logged in')
                })
        })

        it('should respond with status 200 OK when logged in', () => {

            return supertest(server)
                .get('/api/users/1/recipes')
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('should respond with array of recipes', () => {
            return supertest(server)
                .get('/api/users/1/recipes')
                .set({ Authorization: token })
                .then(res => {
                    expect(res.body).toHaveLength(1)
                })
        })

    })

})