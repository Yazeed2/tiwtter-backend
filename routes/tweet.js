const express = require ('express')
const router = express.Router()
const Tweet = require('../models/Tweet')
const {validate} = require('./functions')


router.post('/',async (req, res)=> {
    let payload = req.body; 
    let token = payload.token // this could be a token or any means of auth
    if(token){
        try{
            let user = await validate(token)
            const tweet = new Tweet()
            
        }
        catch (err){
            res.status(404).json({msg:err})
            return; 
        }
    }else{
        res.status(404).json({msg:'user not found :P'})
        return; 
    }
})



module.exports = router
