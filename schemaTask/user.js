var mongoose = require("mongoose")

var userSchema= mongoose.Schema({
    name:{type:String, required:true},
    
    img:{type:String},

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true }

})

var userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;




































