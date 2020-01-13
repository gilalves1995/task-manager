const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneId = mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
};

const userTwoId = mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: 'Jess',
    email: 'jess@example.com',
    password: 'myhouse099@@',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
};

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First task',
    completed: false,
    owner: userOneId
};

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second task',
    completed: true,
    owner: userOneId
};

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third task',
    completed: true,
    owner: userTwoId
};

const setupDatabase = async() => {
    // Delete all users from the test database
    await User.deleteMany();
    await Task.deleteMany();

    // Adds a set of users to test the log in feature
    await new User(userOne).save();
    await new User(userTwo).save();

    // Add a set of tasks
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
};

module.exports = {
    userOneId,
    userOne,
    userTwo,
    taskOne,
    setupDatabase
};


//
// User Test Ideas
//
// Should not signup user with invalid name/email/password x
// Should not update user if unauthenticated x
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated

//
// Task Test Ideas
//
// Should not create task with invalid description/completed
// Should not update task with invalid description/completed
// Should delete user task
// Should not delete task if unauthenticated
// Should not update other users task
// Should fetch user task by id
// Should not fetch user task by id if unauthenticated
// Should not fetch other users task by id
// Should fetch only completed tasks
// Should fetch only incomplete tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks