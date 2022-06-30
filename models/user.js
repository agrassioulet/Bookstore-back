const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({

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

module.exports = mongoose.model('User', dataSchema)
