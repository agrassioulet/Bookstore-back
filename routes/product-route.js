const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const auth = require('../auth/auth');
const ProductOperations = require('../operations/product-route-operations')
const User = require('../models/user');
const ProductForCart = require('../models/product_for_cart');
const Cart = require('../models/cart');

//Get all Method
router.get('/getAllProducts', async (req, res) => {
    try {
        const data = await Product.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get products by category
router.get('/getProductsByCategory/:category', async (req, res) => {
    try {
        const data = await Product.find({ category: req.params.category });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get product by ID
router.get('/getProductById/:id', async (req, res) => {
    try {
        const data = await Product.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


//TEST - update product by ID
router.get('/update', async (req, res) => {
    try {
        const data = await Product.updateMany({}, { title: "Veste compactable et imperméable" });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


//Post Add Product to Cart
router.post('/add-product-to-cart', auth.verifyToken, async (req, res) => {
    console.log('in add-product-to-cart')
    console.log(req.body)
    console.log("req.user", req.user)
    try {
        await User.exists({_id: req.user._id})
        active_cart = await Cart.findOneAndUpdate({id_user:req.user._id, active: true},
            {active: true, id_user:req.user._id} , {upsert: true})
        console.log("active cart", active_cart)
        productCart = await ProductForCart.findOneAndUpdate({id_cart: active_cart._id, id_product: req.body.id_product},
            {id_product: req.body.id_product, id_cart: active_cart._id} , {upsert: true, new: true})
        console.log("productCart", productCart)
        productCart.quantity = productCart.quantity + req.body.quantity ?? 0
        await productCart.save()

        // productCart = await ProductForCart.create({id_product: req.body.id_product, id_cart: active_cart._id, 
        // quantity: req.body.quantity})
        res.status(200).json({ status: 1, data: productCart })
    }
    catch (error) {
        res.status(400).json({ status: 0, message: error.message})
    }
})


//Get Products for Cart
router.post('/getProductsForCart', auth.verifyToken, async (req, res) => {
    console.log('for getProductsForCart')
    console.log(req.body)
    console.log("req.user", req.user)
    // Vérifier que l'utilisateur existe
    var userID = req.user[0]._id
    console.log("userID", userID)

    User.countDocuments({ _id: userID }, function (err, count) {
        if (count == 1) {
            console.log("User founded")
            try {
                const data = ProductForCart.find({ id_user: userID });
                res.status(200).json({ status: 1, data: dataToSave })
            }
            catch (error) {
                res.status(400).json({ status: 0, data: error.message })
            }


        }
        else {
            res.status(400).json({ status: 0, data: "User not found" })
        }
    })
})

// Method to create a new element in cart
router.post("/createProductForCart", function (req, res) {
    ProductForCart.create(req.body)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// Get cart for a user in param
router.get("/cart/:id", function (req, res) {
    ProductForCart.find({ id_user: req.params.id })
        .populate("id_user")
        .populate("id_product")
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });
});


// Get cart for a user in token
router.get("/get-cart", auth.verifyToken, async function (req, res) {
    console.log("for get-cart")

    try {
        var activeCart = await Cart.findOneAndUpdate({id_user: req.user._id, active: true},
            {active: true, id_user:req.user._id} , {upsert: true, new: true})
        console.log("activeCart", activeCart)
        var result =  await ProductForCart.find({ id_cart: activeCart._id }).populate("id_product")
        console.log("result", result)
        res.status(200).json({ status: 1, data: result })
    }
    catch (error) {
        res.status(400).json({ status: 0, message: error.message })
    }
});


// Get All Carts
router.get("/get-all-cart", auth.verifyToken, async function (req, res) {
    console.log("for get-all-cart")

    try {
        var carts = await Cart.find({id_user: req.user._id, active: false})
        console.log("activeCart", carts)
        var result =  await ProductForCart.find({ id_cart: activeCart._id }).populate("id_product")
        console.log("result", result)
        res.status(200).json({ status: 1, data: result })
    }
    catch (error) {
        res.status(400).json({ status: 0, message: error.message })
    }
});


//Update product cart by POST
router.post('/update-product-cart', auth.verifyToken, async (req, res) => {
    console.log("update-product-cart")
    var productCart = req.body

    try {
        if(productCart.quantity <= 0) {
            data = await ProductForCart.findByIdAndDelete(productCart._id)
        }
        else {
            data = await ProductForCart.findByIdAndUpdate(productCart._id, productCart, { new: true })
        }
        res.json({ status: 1, data: data })

    } catch(error) {
        res.json({ status: 0, data: error })
    }
})




// Get Order active cart
router.get("/order-cart", auth.verifyToken, async function (req, res) {
    console.log("for order-cart")
    try {
        var activeCart = await Cart.findOne({id_user: req.user._id, active: true})

        activeCart.status = 'IN_PREPARATION'
        activeCart.active = false
        activeCart.order_date = Date.now()
        activeCart.client_ref = ProductOperations.makeid(10)
        await activeCart.save()
        console.log(activeCart)

        res.status(200).json({ status: 1, data: activeCart })
    }
    catch (error) {
        res.status(400).json({ status: 0, data: error.message })
    }
});



module.exports = router;