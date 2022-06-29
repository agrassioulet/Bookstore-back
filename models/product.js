const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const dataSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },

    description: {
        type: String
    },

    price: {
        required: true,
        type: Number
    },

    contributor: { type: Schema.Types.ObjectId, ref: 'contributor' },

    img_url: {
        type: String
    },
    language: {
        required: true,
        type: String,
        enum: ['english', 'french', 'spanish'],
        default: 'french'
    },
    category: { type: Schema.Types.ObjectId, ref: 'category' },
    isbn: {
        type: String
    },
    page: {
        type: Number
    },

    publication_date: {
        type: Date,
        default: Date.now()
    }

},{collection: 'product'})

module.exports = mongoose.model('product', dataSchema)