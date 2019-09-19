const express = require("express")
const app = express();

const router = require('./userReg')
const router1 = require('./sendPost')

const mongoose = require('mongoose')

mongoose.set('debug', true)
mongoose.connect('mongodb://localhost:27017/social', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // createIndexes:true
});


app.use(express.json());
app.use(router)
app.use(router1)


app.listen(7002, () => {
    console.log('server is at 7002')
})