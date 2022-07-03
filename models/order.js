const mongoose = require('mongoose');
const product_for_cart = require('./product_cart');
const delivery_contact = require('./delivery_contact');

var Schema = mongoose.Schema;

const dataSchema = new mongoose.Schema({

    delivery_contact: {
        type: Schema.Types.ObjectId,
        ref: "delivery_contact"
    },

    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "user"
    },

    active: {
        required: true,
        type: Boolean
    },
    validation_date: {
        type: Date
    },
    status: {
        type: String,
        enum: ['WAITING_FOR_VALIDATION', 'WAITING_FOR_TREATMENT', 'IN_PREPARATION'],
        default: 'WAITING_FOR_VALIDATION'
    },
    client_ref: {
        type: String,
    },
    updateAt: {
        type: Date
    },
    product_cart: [{ type: Schema.Types.ObjectId, ref: 'product_cart' }]

},{collection: 'order'})

dataSchema.pre('save', function (next) {
    this.updateAt = Date.now()
    next()
})

module.exports = mongoose.model('order', dataSchema)
