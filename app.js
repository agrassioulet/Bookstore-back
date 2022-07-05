require('dotenv').config()
const express = require('express');
const orderRouter = require('./routes/order-route');
const userRouter = require('./routes/user-route');
const productRouter = require('./routes/product-route');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



// DATABASE CONFIG
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

// app.post("/create-checkout-session", async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: storeItems.map(item => {
//         return {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: item.name,
//             },
//             unit_amount: item.priceInCents,
//           },
//           quantity: 2,
//         }
//       }),
//       success_url: 'http://localhost/payment/success',
//       cancel_url: 'http://localhost/payment/failure'
//     })
//     res.json({ url: session.url })
//   } catch (e) {
//     res.status(500).json({ error: e.message })
//   }
// })



// RUNNING APP
port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Listening on port ' + port)
})
