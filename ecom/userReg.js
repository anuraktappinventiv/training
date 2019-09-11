const router = require('express').Router()
const user=require('./user')
const jwt=require('jsonwebtoken')

router.post('/userRegister', (req,res)=>{
    let data = req.body;
    user.create(data, (err, result) => {
        if (err) {

            res.send(err)
        }
        else {
            res.json({
                msg: 'user is successfully registered',
                result: data
            })
        }

    })
}) 

router.post('/userLogin',async (req,res)=>{
    let emailExist = req.body.email
    let passwordExist = req.body.password

    let exist = await user.findOne({ email: emailExist, password: passwordExist })
    if(exist){
        const token = jwt.sign({id: exist._id }, "SecrteKey");
        res.send(token + 'user registered')

    }
    else{
        res.send('user does not exist')
    }
   
})

module.exports = router