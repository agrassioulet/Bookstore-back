const mongoose = require("mongoose")
const Product = require("./models/product")
const stripe = require('stripe')('sk_test_51LABmdDB5BiH74m8mA32Q57XaE11IsMtvQKb8lgnKnxWIrF3zuwUQDGDXraIFtwsHRrCSTj4SlPcE66PXcNquECk003rInfgRb')
const DATABASE_URL = 'mongodb+srv://agrassioulet:Voiture88@cluster0.xthqruv.mongodb.net/ecommerce'
mongoose.connect(DATABASE_URL)

run()


async function run() {

	product = await Product.findOne()

	stripe_product = await stripe.products.create({
		name: product.title,
		default_price_data: {

			unit_amount: product.price * 100,
			currency: 'eur'
		}
	})

	console.log(stripe_product)






}