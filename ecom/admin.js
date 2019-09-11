var mongoose = require('mongoose');
//var Schema =mongoose.Schema;

var adminSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
})

var adminModel = mongoose.model('adminModel', adminSchema);


module.exports = adminModel