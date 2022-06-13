const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const dataSchema = new mongoose.Schema({
    id_product: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "product"
    },

    id_cart: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "cart"
    },

    quantity: {
        required: true,
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('product_for_cart', dataSchema)
