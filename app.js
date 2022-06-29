require('dotenv').config()
const express = require('express');
const userRouter = require('./routes/user-route');
const productRouter = require('./routes/product-route');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Database configuration
mongoose.connect(process.env.DATABASE_URL);
const database = mongoose.connection;

database.on('Error', (error) => {
    console.log(error)
})

database.once('Connected', () => {
    console.log('Database Connected');
})

// Instanciation App
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())


app.use('/user', userRouter);
app.use('/product', productRouter);

port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Listening on port ' + port)
})

//Get all Method
app.get('/', async (req, res) => {
        res.json("HELLO WORD")

})