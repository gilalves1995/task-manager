// Mongoose allows to map an javascript object (Node.js) to a document (stored in Mongodb)
// Also check the npm module validator

const mongoose = require('mongoose');
const validator = require('validator');


const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true
});

// Define the mongoose model for the user
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value))
                throw new Error('Provided email is not valid.');
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number.');
            }

        }
    }
});


// Define the mongoose model for the tasks
const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
});


// An instance of the previously defined model - mongoose grabs the User, makes it lower case and pluralizes it (users is the name of the collection)
const me = new User({
    name: 'nEW Usert ',
    email: 'SDJFLSDJlkjdKSLDJF@gmail.com'
});

// Save the instance in the database

me.save().then(me => {
    console.log(me);
}).catch(error => {
    console.log('Error: ', error);
});


// Save the Task instance in the database
/*
const task = new Task({
    description: 'Drive children to school',
    completed: false
});

task.save().then(t => {
    console.log(t);
}).catch(error => {
    console.log('Error: ', error);
});
*/



