const express = require('express');
require("../db/mongoose")
const router = new express.Router()


//Import Task model
const Task = require("../models/task");


//--Post Task-----//
router.post('/', async (req, res) => {
    const task = new Task(req.body);

    try {
        const taskObj = await task.save();
        res.status(201).send(taskObj)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})


//-------------------------------------get data-----------------------------------------------

// ------- get all tasks
router.get('/', async (req, res) => {

    try {
        const tasks = await Task.find({})
        if (!tasks) {
            return res.status(404).send(e.message)
        }
        res.send(tasks)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
})

// --------- get task by id
router.get('/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const taskObj = await Task.findById(_id);
        if (!taskObj) {
            return res.status(404).send("User not found")
        }
        res.send(taskObj)
    }
    catch (err) {
        res.status(500).send()
        console.log(err)
    }
})

//-- Update Task
router.patch('/:id', async (req, res) => {
    const _id = req.params.id

    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed'];
    // console.log(Object.keys(Task))
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
    const excluded = updates.filter(update => !(allowedUpdates.includes(update)))

    // console.log(excluded)

    if (!isValidUpdate || !req.body) {
        return res.status(400).send("Error: Invalid updates")
    }

    try {
        const taskObj = await Task.findById(_id)

        updates.forEach(update => {
            taskObj[update] = req.body[update]
        })

        await taskObj.save();

        if (!taskObj) {
            return res.status(404).send("Task not Found")
        }

        res.send(taskObj) // sends updated taskObj
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})


//delete task
router.delete('/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findByIdAndDelete(_id)

        if (!task) {
            return res.status(404).send("Task not Found");
        }

        res.send(task)
    }
    catch (e) {
        res.status(500).send(e.message);
    }
})

module.exports = router
