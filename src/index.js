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

const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
    const user = await User.findById('5dd3eed78d41c11853b794e5');
    await user.populate('tasks').execPopulate();
    console.log(user.tasks);

    // const task = await Task.findById('5dd2ddba88f48b477ac61015');
    // await task.populate('owner').execPopulate();
    // console.log(task.owner);
};

main();

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


/*
const jwt = require('jsonwebtoken');

const myFunction = async() => {
    const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' });
    console.log(token);

    const data = jwt.verify(token, 'thisismynewcourse');
    console.log(data);
};

myFunction();
*/





/*

Authentication schema:

1) User provides email and password to /users/login, if it exists, a token is generated and added to the user's token list
2) The user and token are sent to the client. The client stores the token and sends it when issuing a request
3) The user attempts to access a route to perform an operation: before it does, a middleware function, auth, runs to
test if the user is authenticated
    3.1) Extracts the token from the header
    3.2) Extracts the id from the token
    3.3) Verifies if there is a user with the id and containing that token
    3.4) If there is, run the handler (next)


*/




