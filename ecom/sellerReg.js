const router = require('express').Router()
const admin = require('./admin')
const jwt=require('jsonwebtoken')
const product =  require('./product')
const verify=require('./verify')

router.post('/registerSeller', (req, res) => {
    
    let data = req.body;
    admin.create(data, (err, result) => {
        if (err) {

            res.send(err)
        }
        else {
            res.json({
                msg: 'seller is successfully registered',
                result: data
            })
        }

    })


})

router.post('/loginSeller', async (req, res) => {
    let emailExist = req.body.email
    let passwordExist = req.body.password

    let exist = await admin.findOne({ email: emailExist, password: passwordExist })
    if(exist){
        const token = jwt.sign({id: exist._id }, "SecrteKey");
        res.send(token)

    }
    else{
        res.send('seller does not exist')
    }
})


router.post('/addProduct', verify.verifyToken, async (req,res) =>{
    let productadd = req.body
    
    let data= await product.create(productadd)
    console.log(data)
    res.send(data)
    
} )

router.post('/delProduct/:id', verify.verifyToken, async (req,res) =>{
    let result = await product.deleteOne({_id:req.params.id})
        res.json({
            msg:"deleted",
            data:result
        })

})

module.exports = router