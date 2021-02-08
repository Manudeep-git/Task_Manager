//This file is about understanding CRUD operations - Done

const { MongoClient, ObjectID } = require('mongodb');

//Connection url
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';
const databaseName = 'Check';

const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())

// //Connecting to server
async function mongodbConnector() {

    const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).catch(err => console.log(err))

    if (!client) {
        return
    }

    //Connection successful
    console.log("Connection created successfully")
    const db = client.db(dbName);
    /***************************************************************************** */
    // try {
    //     const op = await db.collection('users').deleteMany({
    //         name: "Hruday"
    //     })
    //     console.log(op.deletedCount)
    // }
    // finally {
    //     client.close();
    // }
    /***************************************************************************** */

    // //Update Many
    // try {
    //     const res = await db.collection('Tasks').updateMany({
    //         completed: false
    //     }, {
    //         $set: {
    //             completed: true
    //         }
    //     })
    //     console.log(res.modifiedCount)
    // }
    // catch (e) {
    //     console.log(e)
    // }
    // finally {
    //     client.close();
    // }

    /*************************************************************************************** */

    //Update User
    // try {
    //     const res = await db.collection('users').updateOne({
    //         _id: new ObjectID("5ff2f0e355d7ba70c43d10f3")
    //     }, {
    //         $inc: {
    //             age: -3
    //         }
    //     })
    //     console.log(res.matchedCount)
    // }
    // catch (err) {
    //     console.log("Unable to Update user")
    // }
    // finally {
    //     client.close();
    // }

    /****************************************************************************** */

    //Find User - Read
    // try {
    //     const res = await db.collection('users').findOne({ name: "Hulk" });

    //     console.log(res)
    // }
    // catch (err) {
    //     console.log("Unable to find user")
    // }

    // *********************************************************************/
    //Finding many user
    // const res = await db.collection('users').find({ age: 23 }).toArray();

    // console.log(res);

    /************************************************************************** */


    //client.close();

    //********************************************************************************************** */

    //Bulk-insert
    // const res = await db.collection('users').insertMany([{

    //     name: "Hruday",
    //     age: 23
    // }, {
    //     name: "Deepu",
    //     age: 32
    // }]).catch(err => console.log("Unable to insert users", err))

    //************************************************************************************ */
    //Challenge - Tasks collection
    // try {
    //     const res = await db.collection('Tasks').insertMany([{
    //         Description: "Get some Milk",
    //         completed: true
    //     }, {
    //         Description: "Fuel the car",
    //         completed: false
    //     }, {
    //         Description: "Finish MongoDB",
    //         completed: false
    //     }
    //     ])
    //     console.log(res.ops);
    // }
    // catch (e) {
    //     console.log("Unable to insert records", e);
    // }
    // finally {
    //     client.close();
    // }

    //*************************************************************************************** */

    //single-insert
    try {
        let res = await db.collection('users').insertOne({
            _id: id,
            name: "Mandy",
            age: 24
        })

        console.log(res.ops)
    }
    catch (e) {
        console.log(e);
        console.log("Unable to insert user")
    }
    finally {
        client.close();
    }

}

mongodbConnector();