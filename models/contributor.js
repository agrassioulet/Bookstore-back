const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    }
},{collection: 'contributor'})

module.exports = mongoose.model('contributor', dataSchema)