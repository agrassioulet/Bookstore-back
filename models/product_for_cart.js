const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const dataSchema = new mongoose.Schema({
    id_product: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Product"
    },

    id_cart: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Cart"
    },

    quantity: {
        required: true,
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Product_for_cart', dataSchema)
