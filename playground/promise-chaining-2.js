require('../src/db/mongoose');
const Task = require('../src/models/task');

/*
Task.findByIdAndDelete('5db07a15e320029db720faba').then(result => {
    console.log(result);
    return Task.countDocuments({ completed: false });
}).then(docCounter => {
    console.log(docCounter);
}).catch(error => {
    console.log(error);
});
*/

const deleteAndCount = async (id) => {
    await Task.findByIdAndDelete(id);
    const countIncomplete = await Task.countDocuments({ completed: false });
    return countIncomplete;
};

deleteAndCount('5db1d9d04c9af9e547e75055').then(count => {
   console.log(count);
}).catch(error => {
    console.log(error);
});