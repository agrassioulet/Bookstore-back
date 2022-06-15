const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const dataSchema = new mongoose.Schema({
    id_user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "user"
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
      }


})

module.exports = mongoose.model('cart', dataSchema)
