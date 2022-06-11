const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const auth = require('../auth/auth');
const User = require('../models/user');
const ProductForCart = require('../models/product_for_cart');

// Function used in file
// function isUserExists() {
//     User.countDocuments({ _id: "62a0f434b12279967e5c9a7f" }, function (err, count) {
//         console.log("count user", count)
//         if (count == 1) {
//             console.log("return true in test user")
//             return true
//         }
//         else {
//             console.log("return false")
//             return false

//         }
//     })
    
// }


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
router.post('/addProductToCart', auth.verifyToken, async (req, res) => {
    
    console.log('in addProductToCart')
    console.log(req.body)
    console.log("req.user", req.user)
    // Vérifier que l'utilisateur existe
    var id_user = req.user[0]._id

    User.countDocuments({ _id: id_user }, function (err, count) {
        if (count == 1) {
            console.log("User finded")

            ProductForCart.create({ id_user: id_user, id_product: req.body.id_product, quantity: req.body.quantity })
                .then(function (data) {
                    res.json({ status: 1, data: data });
                })
                .catch(function (err) {
                    res.json({ status: 0, err: err });
                });
        }
        else {
            res.status(400).json({ status: 0, err: "Error on user" })
        }
    })
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
router.get("/getCart", auth.verifyToken, function (req, res) {
    console.log("for getCart")
    var id_user_from_token = req.user[0]._id

    if (true) { //isUserExists(id_user_from_token)
        ProductForCart.find({ id_user: id_user_from_token })
            .populate("id_user")
            .populate("id_product")
            .then(function (data) {
                res.json({ status: 1, data: data });
            })
            .catch(function (err) {
                res.json({ status: 0, data: err })
            });
    }
    else {
        console.log("user not founded")
        res.json({ status: 0, data: "User not founded" })
    }
});


//Update product cart by POST
router.post('/updateProductCart',auth.verifyToken, async (req, res) => {
    console.log("updateProductCart")
    var productCart = req.body
    var id_user_from_token = req.user[0]._id

     nbUsers = await User.countDocuments({_id : id_user_from_token}).exec()

    if (nbUsers == 1) {
        ProductForCart.findByIdAndUpdate(productCart._id, productCart, {new: true})
            .then(function (data) {
                res.json({ status: 1, data: data });
            })
            .catch(function (err) {
                res.json({ status: 0, data: err })
            });
    }
    else {
        console.log("user not founded")
        res.json({ status: 0, data: "User not founded" })
    }

    
})


module.exports = router;