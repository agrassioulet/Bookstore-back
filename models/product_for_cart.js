const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const dataSchema = new mongoose.Schema({
    id_product: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "product"
    },
    id_user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "user"
    },

    quantity: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('product_for_cart', dataSchema)
