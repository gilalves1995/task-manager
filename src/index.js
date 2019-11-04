const express = require('express');

// Runs the database script (get MongoDB up and running)
require('./db/mongoose.js');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const PORT = process.env.PORT || 3000;

// Parses incoming json data to an object
app.use(express.json());

app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save().then(() => {
        res.send(user);
    }).catch(error => {
        res.status(400).send(error);
    });
});

app.get('/users', (req, res) => {
    User.find({

    }).then(users => {
        res.send(users);
    }).catch(error => {
        res.status(500).send(error);
    });
});

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    User.findById(_id).then(user => {
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    }).catch(error => {
        res.status(500).send(error);
    });

    console.log(req.params);
});

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);
    task.save().then(() => {
        res.status(201).send(task);
    }).catch(error => {
        res.status(400).send(error);
    });
});

// Fetches all the tasks from the database
app.get('/tasks', (req, res) => {
    Task.find({}).then(tasks => {
        res.send(tasks);
    }).catch(error => {
        res.status(500).send(error);
    });
});

// Fetches a particular task given its unique id
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;
    Task.findById(_id).then(task => {
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    }).catch(error => {
        res.status(500).send(error);
    });
});


app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}.`);
});