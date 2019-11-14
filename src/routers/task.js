const express = require('express');
const Task = require('../models/task');

const router = express.Router();

// Adds a new task
router.post('/tasks', async (req, res) => {
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
router.get('/tasks', async (req, res) => {
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
router.get('/tasks/:id', async (req, res) => {
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
router.patch('/tasks/:id', async (req, res) => {
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
router.delete('/tasks/:id', async (req, res) => {
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


module.exports = router;