const supertest = require('supertest')

const server = require('../../server')

const db = require('../../data/dbConfig')


describe('recipes-router', () => {
    let token
    beforeEach(async () => {

        await db('users').truncate()

        //generate a token here/ register here 
        await supertest(server)
            .post('/api/auth/register')
            .send({ username: 'marcia', password: 'marcia', email: 'marcia@marcia.com' })
            .then(res => {
                token = res.body.token
            })

        await db('recipes').truncate()
        await db('ingredients').truncate()
        await db('allergies').truncate()
        await db('instructions').truncate()
        await db('recipes').insert({ title: 'test', category: 'test', user_id: 1, source: 'marcia' })

    })


    describe('GET /api/recipes', () => {

        it('should respond with status 401 UNAUTHOIRIZED and a message when not logged in', () => {
            return supertest(server)
                .get('/api/recipes')
                .then(res => {
                    expect(res.status).toBe(401)
                    expect(res.body.you).toContain('must be logged in')
                })
        })

        it('should respond with status 200 OK when logged in', () => {

            return supertest(server)
                .get('/api/recipes')
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('should respond with an array of recipes when logged in', () => {
            return supertest(server)
                .get('/api/recipes')
                .set({ Authorization: token })
                .then(res => {
                    expect(res.body).toHaveLength(1)
                })
        })

        it('should respond with an array of recipes of same category if category query was provided when logged in', () => {
            return supertest(server)
                .get('/api/recipes?category=test')
                .set({ Authorization: token })
                .then(res => {
                    expect(res.body).toHaveLength(1)
                })
        })

    })

    describe('GET /api/recipes/:id', () => {


        it('should respond with status 401 UNAUTHOIRIZED and a message when not logged in', () => {
            return supertest(server)
                .get('/api/recipes/1')
                .then(res => {
                    expect(res.status).toBe(401)
                    expect(res.body.you).toContain('must be logged in')
                })
        })

        it('should respond with status 200 OK when logged in', () => {

            return supertest(server)
                .get('/api/recipes/1')
                .set({ Authorization: token })
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('should respond with a recipe object', () => {
            return supertest(server)
                .get('/api/recipes/1')
                .set({ Authorization: token })
                .then(res => {
                    expect(res.body.recipe.title).toBe('test')
                    expect(res.body.instructions).toBeDefined()
                    expect(res.body.ingredients).toBeDefined()
                })
        })

    })

    describe('GET /api/recipes/recent/:limit', () => {


        it('should respond with status 401 UNAUTHOIRIZED and a message when not logged in', () => {
            return supertest(server)
                .get('/api/recipes/recent/5')
                .then(res => {
                    expect(res.status).toBe(401)
                    expect(res.body.you).toContain('must be logged in')
                })
        })


        it('should respond with an array of :limit number of recent recipes', () => {
            return supertest(server)
                .get('/api/recipes/recent/5')
                .set({ Authorization: token })
                .then(res => {
                    expect(res.body).toHaveLength(1)
                })
        })

    })

    describe('POST /api/recipes/:id/ingredients', () => {

        it('should respond with an ingredient object when all data provided', () => {
            return supertest(server)
                .post('/api/recipes/1/ingredients')
                .set({ Authorization: token })
                .send({ name: 'water', quantity: 1, measure: 'bottle' })
                .then(res => {
                    expect(res.body.name).toBe('water')
                })
        })

        it('should respond with status 401 UNAUTHOIRIZED and a message when not logged in', () => {
            return supertest(server)
                .post('/api/recipes/1/ingredients')
                .send({ name: 'water', quantity: 1, measure: 'bottle' })
                .then(res => {
                    expect(res.status).toBe(401)
                    expect(res.body.you).toContain('must be logged in')
                })
        })
    })

    describe('POST /api/recipes/:id/allergies', () => {

        it('should respond with an allergy object when all data provided', () => {
            return supertest(server)
                .post('/api/recipes/1/allergies')
                .set({ Authorization: token })
                .send({ type: 'soy' })
                .then(res => {
                    expect(res.body.type).toBe('soy')
                    expect(res.body.id).toBe(1)
                })
        })

        it('should respond with status 401 UNAUTHOIRIZED and a message when not logged in', () => {
            return supertest(server)
                .post('/api/recipes/1/allergies')
                .send({ type: 'soy' })
                .then(res => {
                    expect(res.status).toBe(401)
                    expect(res.body.you).toContain('must be logged in')
                })
        })
    })

    describe('POST /api/recipes/:id/instructions', () => {

        it('should respond with status 401 UNAUTHOIRIZED and a message when not logged in', () => {
            return supertest(server)
                .post('/api/recipes/1/instructions')
                .send({ step_number:1, instructions: "yes"})
                .then(res => {
                    expect(res.status).toBe(401)
                    expect(res.body.you).toContain('must be logged in')
                })
        })

            it('should respond with an instructions object when all data provided', () => {
            return supertest(server)
                .post('/api/recipes/1/instructions')
                .set({ Authorization: token })
                .send({ step_number:1, instructions: "yes"})
                .then(res => {
                    expect(res.body.instructions).toBe('yes')
                })
        })

    })

    describe('PUT /api/recipes/:id', () => {

        it('should respond with status 401 UNAUTHOIRIZED and a message when not logged in', () => {
            return supertest(server)
                .put('/api/recipes/1')
                .send({title: 'testing'})
                .then(res => {
                    expect(res.status).toBe(401)
                    expect(res.body.you).toContain('must be logged in')
                })
        })

            it('should respond with updated recipe object and a success message', () => {
            return supertest(server)
                .put('/api/recipes/1')
                .set({ Authorization: token })
                .send({title: 'testing'})
                .then(res => {
                    expect(res.body.updatedRecipe).toBeDefined()
                    expect(res.body.success).toContain('updated')
                })
        })

    })

    describe('DELETE /api/recipes/:id', () => {

        it('should respond with status 401 UNAUTHOIRIZED and a message when not logged in', () => {
            return supertest(server)
                .delete('/api/recipes/1')
                .then(res => {
                    expect(res.status).toBe(401)
                    expect(res.body.you).toContain('must be logged in')
                })
        })

        it('should respond with delited recipe and a success message', () => {
            return supertest(server)
            .delete('/api/recipes/1')
            .set({ Authorization: token })
            .then( res => {
                expect(res.body.success).toBeDefined()
                expect(res.body.deletedRecipe).toBeDefined()
            })
        })
    })


})