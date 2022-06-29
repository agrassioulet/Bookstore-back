const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');
const Product = require('../models/product');
const Category = require("../models/category")
const Contributor = require("../models/contributor")
const User = require('../models/user');
const ProductOperations = require('../operations/product-route-operations')


//Get all Method
router.get('/get-all-products', async (req, res) => {
    console.log('in get-all-product get')
    try {
        var products = await Product.find({}).populate("contributor").populate("category")
        console.log(products)
        res.json({ status: 1, data: products })
    }
    catch (error) {
        res.status(500).json({ status: 1, data: error })
    }
})

router.get('/get-all-categories', async (req, res) => {
    console.log('in get-all-categories get')
    try {
        var categories = await Category.find({})
        console.log(categories)
        res.json({ status: 1, data: categories })
    }
    catch (error) {
        res.status(500).json({ status: 1, data: error })
    }
})










//////////////////////////////

//Get products by category
router.get('/get-products-by-category/:category', async (req, res) => {
    try {
        const data = await Product.find({ category: req.params.category });
        res.json({ status: 1, data: data })
    }
    catch (error) {
        res.status(500).json({ status: 1, data: error })
    }
})

//Get product by ID
router.get('/get-product-by-id/:id', async (req, res) => {
    try {
        const data = await Product.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// //Post Add Product to Cart
// router.post('/add-product-to-cart', auth.verifyToken, async (req, res) => {
//     try {
//         console.log('in add-product-to-cart')
//         console.log(req.body)
//         active_cart = await Cart.findOneAndUpdate({ id_user: req.user._id, active: true },
//             { active: true, id_user: req.user._id }, { upsert: true })
//         console.log("active cart", active_cart)
//         productCart = await ProductForCart.findOneAndUpdate({ id_cart: active_cart._id, id_product: req.body.id_product },
//             { id_product: req.body.id_product, id_cart: active_cart._id }, { upsert: true, new: true })
//         console.log("productCart", productCart)
//         productCart.quantity = productCart.quantity + req.body.quantity ?? 0
//         active_cart.id_product_for_carts.push(productCart)
//         await active_cart.save()
//         await productCart.save()

//         res.status(200).json({ status: 1, data: productCart })

//     }
//     catch (error) {
//         res.status(500).json({ status: 0, data: error.message })
//     }

// })


// //Get Products for Cart
// router.post('/get-products-for-cart', auth.verifyToken, async (req, res) => {
//     console.log('for get-products-for-cart')
//     console.log(req.body)
//     try {
//         const data = ProductForCart.find({ id_user: userID });
//         res.status(200).json({ status: 1, data: dataToSave })
//     }
//     catch (error) {
//         res.status(400).json({ status: 0, data: "User not found" })
//     }
// })


// // Method to create a new element in cart
// router.post("/create-product-for-cart", function (req, res) {
//     ProductForCart.create(req.body)
//         .then(function (data) {
//             res.json(data);
//         })
//         .catch(function (err) {
//             res.json(err);
//         });
// });


// // Get cart for a user in param
router.get("/get-one-product", function (req, res) {
    Product.findOne({ }).populate("id_contributor")
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });
});


// // Get cart for a user in token
// router.get("/get-cart", auth.verifyToken, async function (req, res) {
//     console.log("for get-cart")

//     try {
//         var activeCart = await Cart.findOneAndUpdate({ id_user: req.user._id, active: true },
//             { active: true, id_user: req.user._id }, { upsert: true, new: true })
//         console.log("activeCart", activeCart)
//         var result = await ProductForCart.find({ id_cart: activeCart._id }).populate("id_product")
//         console.log("result", result)
//         res.status(200).json({ status: 1, data: result })
//     }
//     catch (error) {
//         res.status(400).json({ status: 0, message: error.message })
//     }
// });


// // Get All Carts
// router.get("/get-all-sent-carts", auth.verifyToken, async function (req, res) {
//     console.log("in get-all-sent-cart")

//     try {
//         //forget constraint , active: false

//         var carts = await Cart.find({ id_user: req.user._id, active: false }).populate({
//             path: 'id_product_for_carts',
//             populate: {
//                 path: 'id_product'
//             }
//         })
//         console.log("carts", carts)
//         res.status(200).json({ status: 1, data: carts })
//     }
//     catch (error) {
//         res.status(400).json({ status: 0, data: error.message })
//     }
// });


// //Update product cart by POST
// router.post('/update-product-cart', auth.verifyToken, async (req, res) => {
//     console.log("update-product-cart")
//     var productCart = req.body

//     try {
//         if (productCart.quantity <= 0) {
//             data = await ProductForCart.findByIdAndDelete(productCart._id)
//         }
//         else {
//             data = await ProductForCart.findByIdAndUpdate(productCart._id, productCart, { new: true })
//         }
//         res.json({ status: 1, data: data })

//     } catch (error) {
//         res.json({ status: 0, data: error })
//     }
// })




// // Get Order active cart
// router.get("/order-cart", auth.verifyToken, async function (req, res) {
//     console.log("for order-cart")
//     try {
//         var activeCart = await Cart.findOne({ id_user: req.user._id, active: true })

//         activeCart.status = 'IN_PREPARATION'
//         activeCart.active = false
//         activeCart.order_date = Date.now()
//         activeCart.client_ref = ProductOperations.makeid(10)
//         await activeCart.save()
//         console.log(activeCart)

//         res.status(200).json({ status: 1, data: activeCart })
//     }
//     catch (error) {
//         res.status(400).json({ status: 0, data: error.message })
//     }
// });



module.exports = router;