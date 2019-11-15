const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password must not contain the word "password".');
            }
        }
    }
});

// Middleware: pre() triggers a function before an event
// The first argument is the event
// The second argument is the function to be called

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    // Call next when we are done - if we never call it, it will hang forever thinking we are still running some code before saving the user
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

// Middleware - customize functions to run every time a given event occurs