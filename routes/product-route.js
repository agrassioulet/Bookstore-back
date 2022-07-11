const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');
const Product = require('../models/product');
const Order = require('../models/order');
const ProductCart = require('../models/product_cart');
const Category = require("../models/category")
const Contributor = require("../models/contributor")
const User = require('../models/user');
const ProductOperations = require('../operations/product-route-operations')
const upload = require('../multer_config')


// POST CREATE PRODUCT
// router.post("/product-add", upload.single("file"), function (req, res, next) {
//     const file = req.file
//     console.log('file', file)
//     console.log('req form', req.body.product)
//     res.json({ test: 'ok' })
//   });


router.post("/load-image-file",upload.single("file"), function (req, res, next) { //upload.single("file")
    const file = req.file
    console.log('file', req.file)
    console.log('product', req.body.title)

    res.json({ test1: 'ok', file: req.file })
})

router.post("/product-add", async function (req, res) {
    console.log('product add method')
    try {
        var category = await Category.findOne({ code: req.body.form.categoryCode })
        var contributor = await Contributor.findOne({ name: req.body.form.contributorName })

        var product = new Product({
            title: req.body.form.title,
            description: req.body.form.description,
            price: req.body.form.price,
            contributor: contributor,
            img_url: req.body.filename,
            language: req.body.form.language,
            category: category,
            isbn: req.body.form.isbn,
            page: req.body.form.pageNumber
        })

        const dataToSave = await product.save();
        res.json({ status: 1, data: dataToSave, message: 'Produit enregistré' })
    }
    catch (error) {
        res.json({ status: 0, data: {}, message: error.message })
    }
})


//Get all Method
router.get('/get-all-products', async (req, res) => {
    console.log('in get-all-product get')
    try {
        var products = await Product.find({}).populate("contributor").populate("category")
        res.json({ status: 1, data: products })
    }
    catch (error) {
        res.status(500).json({ status: 1, data: error })
    }
})

// Get all categories
router.get('/get-all-categories', async (req, res) => {
    console.log('in get-all-categories')
    try {
        var categories = await Category.find({})
        res.json({ status: 1, data: categories, message: 'Toutes les catégories' })
    }
    catch (error) {
        res.status(500).json({ status: 0, data: {}, message: error.message })
    }
})

// Get all contributors
router.get('/get-all-contributors', async (req, res) => {
    console.log('in get-all-categories')
    try {
        var contributors = await Contributor.find({})
        res.json({ status: 1, data: contributors, message: 'Tous les auteurs' })
    }
    catch (error) {
        res.status(500).json({ status: 0, data: {}, message: error.message })
    }
})

// Get category  with code
router.post('/get-category-by-code', async (req, res) => {
    console.log('in get-category-by-code')
    try {
        console.log('body: ', req.body.code)
        var category = await Category.findOne({ code: req.body.code })
        console.log('cat: ', category)

        res.json({ status: 1, data: category, message: 'Catégorie choisie' })
    }
    catch (error) {
        res.status(500).json({ status: 0, data: {}, message: error.message })
    }
})


//Get product by ID
router.get('/get-product-by-id/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("contributor").populate("category")
        res.json({ status: 1, data: product, message: 'Produit trouvé' })
    }
    catch (error) {
        res.json({ status: 0, data: {}, message: error.message })
    }
})


//Post Add Product to Cart
router.post('/add-product-to-cart', auth.verifyToken, async (req, res) => {
    try {
        console.log('in add-product-to-cart')
        console.log(req.body)
        var active_order = await Order.findOneAndUpdate({ user: req.user._id, active: true },
            { active: true, user: req.user._id }, { upsert: true })

        var productCart = await ProductCart.findOneAndUpdate({ order: active_order._id, product: req.body.product._id },
            { product: req.body.product._id, order: active_order._id }, { upsert: true, new: true })

        console.log("productCart", productCart)

        productCart.quantity = productCart.quantity + req.body.quantity ?? 0
        active_order.product_cart.push(productCart)
        await active_order.save()
        await productCart.save()

        res.json({ status: 1, data: productCart, message: 'Panier mis à jour' })

    }
    catch (error) {
        res.json({ status: 0, message: error.message, data: {} })
    }

})



// Get cart for a user in token
router.get("/get-cart", auth.verifyToken, async function (req, res) {
    console.log("in get-cart")

    try {
        var activeOrder = await Order.findOneAndUpdate({ user: req.user._id, active: true },
            { active: true, user: req.user._id }, { upsert: true, new: true }).populate({
                path: 'product_cart',
                populate: { path: 'product', populate: { path: 'category' } }
            })
        res.json({ status: 1, data: activeOrder, message: 'Panier du client' })
    }
    catch (error) {
        res.json({ status: 0, data: {}, message: error.message })
    }
});

// Post remove product cart
router.post("/remove-product-cart", auth.verifyToken, async function (req, res) {
    console.log("in remove-product-cart")
    try {
        console.log(req.body)
        var productCart = await ProductCart.findById(req.body._id)
        console.log('product cart is : ', productCart)
        var order = await Order.findById(productCart.order)
        console.log('Order to update : ' + order._id)
        console.log('product cart to update : ' + productCart._id)
        await Order.findByIdAndUpdate(
            order._id,
            { $pull: { "product_cart": productCart._id } }
        )
        await ProductCart.deleteOne({ _id: productCart._id })

        res.json({ status: 1, data: productCart, message: 'Produit supprimé du panier' })
    }
    catch (error) {
        res.json({ status: 0, data: {}, message: error.message })
    }
});


// Get quantity cart
router.get("/get-quantity-cart", auth.verifyToken, async function (req, res) {
    console.log("in get_quantity-cart")
    var quantity = 0

    try {
        var activeOrder = await Order.findOneAndUpdate({ user: req.user._id, active: true },
            { active: true, id_user: req.user._id }, { upsert: true, new: true })
        var productsCart = await ProductCart.find({ order: activeOrder._id })
        productsCart.forEach(element => {
            quantity = quantity + element.quantity ?? 0
        })

        res.status(200).json({ status: 1, data: quantity, message: 'Quantité dans le panier' })
    }
    catch (error) {
        res.status(400).json({ status: 0, data: {}, message: error.message })
    }
});

// Post Update Product Cart
router.post('/update-product-cart', auth.verifyToken, async (req, res) => {
    console.log("update-product-cart")
    var productCart = req.body
    console.log(req.body)

    try {
        if (productCart.quantity <= 0) {
            productCart = await ProductCart.findByIdAndDelete(productCart._id)
        }
        else {
            console.log('to delete quantity')
            productCart = await ProductCart.findByIdAndUpdate(productCart._id, productCart, { new: true })
        }
        res.json({ status: 1, data: productCart, message: 'Quantité mis à jour' })

    } catch (error) {
        res.json({ status: 0, data: {}, message: error })
    }
})


module.exports = router;