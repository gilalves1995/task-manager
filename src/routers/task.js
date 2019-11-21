const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');

const router = express.Router();

// Adds a new task
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

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

// Filtering: GET /tasks?completed=true
// Pagination: limit and skip
// GET /tasks?limit
router.get('/tasks', auth, async (req, res) => {
    const match = {};

    if (req.query.completed)
        match.completed = req.query.completed === 'true';


    try {
        // const tasks = await Task.find({ owner: req.user._id });
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            }
        }).execPopulate();
        const tasks = req.user.tasks;

        res.status(200).send(tasks);
    } catch(error) {
        res.status(500).send(error);
    }
});

// Fetches a task by id
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        // const task = await Task.findById(_id);

        // Search for a task with the provided id and that has the authenticated user as owner
        const task = await Task.findOne({ _id, owner: req.user._id });

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
router.patch('/tasks/:id', auth, async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['completed'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update! '});
    }

    try {
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        // const task = await Task.findById(req.params.id);

        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

        if (!task) {
            return res.status(404).send({ error: 'Task not found.' });
        }

        updates.forEach(update => task[update] = req.body[update]);
        await task.save();

        res.status(200).send(task);
    } catch(error) {
        res.status(400).send(error);
    }
});

// Deletes a task
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id);
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

        if (!task) {
            return res.status(404).send({ error: 'Task not found.' });
        }
        res.status(200).send(task);
    } catch(error) {
        res.status(500).send(error);
    }
});


module.exports = router;