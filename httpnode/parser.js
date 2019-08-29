let express= require('express');
let app= express();
 let details=[{name:'anurakt',age:22,id:1},
 {name:'tiwari',age:21,id:2},
 {name:'ankit',age:20,id:3},
 {name:'yash',age:19,id:4}
];
// app.get('/:id',(request,response)=>
// {
// let data=request.params.id;
// let count=0;
// let arr=[];
//  for(let i=0;i<details.length;i++){
//      if(details[i].id==data)
//      {    count++;
//          arr.push(details[i]);
         
//      }
//     }
//     if(count==0){
//     response.end('data  not found');
//     }
//     else{
//         response.send(arr);
//     }
// })
app.get('/',(request,response)=>{
    let data = request.query.id;
var temp=0;
let arr=[];
 for(let i=0;i<details.length;i++){
     if(details[i].id==data)
     {    temp++;
         arr.push(details[i]);
     }
    }
    if(temp==0){
    response.status(404) ;
    response.send("data not found!");
    }
    else{
        response.send(arr);
    }

})
app.listen(3004,()=>{
console.log("Server is at 3004");
})
