const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

// Runs the database script (get MongoDB up and running)
require('./db/mongoose.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Express Middleware
// Without: new request -> run route handler
// With: new request -> do something -> run route handler

/*
app.use((req, res, next) => {
    if (req.method === 'GET') {
        res.send('GET requests are disabled');
    } else {
        next();
    }
});
*/

// Register middleware function to disable all requests
/*
app.use((req, res, next) => {
    res.status(503).send('Service is temporarily unavailable.');
});
*/

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}.`);
});



/* Securing password
const bcrypt = require('bcryptjs');

const myFunction = async() => {
    const password = 'Red12345!';

    // Second argument is the number of rounds
    const hashedPassword = await bcrypt.hash(password, 8);
    const isMatch = await bcrypt.compare('Red12345!', hashedPassword);
    console.log(isMatch);
};

myFunction();
*/


const jwt = require('jsonwebtoken');

const myFunction = async() => {
    const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' });
    console.log(token);

    const data = jwt.verify(token, 'thisismynewcourse');
    console.log(data);
};

myFunction();
