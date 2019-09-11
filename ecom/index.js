const express = require("express")
const app= express();
//const admin= require('./admin')
const router =require('./sellerReg')
const router1 =require('./userReg')

const mongoose= require('mongoose')
mongoose.connect ('mongodb://localhost:27017/ecomDB', {useNewUrlParser: true});

app.use(express.json());
app.use(router)
app.use(router1)

app.listen(7000,()=>{
    console.log('server is at 7000')
})