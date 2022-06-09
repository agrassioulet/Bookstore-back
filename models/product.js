const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    id: {
        required: true,
        type: String
    },
    title: {
        required: true,
        type: String
    },

    description: {
        required: true,
        type: String
    },

    price: {
        required: true,
        type: Number
    },

    stock: {
        required: true,
        type: Number
    },

    brand: {
        required: true,
        type: String
    },

    category: {
        required: true,
        type: String
    },

    subcategory: {
        required: true,
        type: String
    },

    imageURL: {
        required: true,
        type: String
    },
})

module.exports = mongoose.model('product', dataSchema)