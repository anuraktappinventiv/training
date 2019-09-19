var mongoose = require("mongoose")

var actionSchema = new mongoose.Schema({
        type: {type: Number,

        enum:[like=1, comment=2, report=3]},

        userId:{
            type: mongoose.Schema.Types.ObjectId,
                ref : "usermodels"
        },

        postId:{
            type: mongoose.Schema.Types.ObjectId,
                ref : "postmodels"
        },

        text:{type:String}

    })
    

var actionModel = mongoose.model('actionModel', actionSchema);

module.exports = actionModel;