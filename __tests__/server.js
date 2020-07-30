// const supertest = require('supertest')

// const server = require('../server')

// const db = require('../data/dbConfig')

// const bcryptjs = require('bcryptjs')


// let token
// beforeEach(async () => {
//     await db('users').truncate()
//     await db('recipes').truncate()

//     const user = { username: 'frania', password: 'frania', email: 'frania@frania.com' }
//     const hash = bcryptjs.hashSync(user.password, 12)
//     user.password = hash
//     await db('users').insert(user)

//     await supertest(server)
//     .post('/api/auth/register')
//     .send({ username: 'francisco', password: 'francisco', email: 'francisco@francisco.com' })
//     .then(res => {
//         token = res.body.token
//     })

//     await db('recipes').insert({ title: 'test', category: 'test', user_id: 1, source: 'francisco' })

// })

// describe('auth-router', () => {
//     // beforeEach(async () => {
//     //     await db('users').truncate()
//     // })
//     // beforeEach(async () => {
//     //     const user = { username: 'frania', password: 'frania', email: 'frania@frania.com' }

//     //     const hash = bcryptjs.hashSync(user.password, 12)

//     //     user.password = hash

//     //     await db('users').truncate()
//     //     await db('users').insert(user)
//     // })

//     //```````Register````````
//     describe('POST /api/auth/register', () => {
//         // beforeEach(async () => {
//         //     await db('users').truncate()
//         // })

//         it('should respond with status 201 OK', () => {
//             return supertest(server)
//                 .post('/api/auth/register')
//                 .send({ username: "marta", password: "marta", email: "marta@marta.com" })
//                 .then(res => {
//                     expect(res.status).toBe(201)
//                 })
//         })

//         it('should respond with token', () => {
//             return supertest(server)
//                 .post('/api/auth/register')
//                 .send({ username: "marta", password: "marta", email: "marta@marta.com" })
//                 .then(res => {
//                     expect(res.body.token).toBeDefined()
//                 })
//         })

//         it('should respond with new user', () => {
//             return supertest(server)
//                 .post('/api/auth/register')
//                 .send({ username: "marta", password: "marta", email: "marta@marta.com" })
//                 .then(res => {
//                     expect(res.body.data.username).toBe('marta')
//                     expect(res.body.data.email).toBe('marta@marta.com')
//                 })
//         })


//         it('should respond with status 400 when sending an empty object and a json msg', () => {
//             return supertest(server)
//                 .post('/api/auth/register')
//                 .send({})
//                 .then(res => {
//                     expect(res.status).toBe(400)
//                     expect(res.type).toMatch(/json/i)
//                 })
//         })



//     })

//     //````````Login````````
//     describe('POST /api/auth/login', () => {
//         // beforeEach(async () => {
//         //     const user = { username: 'frania', password: 'frania', email: 'frania@frania.com' }

//         //     const hash = bcryptjs.hashSync(user.password, 12)

//         //     user.password = hash

//         //     await db('users').truncate()
//         //     await db('users').insert(user)
//         // })

//         it('should respond with status 201 OK', () => {


//             return supertest(server)
//                 .post('/api/auth/login')
//                 .send({ username: 'frania', password: 'frania' })
//                 .then(res => {
//                     expect(res.status).toBe(201)
//                 })
//         })

//         it('should respond with a welcome message and token', () => {

//             return supertest(server)
//                 .post('/api/auth/login')
//                 .send({ username: 'frania', password: 'frania' })
//                 .then(res => {
//                     expect(res.body.message).toContain('Welcome')
//                     expect(res.body.token).toBeDefined()
//                 })
//         })

//         it('should respond with a welcome message', () => {

//             return supertest(server)
//                 .post('/api/auth/login')
//                 .send({ username: 'frania', password: 'frania' })
//                 .then(res => {
//                     expect(res.body.message).toContain('Welcome')
//                 })
//         })

//         it('should respond with json invalid credentials message when given wrong creds', () => {

//             return supertest(server)
//                 .post('/api/auth/login')
//                 .send({ username: 'marta', password: 'marta' })
//                 .then(res => {
//                     expect(res.type).toMatch(/json/i)
//                     expect(res.body.message).toContain('invalid cred')
//                 })
//         })

//         it('should respond with status 400 BAD REQUEST and a message about missing required fields', () => {
//             return supertest(server)
//                 .post('/api/auth/login')
//                 .send({ username: 'marta' })
//                 .then(res => {
//                     expect(res.status).toBe(400)
//                     expect(res.body.message).toContain('Must provide required fields')
//                 })
//         })
//     })

// })


// //``````````````````````USERS-ROUTER````````````````````````

// describe('users-router', () => {

//     describe('GET /api/users', () => {

//         it('should respond with status 401 UNAUTHOIRIZED and a message when not logged in', () => {
//             return supertest(server)
//                 .get('/api/users')
//                 .then(res => {
//                     expect(res.status).toBe(401)
//                     expect(res.body.you).toContain('must be logged in')
//                 })
//         })

//         it('should respond with status 200 OK when logged in', () => {

//             return supertest(server)
//                 .get('/api/users')
//                 .set({ Authorization: token })
//                 .then(res => {
//                     expect(res.status).toBe(200)
//                 })
//         })

