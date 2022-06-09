const express = require('express');
const Model = require('../models/article');
const router = express.Router()

//Post Method
router.post('/post', async (req, res) => {
    console.log('for create')
    console.log(req.body)
    const data = new Model({
        price: req.body.price,
        description: req.body.description,
        imageURL: req.body.imageURL,
        title: req.body.title

    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }

})

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.post('/update/:id', async (req, res) => {
    console.log('for update')
    console.log(req.body)
    try {
        const id = req.params.id;
        const updatedData = req.body;
        updatedData["_id"] = id;
        console.log(updatedData)
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


module.exports = router;