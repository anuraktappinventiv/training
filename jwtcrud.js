    let express=require("express")
    let app= express();
    let Joi= require("joi");
    app.use(express.json())
    let jwt=require("jsonwebtoken")

     
student=Joi.object({
    name:Joi.string().required(),
    id:Joi.number().required(),
    phone:Joi.number().required(),
    password:Joi.string().required(),
    email:Joi.string().email().required()  
  })




    var studentData=[];

    app.post('/', (req,res)=>{
        
        
        Joi.validate(req.body, student,(err, result)=>{
            if(err){
                res.send('data validation failed');
            }
            else{
                let count=0;
                studentData.forEach((element)=>{
                    if(element.email==req.body.email && element.phone==req.body.phone){
                            count=1;
                    }
                });
                if (count==0)  {
                        let password= req.body.password
                      
                        try {
                            var token=jwt.sign({password},"privateKey", {algorithm:'HS256'})
                           // res.send(token)
                            result.password=token;
                            studentData.push(result);
                            //res.send(studentData)

                         }
                        catch(err){
                                 res.send('error in data');
                        }
                    //     studentData.push(result)
                    res.send(studentData)

                    }
                    else {
                        res.send("already registered")
                    }

                    
                

            }
        
        
        })

    })

    app.get('/', (req,res)=>{
        let count=0;
        studentData.forEach((element)=>{
            if(element.email==req.query.email && element.password==req.query.password){
                count=1;
                
            }
        });

        if(count==1){
           let userPassword= req.query.password
          
          
        try {
            var tokenPassword=jwt.sign({userPassword},"privateKey", {algorithm:'HS256'})
            let count=0;
            studentData.forEach((element)=>{
                if(element.email==req.query.email && element.password==tokenPassword){
                        count=1;
                }
            });
                if(count==1){
                res.send(" you logged in!!!!!!!!")
         }
         else{
             res.send("invalid data recieved")
         }}
        catch(err){
                 res.send('error in data');
        }
            res.send("you are loggedin!!!!")

        }
        else{
            res.send("invalid username/password")
        }

    })
    





    app.listen(4000,()=>{
        console.log("server is at 4000")
    
    })