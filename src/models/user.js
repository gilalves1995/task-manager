const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,   // Emails must be unique
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
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
});


userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user.id.toString() }, 'thisismynewcourse');
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({ email });
    if (!user)
        throw new Error('Unable to log in.');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        throw new Error('Unable to log in.');

    return user;
};

// Hash the password before saving
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