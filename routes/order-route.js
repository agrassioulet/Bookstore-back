const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');
const Product = require('../models/product');
const Order = require('../models/order');
const DeliveryContact = require('../models/delivery_contact');
const ProductCart = require('../models/product_cart');
const Category = require("../models/category")
const Contributor = require("../models/contributor")
const User = require('../models/user');
const ProductOperations = require('../operations/product-route-operations')


//Get delivery contact for order
router.get('/get-delivery-contact-in-order',auth.verifyToken, async (req, res) => {
    console.log('in get-delivery-contact-in-order')
    try {
        console.log(req.body)
        console.log('req user : ' , req.user)
        var activeOrder = await Order.findOneAndUpdate({ user: req.user._id, active: true },
            { active: true, user: req.user._id }, { upsert: true }).populate('delivery_contact')
        console.log('activeOrder', activeOrder)
        res.json({ status: 1, data: activeOrder.delivery_contact, message: 'Infos de livraison renvoyées' })
    }
    catch (error) {
        res.status(500).json({ status: 0, data: {}, message: error.message })
    }
})

// Save delivery contact for order
router.post('/save-delivery-contact',auth.verifyToken, async (req, res) => {
    console.log('in save-delivery-contact')
    try {
        console.log(req.body)
        var activeOrder = await Order.findOne({ user: req.user._id, active: true }).populate('delivery_contact')

        console.log('activeOrder', activeOrder)
        console.log('delivery_contact', activeOrder.delivery_contact)
        console.log('req.body', req.body)


        var dataToSave; 
        if(activeOrder.delivery_contact == undefined) {
            console.log('delivery contact to create')

            var deliveryContact = new DeliveryContact(req.body)
            dataToSave = await deliveryContact.save()
            activeOrder.delivery_contact = deliveryContact
            await activeOrder.save()
        }
        else {
            console.log('delivery contact to update')
            var deliveryContact = activeOrder.delivery_contact
            deliveryContact.adress = req.body.adress
            deliveryContact.city = req.body.city
            deliveryContact.company = req.body.company
            deliveryContact.country = req.body.country
            deliveryContact.firstname = req.body.firstname
            deliveryContact.lastname = req.body.lastname
            deliveryContact.phoneNumber = req.body.phoneNumber
            deliveryContact.postalCode = req.body.postalCode

            dataToSave = await deliveryContact.save();

        }



        // var deliveryContact = await DeliveryContact.findOneAndUpdate({ order: active_order._id, product: req.body.product._id },
        //     { product: req.body.product._id, order: active_order._id }, { upsert: true, new: true })


        

        res.json({ status: 1, data: dataToSave, message: 'Infos de livraison enregistrées' })
    }
    catch (error) {
        res.status(500).json({ status: 1,  data: {}, message: error.message })
    }
})


module.exports = router;