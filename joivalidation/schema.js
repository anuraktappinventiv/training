const Joi= require("joi");
let querySchema;
module.exports = {
        validate1(  req, res ,next){
             querySchema=Joi.object({
                name:Joi.string().required(),
                //lastName: Joi.String(),
                //email: Joi.String().email().required(),
                phoneNo: Joi.string().min(3).max(11).required(),
                address: Joi.string().required(),
                id:Joi.number().required()
                //gender:Joi.String().valid([M,F,O]).required()
         
            }  );
            
            Joi.validate(req.body , querySchema , (err , result) => {


                console.log(req.body)
               if(err){
                    res.status(400).json({
                        message : err.message
                    } )
                    
                    
                }else{
                    next();
                }

                        
                        
                
                
            })
            
        }
}


