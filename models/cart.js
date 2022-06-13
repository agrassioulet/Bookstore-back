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
    }

})

module.exports = mongoose.model('cart', dataSchema)
