require('dotenv').config()
// const formidableMiddleware = require('express-formidable');
const formData = require('express-form-data');
const multer = require("multer");
const path = require('path')
const fileUpload = require('express-fileupload');
const express = require('express');
const orderRouter = require('./routes/order-route');
const userRouter = require('./routes/user-route');
const productRouter = require('./routes/product-route');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// INSTANCIATION APP
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(formidableMiddleware());
// app.use(formData.parse());
app.use(cors())
app.use('/images', express.static('uploads'));
// app.use(express.static(path.join(__dirname + "/uploads")))

// CONFIG MULTER
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });
// var upload = multer({ storage: storage });



// app.post("/file", upload.single("file"), function (req, res, next) {
//   const file = req.file;
//   console.log('file', file)
//   if (file) {
//     res.json({test:'ok'});
//   } else throw "error";
// });



// DATABASE CONFIG
mongoose.connect(process.env.DATABASE_URL);
const database = mongoose.connection;

database.on('Error', (error) => {
    console.log(error)
})

database.once('Connected', () => {
    console.log('Database Connected');
})


// app.post("/upload", (req, res) => {
//     const filename = Date.now() + "_" + req.files.screenshot.name;
//     const file = req.files.screenshot;
//     let uploadPath = __dirname + "/uploads/" + filename;
//     file.mv(uploadPath, (err) => {
//       if (err) {
//         return res.send(err.message);
//       }
//     });
//     res.json({test:'200'});
//   });

// ROUTES
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);

// STRIPE SECTION
console.log('STRIPE_PRIVATE_KEY', process.env.STRIPE_PRIVATE_KEY)
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const storeItems = [
    { priceInCents: 10000, name: "Learn React Today" },
    { priceInCents: 20000, name: "Learn CSS Today" }
]


// RUNNING APP
port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Listening on port ' + port)
})
