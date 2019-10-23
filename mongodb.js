// CRUD create read update delete

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// const id = new ObjectID();
// console.log(id.id.length);
// console.log(id.toHexString().length);


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database.');
    }

    const db = client.db(databaseName);

    /*
    db.collection('users').deleteMany({
        age: 27
    }).then(result => {
        console.log("Result: ", result);
    }).catch(error => {
        console.log("Error: ", error);
    });

    */

    db.collection('tasks').deleteOne({
        description: 'Do laundry.'
    }).then(result => {
        console.log("Deleted items: ", result.deletedCount);
    }).catch(error => {
        console.log("An error occurred!", error);
    });
});

/* UPDATE


    db.collection('tasks').updateMany({
        // Search criteria
        completed: false
    }, {
        // Update on elements
        $set: {
            completed: true
        }
    }).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    });


    db.collection('users').updateOne({
        _id: new ObjectID('5da9cc0e85b6086f322a4690')
    }, {
        // $set: {
        //    name: 'Mike'
        // }

        $inc: {
            age: 1
        }
    }).then((result) => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    });
    */

/* FIND
* db.collection('users').findOne({
        _id: new ObjectID("5da9cc0e85b6086f322a4690")
    }, (error, user) => {
        if(error) return console.log('Unable to fetch data.');

        console.log(user);
    });

    // find() returns a cursor
    db.collection('users').find({ age: 27 }).toArray((error, users) => {
        console.log(users);
    });

    db.collection('users').find({ age: 27 }).count((error, users) => {
        console.log(users);
    });


    // Find the last created task given its ID and print the content
    db.collection('tasks').findOne({
        _id: new ObjectID("5da9d67f336449759c17c86a")
    }, (error, task) => {
        if(error) return console.log('Unable to fetch data.');
        console.log(task);
    });

    // Find all tasks that have not been completed yet
    db.collection('tasks').find({
        completed: false
    }).toArray((error, tasks) => {
        if (error) return console.log('Unable to fetch data from server.');
        console.log(tasks);
    });

*/




/*  CREATE
    db.collection('users').insertOne({
        _id: id,
        name: 'Vikram',
        age: 27
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert user');
        }

        console.log(result.ops);
    });
    */


/*
db.collection('users').insertMany([
    {
        name: 'Jen',
        age: 28
    },
    {
        name: 'Gunther',
        age: 27
    }
], (error, result) => {
    if (error) return console.log('Unable to insert user.');

    console.log(result.ops);
});
*/

/*
db.collection('tasks').insertMany([
    {
        description: 'Do laundry.',
        completed: true
    },
    {
        description: 'Do homework.',
        completed: true
    },
    {
        description: 'Make dinner.',
        completed: false

    }
], (error, result) => {
    if (error) return console.log('Unable to insert task.');

    console.log(result.ops);
});
*/