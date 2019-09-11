var mongoose = require('mongoose')

var sellerSchema = mongoose.Schema({
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    phoneNo: { type: String, required: true, unique: true }
})

var sellerModel = mongoose.model('sellerModel', sellerSchema)

module.exports = sellerModel