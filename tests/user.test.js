const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');


const userOne = {
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!'
};

// Runs before each test case in this test suite - 1 test => runs a single time
beforeEach(async () => {
    // Delete all users from test database
    await User.deleteMany();
    await new User(userOne).save();
});

test('Should signed up a new user', async () => {
    await request(app).post('/users').send({
        name: 'Gil',
        email: 'ggvr.alves@gmail.com',
        password: 'MyPass777!'
    }).expect(201)
});

test('Should log in existing user', async() => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
});

test('Should not login nonexistent user', async () => {
   await request(app).post('/users/login').send({
       email: 'nonexistentemail@example.com',
       password: 'somepwd'
   }).expect(400);
});