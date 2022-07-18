const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const dataSchema = new mongoose.Schema({
    note: {
        required: true,
        type: Number
    },

    comment: {
        required: true,
        type: String
    },

    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    product: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'product'
    }
},{collection: 'evaluation'})

module.exports = mongoose.model('evaluation', dataSchema)
