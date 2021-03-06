// Mongoose allows to map an javascript object (Node.js) to a document (stored in Mongodb)
// Also check the npm module validator

const mongoose = require('mongoose');

const mongodbUrl = process.env.MONGODB_URL.toString();

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});


// An instance of the previously defined model - mongoose grabs the User, makes it lower case and pluralizes it (users is the name of the collection)

/*
const me = new User({
    name: 'Gil',
    email: 'gg.alves@campus.fct.unl.pt',
    age: 20,
    password: 'ccccccc'
});
*/

// Save the instance in the database

/*
me.save().then(me => {
    console.log(me);
}).catch(error => {
    console.log('Error: ', error);
});
*/


/*

task.save().then(t => {
    console.log(t);
}).catch(error => {
    console.log('Error: ', error);
});
*/



// Endpoints
// Create task - POST /tasks
// Read all tasks - GET /tasks
// Read a specific task - GET /tasks/:id
// Update a specific task - PATCH /tasks/:id
// Delete a task - DELETE /tasks/:id

