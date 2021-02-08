require("./db/mongoose");

const User = require("./models/user");
const Task = require("./models/task")

// User.findByIdAndUpdate('5fffe89534985b58b4c70b22', { age: 22 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 22 }) // return promise inside a promise
// }).then((result) => { // second promise
//     console.log(result)
// }).catch((e) => { // error handling for all promises
//     console.log(e)
// })


//promise chaining challenge
// Task.findByIdAndDelete('5ffff6b042e3280b80877541').then((user) => {
//     console.log(user)
//     return Task.find({ completed: false })
// }).then((tasks) => {
//     console.log(tasks)
// }).catch((e) => {
//     console.log(e)
// })

// findbyid and update using async- await 

const updateAgeanCount = async (id, age) => {
    try {
        const user = await User.findByIdAndUpdate(id, { age })
        const count = await User.countDocuments({ age })
        console.log(count)
        return count
    }
    catch (e) {
        console.log("Error", e.message)
    }
}

updateAgeanCount('5fffe89534985b58b4c70b2', 26)


