require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete('5db07a15e320029db720faba').then(result => {
    console.log(result);
    return Task.countDocuments({ completed: false });
}).then(docCounter => {
    console.log(docCounter);
}).catch(error => {
    console.log(error);
});