const router = require('express').Router()
const postModel = require('./post')
const jwt = require('jsonwebtoken')
const verify = require('./verify')
const actionsModel = require('./actions')
const mongoose = require("mongoose")



// USER POST


router.post('/userPost', verify.verifyToken, async (req, res) => {
    let data = req.body;
    data.userId = currentId

    let postData = await postModel.create(data)
    res.send(postData)
})


// TO VIEW POST


router.get('/viewPost', verify.verifyToken, async (req, res) => {
    try {
        let data = await postModel.find({})
        res.json(data)
    }
    catch (err) {
        res.json(err)
    }

})


// COMMENT ON POST


router.post('/comment/:postId', verify.verifyToken, async (req, res) => {
    try {
        let data = req.params.postId

        req.body.postId = data
        req.body.userId = currentId
        console.log(req.body.userId)
z
        let showComment = await actionsModel.create(req.body)

        await postModel.updateOne({ _id: mongoose.Types.ObjectId(req.params.postId) }, { $inc: { totalComment: 1 } })

        res.status(200).json({ showComment })

    }
    catch (err) {
        res.send(err.message)
    }

})


// // DELETE COMMENT


// router.delete('/delComment/:postId', verify.verifyToken, async (req,res) =>{
//     let result = await product.deleteOne({_id : req.params.postId } )
//         res.json({
//             msg:"deleted",
//             data:result
//         })

// })

// LIKE POST


router.post('/like/:postId', verify.verifyToken, async (req, res) => {
    try {
        let data = req.params.postId

        req.body.postId = data
        req.body.userId = currentId

        console.log(data, currentId)

        let likeBy = await actionsModel.findOne({ userId: currentId, postId: data })

        if (likeBy) {
            await actionsModel.deleteOne({ userId: currentId, postId: data })
            await postModel.updateOne({ _id: mongoose.Types.ObjectId(req.params.postId) }, { $inc: { totalLikes: -1 } })
        }
        else {

            let showLike = await actionsModel.create(req.body)
            await postModel.updateOne({ _id: mongoose.Types.ObjectId(req.params.postId) }, { $inc: { totalLikes: 1 } }, { $upsert: true })
            res.status(200).json({ showLike })
        }


    }
    catch (err) {
        res.send(err.message)
    }

})

router.get('/fetchDataByType', async (req, res) => {
    let fetch = await postModel.aggregate([
        { $match: { type: 1 } },
        {
            $lookup:
            {
                from: "actionmodels",
                let: { likeby: "$userId", postby: "$_id" },
                pipeline: [
                    {
                        $match:
                        {
                            $expr:
                            {
                                $and:
                                    [
                                        { $eq: ["$userId", "$$likeby"] },
                                        { $eq: ["$postId", "$$postby"] },
                                        { $eq: ["$type", 1] }
                                    ]
                            }
                        }
                    },
                    { $limit: 5 }
                ],

                as: "fetchData"
            }
        },
        { $project: { fetchData: 1, _id: 1 } }

    ])
    res.json(fetch)
})

module.exports = router