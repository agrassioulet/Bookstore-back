const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },

    code: {
        required: true,
        type: String,
        default: 'CODE'
    }


},{collection: 'category'})

module.exports = mongoose.model('category', dataSchema)