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


    var imagebank = [


        '179w2m44-ebook-shortedge-384.jpg',
        '17g9rq8j-front-shortedge-384.jpg',
        '17qyjj49-front-shortedge-384.jpg',
        '18k4kyvg-ebook-shortedge-384.jpg',
        '18r4ekrz-front-shortedge-384.jpg',
        '195n5dqz-front-shortedge-384.jpg',
        '19znjwdq-front-shortedge-384.jpg',
        '1g2qj7e8-front-shortedge-384.jpg',
        '1jnmygd4-ebook-shortedge-384.jpg',
        '1k9je7me-ebook-shortedge-384.jpg',
        '1k9qp6vr-front-shortedge-384.jpg',
        '1qzwn4k-front-shortedge-384.jpg',
        '1rv29rvg-front-shortedge-384.jpg',
        '1zk92kdj-front-shortedge-384.jpg'

    ]


    var cpt = 0
    try {
        // var categories = await Category.find({})
        // var contributors = await Contributor.find({})
        var category = await Category.findOne({code: 'QW0PP9EPD9'})
        var products = await Product.find({category: category})


        // console.log('Products : ' + products)
        products.forEach(product => {




            //var numPage = Math.floor(Math.random() * 500)
            // num = num.toFixed(2);
            // var language = ['english', 'spanish', 'french']
            // var imagenamerandom = imagebank[Math.floor(Math.random() * imagebank.length)];
            // product.id_category = randomCategory
            // product.id_contributor = contributors[Math.floor(Math.random() * contributors.length)];
            // product.isbn = '284391749-2'
            product.img_url = '1k7eqyn-front-shortedge-384.jpg'
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