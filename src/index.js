const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

// Runs the database script (get MongoDB up and running)
require('./db/mongoose.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Parses incoming json data to an object
app.use(express.json());

// Registers the user router (methods to manage the User resource)
app.use(userRouter);

// Registers the task router (methods to manage the Task resource)
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
