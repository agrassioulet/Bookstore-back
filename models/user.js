const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const dataSchema = new mongoose.Schema({

    delivery_contact: {
        type: Schema.Types.ObjectId,
        ref: "delivery_contact"
    },

    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
},{collection: 'user'})

module.exports = mongoose.model('user', dataSchema)
