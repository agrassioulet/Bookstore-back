const mongoose = require("mongoose")
const Category = require("./models/category")
const Contributor = require("./models/contributor")
const Product = require("./models/product")

const DATABASE_URL = 'mongodb+srv://agrassioulet:Voiture88@cluster0.xthqruv.mongodb.net/bdd-le-bazar'
mongoose.connect(DATABASE_URL)

run()

async function run() {
    await updateProducts()
    console.log('on closing bdd')
    //mongoose.disconnect()
}



async function updateProducts() {

    // var num = Math.random() * 200
    // num = num.toFixed(2);
    // console.log('num : ' + num)


    var cpt = 0
    try {
        // var categories = await Category.find({})
        // var contributors = await Contributor.find({})
        var products = await Product.find({}).populate("contributor").populate("category")
        // console.log('Products : ' + products)
        products.forEach(product => {
            var num = Math.random() * 200
            num = num.toFixed(2);
            // var randomCategory = categories[Math.floor(Math.random() * categories.length)];
            // product.id_category = randomCategory
            // product.id_contributor = contributors[Math.floor(Math.random() * contributors.length)];
            // product.isbn = '284391749-2'
            product.price = num
            product.save()
            cpt++

        })
        console.log('Saving count : ' + cpt)

    }
    catch (err) {
        console.log(err)
    }
}


function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}