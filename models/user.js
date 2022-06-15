const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({

    firstname: {
        type: String
    },
    lastname: {
        type: String
    },

    dateOfBirth: {
        type: Date
    },
    postalCode: {
        type: String
    },
    city: {
        type: String
    },
    adress: {
        type: String
    },
    email: {
        type: String
    },
    login: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('user', dataSchema)
