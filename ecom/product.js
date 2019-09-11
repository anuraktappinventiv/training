var mongoose = require('mongoose')

var productSchema = mongoose.Schema({

    brand: { type: String, required: true, unique: true },

   // gender: { type : String , max  : 1 },

    category: { type  : String  , required : true },

    image : {type : String } ,

    price : {type : Number , required : true} ,

    sellerId:[{
        type:mongoose.Schema.ObjectId,
        ref:'sellerModel'
    }]
    
})

var productModel = mongoose.model('productModel', productSchema)

module.exports = productModel
