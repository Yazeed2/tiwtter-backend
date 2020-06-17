const express = require ('express')
const router = express.Router()
const Tweet = require('../models/Tweet')
const validate = require('./validate')
const Users = require('../models/User')

router.get('/', async (req,res)=> {
    let payload = req.body; 
    let token = payload.token 
    if(token){ 
        try{
            let userToken = await validate(token)
            let userId = userToken._id
            let user = await Users.findById(userId) 
            let following = user.following
            following = following.map(elem => {
                return { user: elem}
            })     
            let feed = await Tweet.find({$or:following}).populate("user").sort({createdAt:1})
            user.lastCheck = new Date()
            await user.save()
            res.status(200).json(feed)
        }catch (err){
            console.log(err);
            res.status(500).send(err)
            return; 
        }
    }else{
        res.status(404).json({msg:'token not found :P'})
        return; 
    }
})



module.exports = router
