const mongoose = require("mongoose")
const Product = require("./models/product")
const stripe = require('stripe')('sk_test_51LABmdDB5BiH74m8mA32Q57XaE11IsMtvQKb8lgnKnxWIrF3zuwUQDGDXraIFtwsHRrCSTj4SlPcE66PXcNquECk003rInfgRb')
const DATABASE_URL = 'mongodb+srv://agrassioulet:Voiture88@cluster0.xthqruv.mongodb.net/ecommerce'
mongoose.connect(DATABASE_URL)

run()


async function run() {

	var products_stripe = await stripe.products.list({})
	products_stripe.data.forEach(async product_stripe => {
		var deleted = await stripe.products.del(product_stripe.id)
		console.log(product_stripe)
		console.log(deleted)
	})


}