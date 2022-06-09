const express = require('express');
const router = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const User = require('../models/user');



//Post Method Register
router.post('/register', async (req, res) => {
    console.log('for register')
    console.log(req.body)
    let password = req.body.password
    const hashed_password = md5('password')
		
    const data = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed_password
    })

    try {
        const dataToSave = await data.save();
		let token = jwt.sign({ data: dataToSave }, 'secret')
        res.status(200).json({ status: 1, data: dataToSave, token : token })
    }
    catch (error) {
        res.status(400).json({status: 0, message: error.message})
    }

})

// Post Login
router.post('/login', async (req, res) => {
    console.log('for login')
    console.log(req.body)
    let password = req.body.password
    let username = req.body.username

    const hashed_password = md5('password')

    try{
        const result = await User.find({username: username, password: hashed_password});
        let token = jwt.sign({ data: result }, 'secret')
    res.status(200).json({ status: 1, data: result[0] ?? {}, token : token })    
    }
    catch(error){
        res.status(400).json({status: 0, message: error.message})
    }

})

//Get by ID Method
router.get('/getOne', async (req, res) => {
    try{
        res.json("azertty")
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})




module.exports = router;