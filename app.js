require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/user');
const profileRouter = require('./routes/profile');
const productRouter = require('./routes/product');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

// Database configuration
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

// Instanciation App
const app = express();


// Add middlewares
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors())
app.use('/user', userRouter);
app.use('/profile', profileRouter);
app.use('/product', productRouter);

app.listen(4000, () => {
    console.log('listening on port 4000');
})

