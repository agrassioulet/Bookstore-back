const mongoose = require('mongoose');
const product_for_cart = require('./product_for_cart');
var Schema = mongoose.Schema;

const dataSchema = new mongoose.Schema({
    id_user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    active: {
        required: true,
        type: Boolean
    },
    order_date: {
        type: Date
    },
    status: {
        type: String,
        enum: ['NOT_SENT', 'WAITING_FOR_PAYMENT', 'IN_PREPARATION'],
        default: 'NOT_SENT'
    },
    client_ref: {
        type: String,
    },
    id_product_for_carts: [{ type: Schema.Types.ObjectId, ref: 'Product_for_cart' }]


})

module.exports = mongoose.model('Cart', dataSchema)
