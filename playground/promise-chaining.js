// Change the age for the user amd fetch all users with that age

require('../src/db/mongoose');
const User = require ('../src/models/User');

// ﻿5db075c08998229b09d87f79

/*
User.findByIdAndUpdate('5db075da642a6c9b1bd9f832', { age: 1 }).then(user => {
    console.log(user);
    return User.countDocuments({ age: 1 });
}).then(countNumber => {
    console.log(countNumber)
}).catch(error => {
    console.log(error);
});
*/

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });
    return count;
};

updateAgeAndCount('5db075c08998229b09d87f79', 2).then(count => {
    console.log(count);
}).catch(error => {
    console.log(error);
});
