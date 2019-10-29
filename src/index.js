const express = require('express');

// Runs the database script (get MongoDB up and running)
require('./db/mongoose.js');
const User = require('./models/user');

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

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}.`);
});