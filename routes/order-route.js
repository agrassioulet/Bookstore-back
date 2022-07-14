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
const sendEmail = require('../mailing/mailing').sendEMail


//Get delivery contact for order
router.get('/get-active-order', auth.verifyToken, async (req, res) => {
    console.log('in get-active-order')
    try {
        console.log(req.body)
        console.log('req user : ' , req.user)
        var activeOrder = await Order.findOneAndUpdate({ user: req.user._id, active: true, status: "WAITING_FOR_VALIDATION" },
            { active: true, user: req.user._id }, { upsert: true }).populate('delivery_contact').populate({
                path: 'product_cart',
                populate: {path: 'product', populate: {path: 'category'}}
            })        
        console.log('activeOrder', activeOrder)
        res.json({ status: 1, data: activeOrder, message: 'Commande en cours' })
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

        var dataToSave, dataToSave2; 
        if(activeOrder.delivery_contact == undefined) {
            console.log('delivery contact to create')
            var deliveryContact = new DeliveryContact(req.body)
            await deliveryContact.save()
            activeOrder.delivery_contact = deliveryContact
            await activeOrder.save()
        }
        else {
            console.log('delivery contact to update')
            var deliveryContact = activeOrder.delivery_contact
            var form = req.body
            delete form.saveDeliveryData;
            await DeliveryContact.updateOne({_id:deliveryContact}, form )
        }

        var user = await User.findOne({ user: req.user._id}).populate('delivery_contact')
        if(req.body.saveDeliveryData == true) {
            console.log('delivery user to change')
            if(user.delivery_contact == undefined) {
                console.log('object to create')
                var form = req.body
                delete form.saveDeliveryData;
                var deliveryContactUser = new DeliveryContact(form)
                var newDelivery = await deliveryContactUser.save()
                user.delivery_contact = newDelivery
                await user.save()
            }
            else {
                console.log('object to update')
                var deliveryContactUser = user.delivery_contact
                var form = req.body
                delete form.saveDeliveryData;
                await DeliveryContact.updateOne({_id:deliveryContactUser}, form )
            }
        }

        res.json({ status: 1, data: {}, message: 'Infos de livraison enregistrées' })
    }
    catch (error) {
        res.status(500).json({ status: 1,  data: {}, message: error.message })
    }
})

//Validate Payment
router.get('/validate-payment', auth.verifyToken, async (req, res) => {
    console.log('in validate-payment')
    try {
        console.log('req body :', req.body)
        console.log('req user : ' , req.user)
        var activeOrder = await Order.findOne({ user: req.user._id, active: true, status: "WAITING_FOR_VALIDATION" })
        .populate('delivery_contact') 
        activeOrder.active = false
        activeOrder.validation_date = Date.now()
        activeOrder.status = 'WAITING_FOR_TREATMENT'
        var refClient = ProductOperations.makeid(20)
        activeOrder.client_ref = refClient
        await activeOrder.save()

        console.log('active order : ', activeOrder)
        console.log('sending email to :', activeOrder.delivery_contact.email)
        sendEmail(activeOrder.delivery_contact.email,
        'Support Bookstore - confirmation de votre commande',
        refClient)



        res.json({ status: 1, data: activeOrder, message: 'Commande validée' })
    }
    catch (error) {
        res.status(500).json({ status: 0, data: {}, message: error.message })
    }
})


//Get order history
router.get('/get-order-history', auth.verifyToken, async (req, res) => {
    console.log('in get-order-history')
    try {
        var orders = await Order.find({ user: req.user._id, active: false })
            .populate('delivery_contact').populate({
                path: 'product_cart',
                populate: {path: 'product', populate: {path: 'category'}}
            })        
        res.json({ status: 1, data: orders, message: 'Historique des commandes' })
    }
    catch (error) {
        res.status(500).json({ status: 0, data: {}, message: error.message })
    }
})


module.exports = router;