//         it('should respond with an array of users when logged in', () => {
//             return supertest(server)
//                 .get('/api/users')
//                 .set({ Authorization: token })
//                 .then(res => {
//                     expect(res.body).toHaveLength(2) //keeps on changing..
//                 })
//         })

//     })

//     describe('GET /api/users/:id', () => {


//         it('should respond with status 401 UNAUTHOIRIZED and a message when not logged in', () => {
//             return supertest(server)
//                 .get('/api/users/1')
//                 .then(res => {
//                     expect(res.status).toBe(401)
//                     expect(res.body.you).toContain('must be logged in')
//                 })
//         })

//         it('should respond with status 200 OK when logged in', () => {

//             return supertest(server)
//                 .get('/api/users/1')
//                 .set({ Authorization: token })
//                 .then(res => {
//                     expect(res.status).toBe(200)
//                 })
//         })

//         it('should respond with a user object', () => {
//             return supertest(server)
//                 .get('/api/users/1')
//                 .set({ Authorization: token })
//                 .then(res => {
//                     expect(res.body.username).toBe('frania')// frania or francisco ? ?
//                 })
//         })

//     })

//     describe('GET /api/users/:id/recipes', () => {


//         it('should respond with status 401 UNAUTHOIRIZED and a message when not logged in', () => {
//             return supertest(server)
//                 .get('/api/users/1/recipes')
//                 .then(res => {
//                     expect(res.status).toBe(401)
//                     expect(res.body.you).toContain('must be logged in')
//                 })
//         })

//         it('should respond with status 200 OK when logged in', () => {

//             return supertest(server)
//                 .get('/api/users/1/recipes')
//                 .set({ Authorization: token })
//                 .then(res => {
//                     expect(res.status).toBe(200)
//                 })
//         })

//         it('should respond with array of recipes', () => {
//             return supertest(server)
//                 .get('/api/users/1/recipes')
//                 .set({ Authorization: token })
//                 .then(res => {
//                     expect(res.body).toHaveLength(1)
//                 })
//         })

//     })

// })

// //``````````````````````````RECIPES-ROUTER``````````````````````````

// describe('recipes-router', () => {



//     describe('GET /api/recipes', () => {

//             it('should respond with status 401 UNAUTHOIRIZED and a message when not logged in', () => {
//                 return supertest(server)
//                     .get('/api/recipes')
//                     .then(res => {
//                         expect(res.status).toBe(401)
//                         expect(res.body.you).toContain('must be logged in')
//                     })
//             })
    
//             it('should respond with status 200 OK when logged in', () => {
    
//                 return supertest(server)
//                     .get('/api/recipes')
//                     .set({ Authorization: token })
//                     .then(res => {
//                         expect(res.status).toBe(200)
//                     })
//             })
    
//             it('should respond with an array of recipes when logged in', () => {
//                 return supertest(server)
//                     .get('/api/recipes')
//                     .set({ Authorization: token })
//                     .then(res => {
//                         expect(res.body).toHaveLength(1)
//                     })
//             })
        
//             it('should respond with an array of recipes of same category if category query was provided when logged in', () => {
//                 return supertest(server)
//                     .get('/api/recipes?category=test')
//                     .set({ Authorization: token })
//                     .then(res => {
//                         expect(res.body).toHaveLength(1)
//                     })
//             })

//     })

//     describe('GET /api/recipes/:id', () => {


//         it('should respond with status 401 UNAUTHOIRIZED and a message when not logged in', () => {
//             return supertest(server)
//                 .get('/api/recipes/1')
//                 .then(res => {
//                     expect(res.status).toBe(401)
//                     expect(res.body.you).toContain('must be logged in')
//                 })
//         })

//         it('should respond with status 200 OK when logged in', () => {

//             return supertest(server)
//                 .get('/api/recipes/1')
//                 .set({ Authorization: token })
//                 .then(res => {
//                     expect(res.status).toBe(200)
//                 })
//         })

//         it('should respond with a recipe object with details', () => {
//             return supertest(server)
//                 .get('/api/recipes/1')
//                 .set({ Authorization: token })
//                 .then(res => {
//                     expect(res.body.recipe.title).toBe('test')
//                     expect(res.body.instructions).toBeDefined()
//                     expect(res.body.ingredients).toBeDefined()
//                 })
//         })

//     })
   
//     describe('GET /api/recipes/recent/:limit', () => {


//         it('should respond with status 401 UNAUTHOIRIZED and a message when not logged in', () => {
//             return supertest(server)
//                 .get('/api/recipes/recent/5')
//                 .then(res => {
//                     expect(res.status).toBe(401)
//                     expect(res.body.you).toContain('must be logged in')
//                 })
//         })


//         it('should respond with an array of :limit number of recent recipes', () => {
//             return supertest(server)
//                 .get('/api/recipes/recent/5')
//                 .set({ Authorization: token })
//                 .then(res => {
//                     expect(res.body).toHaveLength(1)
//                 })
//         })

//     })

//     describe('POST /api/recipes/:id/ingredients', () => {

//         it('should respond with a messade if ingredient name wasnt provided', () => {
//             return supertest(server)
//             .get('/api/recipes/1/ingredients')
//             .set({ Authorization: token })
//             .send({})
//             .then(res => {
//                 expect(res.body).toBe('a')
//             })
//         })
  

//     })

// })

it('', () => {
    
})