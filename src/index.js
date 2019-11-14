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