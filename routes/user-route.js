const express = require('express');
const router = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const auth = require('../auth/auth');
const User = require('../models/user');

//Post Method Register
router.post('/register', async (req, res) => {
    console.log('in register')
    console.log(req.body)
    let password = req.body.password
    const hashed_password = md5(password)

    const user = new User({
        username: req.body.username,
        password: hashed_password,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
    })

    try {
        console.log("before save")
        const dataToSave = await user.save();
        let token = jwt.sign({ data: dataToSave }, 'secret')
        res.status(200).json({ status: 1, data: dataToSave, token: token })
    }
    catch (error) {
        res.status(400).json({ status: 0, message: error.message })
    }

})

// Post login
router.post('/login', async (req, res) => {
    console.log('in login')
    console.log(req.body)
    let password = req.body.password
    let username = req.body.username
    const hashed_password = md5(password)

    try {
        const user = await User.findOne({ username: username, password: hashed_password });
        console.log('Find user :', user)
        if(user == null) { 
            res.json({ status: 2, message: 'User not found'}) 
        }
        else {
            let token = jwt.sign({ data: user }, 'secret')
            res.json({ status: 1, data: user, token: token })
        }
    }
    catch (error) {
        res.json({ status: 0, message: error.message })
    }
})


// Get user informations
router.get('/get-user-infos', auth.verifyToken, async (req, res) => {
    console.log('for get-user-infos')
    console.log(req.body)
    console.log("req.user", req.user)

    try {
        var id_user_from_token = req.user._id
        console.log("id_user_from_token", id_user_from_token)
        const result = await User.findById(id_user_from_token);
        res.status(200).json({ status: 1, data: result })
    }
    catch (error) {
        res.status(400).json({ status: 0, message: error.message })
    }
})


// Save user infos
router.post('/save-user-infos', auth.verifyToken, async (req, res) => {
    console.log('for save-user-infos')
    console.log(req.body)

    try {
        console.log("before save")
        await User.updateOne({ _id: req.user._id }, req.body);
        const dataToSave = await User.findById(req.user._id);
        let token = jwt.sign({ data: dataToSave }, 'secret')
        res.status(200).json({ status: 1, data: dataToSave, token: token })
    }
    catch (error) {
        res.status(400).json({ status: 0, message: error.message, token: '' })
    }
})

module.exports = router;