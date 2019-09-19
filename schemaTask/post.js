var mongoose = require("mongoose");

var postSchema= mongoose.Schema({

    title : {type : String } ,
    
    type : {type : Number , 
    
    enum : [image = 1 , video = 2] , required : true} ,
    
    userId : {type : "ObjectId" , required : true} ,
         
    totalLikes : {type : Number , default : 0 , min : 0},
    
    totalComment : {type : Number , default : 0 , min : 0},
    
})

var postModel = mongoose.model('postModel', postSchema);

module.exports = postModel;