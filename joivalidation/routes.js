let express= require("express");
let app= express()
const validation =  require('./schema') ;

app.use(express.json())

let data  = [] ;

app.get("/", (req, res) => {

   res.json({
     message : data
   })
  
});

app.post("/", validation.validate1, (req, res) => {    //middleware
  console.log(req.body)
  let name= req.body.name
  let id = req.body['id'];
  let phoneNo = req.body['phoneNo'];
  let address = req.body['address']; 
  data.push(req.body);
  console.log(name , id , address);
   res.json({
     message : req.body
   })
});
  
app.delete("/:id",(req,res)=>{
let getId=req.params.id
console.log(req.params.id)
  for(let i=0 ; i<data.length ; i++){
    if(data[i].id == getId){
      data.splice(i , 1)
      break ;


    }

    res.json({
      message:data
    })
  }

})



app.listen(3006,()=>{
    console.log("server is at 3006")
})