const express = require('express');
const router = new express.Router()
const auth = require("../middleware/auth")

require("../db/mongoose")

// User Model
const User = require("../models/user")


// ------------------------ Post data --------------------------//
router.post('/', async (req, res) => {
    const user = new User(req.body);

    try {
        const userObj = await user.save()
        const token = userObj.generateAuthToken();
        res.status(201).send({userObj,token})
    }
    catch (e) {
        res.status(400).send(e.message)
    }

    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((e) => {
    //     res.status(400).send(e.message)
    // })
})

//Login User
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken();
        res.send({user,token})
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

//Logout User
router.post('/logout', auth, async(req,res)=> {
    try {
        console.log(req.token)
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token!== req.token
        })
        console.log(req.user.tokens.includes(req.token))

        await req.user.save();

        res.send();
    }
    catch(e){
        res.status(500).send(e.message);
    }
})

//-------------------------------------get data-----------------------------------------------
// 1. User - multiple users
router.get('/me', auth ,async (req, res) => {
    try{
        res.send(req.user);
    }
    catch(e){
        res.send(e.message)
    }
})

// 1.2 - User - user by id
router.get('/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const userObj = await User.findById(_id);
        if (!userObj) {
            return res.status(404).send("User not Found")
        }
        res.send(userObj)
    }
    catch (e) {
        res.status(500).send(e.message)
    }
})

// Update user 

router.patch('/:id', async (req, res) => {
    const _id = req.params.id

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    // console.log(Object.keys(User))
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
    // const excluded = updates.filter(update => !(allowedUpdates.includes(update)))

    if (!isValidUpdate) {
        return res.status(400).send("Error: Invalid updates")
    }


    try {
        const userObj = await User.findById(_id)

        if (!userObj) {
            return res.status(404).send("User not Found")
        }

        updates.forEach(update => {
            userObj[update] = req.body[update]
        })

        await userObj.save();
        /*const userObj = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        // this bypasses mongoose middleware functions */

        res.send(userObj) // sends updated userObj
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

// delete user
router.delete('/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)

        if (!user) {
            return res.status(404).send("User not Found");
        }

        res.send(user)
    }
    catch (e) {
        res.status(500).send(e.message);
    }
})

module.exports = router


