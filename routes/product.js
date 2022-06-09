const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const auth = require('../auth/auth');
const User = require('../models/user');
const ProductForCart = require('../models/product_for_cart');

//Get all Method
router.get('/getAllProducts', async (req, res) => {
    try{
        const data = await Product.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get products by category
router.get('/getProductsByCategory/:category', async (req, res) => {
    try{
        const data = await Product.find({category: req.params.category});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get product by ID
router.get('/getProductById/:id', async (req, res) => {
    try{
        const data = await Product.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


//TEST - update product by ID
router.get('/update', async (req, res) => {
    try{
        const data = await Product.updateMany({}, {title: "Veste compactable et imperméable"});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


//Post Add Product to Cart
router.post('/addProductToCart', auth.verifyToken, async (req, res) => {
    console.log('in addProductToCart')
    console.log(req.body)
    console.log("req.user", req.user)
    // Vérifier que l'utilisateur existe
    var id_user = req.user[0]._id

    User.countDocuments({_id: id_user}, function (err, count){ 
        if(count == 1){
            console.log("User finded")

            ProductForCart.create({id_user: id_user, id_product: req.body.id_product, quantity: req.body.quantity  })
            .then(function(data) {
              res.json({status: 1, data: data});
            })
            .catch(function(err) {
              res.json({status: 0,err: err});
            });
        }
        else {
            res.status(400).json({status: 0,err: "Error on user"})
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

    User.countDocuments({_id: userID}, function (err, count){ 
        if(count == 1){
            console.log("Il y a bien un user avec cet ID")
            
            try {
                const data = ProductForCart.find({id_user: userID});
                res.status(200).json({ status: 1, data: dataToSave })
            }
            catch (error) {
                res.status(400).json({status: 0, message: error.message})
            }


        }
        else {
            res.status(400).json({status: 0, message: "Utilisateur non retrouvé"})
        }
    })
})

// Method to create a new element in cart
router.post("/createProductForCart", function(req, res) {
    ProductForCart.create(req.body)
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

// Get cart for a user
router.get("/cart/:id", function(req, res) {
    ProductForCart.find({ id_user: req.params.id })
      .populate("id_user")
      .populate("id_product")
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        res.json(err);
      });
  });


module.exports = router;