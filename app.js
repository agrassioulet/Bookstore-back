require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/user-route');
const profileRouter = require('./routes/profile-route');
const productRouter = require('./routes/product-route');
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
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors())


app.get('/test',(req, res) => {
        res.status(200).json({ message: 'Test success' })
})


app.use('/user', userRouter);
app.use('/profile', profileRouter);
app.use('/product', productRouter);


// port = process.env.PORT || 80
port = 4000

app.listen(port, () => {
    console.log('listening on port ' + port);
})

