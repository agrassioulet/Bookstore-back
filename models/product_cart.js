const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const dataSchema = new mongoose.Schema({
    product: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "product"
    },

    order: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "order"
    },

    quantity: {
        required: true,
        type: Number,
        default: 0
    }
},{collection: 'product_cart'})

module.exports = mongoose.model('product_cart', dataSchema)
