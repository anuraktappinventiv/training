var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    img: { type: String },

    address: {
        street: { type: String, required: true },
        pincode: { type: String, required: true},
        city: { type: String, required: true }
    },

    phoneNo: { type: String, required: true, unique: true },

    productId:[{
        type:mongoose.Schema.ObjectId,
        ref:'productModel'
    }]



})

var userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;
