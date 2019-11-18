const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = express.Router();

// Adds a new user
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();

        res.status(201).send({ user, token });
    } catch(error) {
        res.status(400).send(error);
    }

    /*
    user.save().then(result => {
        res.status(201).send(result);
    }).catch(error => {
        res.status(400).send(error);
    });
    */
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.send({ user, token });
    } catch(error) {
        res.status(400).send();
    }
});


router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
        await req.user.save();
        res.status(200).send();
    } catch(error) {
        res.status(500).send(error);
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        req.status(200).send();
    } catch(error) {
        res.status(500).send(error);
    }
});

// Gets my profile
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

/* Fetches all users

router.get('/users', auth, async (req,res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch(error) {
        res.status(500).send(error);
    }


    User.find({}).then(users => {
        res.status(200).send(users);
    }).catch(error => {
        res.status(500).send(error);
    });

});
*/


/*
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send("");
        }
        res.status(200).send(user);
    } catch(error) {
        res.status(500).send(error);
    }

    // Old version
    User.findById(_id).then(user => {
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    }).catch(error => {
        res.status(500).send(error);
    });

});
*/

// Updates a user
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update' });
    }

    try {
        // findByIdAndUpdate bypasses middleware and the password is not hashed

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        // const user = await User.findById(req.params.id);
        updates.forEach(update => req.user[update] = req.body[update]);
        await req.user.save();
        res.status(200).send(req.user);

    } catch(error) {
        // 500 (internal server error) or 400 (bad request)
        res.status(400).send(error);
    }
});

// Deletes a user
router.delete('/users/me', auth, async (req, res) => {
    try {
        /*
        const user = await User.findByIdAndDelete(req.user._id);
        if (!user) {
            return res.status(404).send({ error: 'User does not exist!' });
        }
        */
        await req.user.remove();

        res.status(200).send(req.user);
    } catch(error) {
        res.status(500).send(error);
    }
});

module.exports = router;