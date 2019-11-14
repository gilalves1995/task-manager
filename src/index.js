const express = require('express');

// Runs the database script (get MongoDB up and running)
require('./db/mongoose.js');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const PORT = process.env.PORT || 3000;

// Parses incoming json data to an object
app.use(express.json());

// Adds a new user
app.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
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

// Fetches all users
app.get('/users', async (req,res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch(error) {
        res.status(500).send(error);
    }

    /*
    User.find({}).then(users => {
        res.status(200).send(users);
    }).catch(error => {
        res.status(500).send(error);
    });
    */
});

// Fetches a user by id
app.get('/users/:id', async (req, res) => {
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

    /*
    User.findById(_id).then(user => {
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    }).catch(error => {
        res.status(500).send(error);
    });
    */
});

// Updates a user
app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update' });
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch(error) {
        // 500 (internal server error) or 400 (bad request)
        res.status(400).send(error);
    }
});

// Deletes a user
app.delete('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(_id);
        if (!user) {
            return res.status(404).send({ error: 'User does not exist!' });
        }
        res.status(200).send(user);
    } catch(error) {
        res.status(500).send(error);
    }
});



// Adds a new task
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task);
    } catch(error) {
        res.status(400).send(error);
    }

    /*
    task.save().then(result => {
        res.status(201).send(result);
    }).catch(error => {
        res.status(401).send(error);
    });
    */
});

// Fetches all tasks
app.get('/tasks', async (req, res) => {
    /*
    Task.find({}).then(tasks => {
        res.status(200).send(tasks);
    }).catch(error => {
        res.status(500).send(error);
    });
    */

    try {
        const tasks = await Task.find({});
        res.status(200).send(tasks);
    } catch(error) {
        res.status(500).send(error);
    }
});

// Fetches a task by id
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send();
        }
        res.status(200).send(task);
    } catch(error) {
        res.status(500).send(error);
    }

    /*
    Task.findById(_id).then(task => {
        if (!task) {
            return res.status(404).send();
        }
        res.status(200).send(task);
    }).catch(error => {
        res.status(500).send(error);
    });
    */
});

// Updates a task
app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['completed'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update! '});
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).send({ error: 'Task not found.' });
        }
        res.status(200).send(task);
    } catch(error) {
        res.status(400).send(error);
    }

});

// Deletes a task
app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send({ error: 'Task not found.' });
        }
        res.status(200).send(task);
    } catch(error) {
        res.status(500).send(error);
    }
});


app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}.`);
});