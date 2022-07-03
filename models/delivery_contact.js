const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const dataSchema = new mongoose.Schema({

    adress: {
        required: true,
        type: String
    },

    city: {
        required: true,
        type: String
    },

    company: {
        required: true,
        type: String
    },

    country: {
        required: true,
        type: String
    },

    firstname: {
        required: true,
        type: String
    },

    lastname: {
        required: true,
        type: String
    },

    phoneNumber: {
        required: true,
        type: String
    },

    postalCode: {
        required: true,
        type: String
    }
},{collection: 'delivery_contact'})

module.exports = mongoose.model('delivery_contact', dataSchema)
