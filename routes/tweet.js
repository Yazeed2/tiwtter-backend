const express = require ('express')
const router = express.Router()
const Tweet = require('../models/Tweet')
const validate= require('./validate')
const Users = require('../models/User')


router.post('/',async (req, res)=> {
    let payload = req.body; 
    let token = payload.token // this could be a token or any means of auth
    if(token){
        try{
            let userToken = await validate(token)
            let userId = userToken._id
            let user = await Users.findById(userId)            
            let tweet = new Tweet(payload)
            tweet.user = user._id
            user.tweets.push(tweet._id)
            await tweet.save()
            await user.save()
            res.status(200).send('done')
            
        }
        catch (err){
            res.status(404).json({msg:err})
            return; 
        }
    }else{
        res.status(404).json({msg:'token not found :P'})
        return; 
    }
})

router.post('/retweet', async(req, res)=> {
    let payload = req.body; 
    let token = payload.token 
    if(token){ 
        try{
            let userToken = await validate(token)
            let userId = userToken._id
            let user = await Users.findById(userId) 
            if(user.tweets.find(elem => elem == payload.tweetId )){
                 res.status(401).json({msg: 'same tweet was found'})
            }           
            else{
                user.tweets.push(payload.tweetId)
            }

            await user.save()
            res.status(200).send('done')
        }catch (err){
            res.status(500).json({msg:err})
            return; 
        }
    }else{
        res.status(404).json({msg:'token not found :P'})
        return; 
    }
})

router.post('/like', async (req, res)=> {
    let payload = req.body; 
    let token = payload.token 
    if(token){ 
        try{
            let userToken = await validate(token)
            let userId = userToken._id
            let user = await Users.findById(userId) 
            let tweet = await Tweet.findById(payload.tweetId)
            let msg
            if(user.likes.find(elem => elem == payload.tweetId )){
                //unlike 
                // tweet.likes = tweet.likes.filter(user=> user !== userId)
                
                user.likes.pull(payload.tweetId)
                tweet.likes.pull(userId)
                msg = 'unlike'
                

            }           
            else{
                //like
                user.likes.push(payload.tweetId)
                tweet.likes.push(userId)
                console.log('like');
                msg = "like"
            }

            await user.save()
            await tweet.save()
            res.status(200).send(msg)
        }catch (err){
            console.log(err);
            
            res.status(500).json({msg:err})
            return; 
        }
    }else{
        res.status(404).json({msg:'token not found :P'})
        return; 
    }
})


module.exports = router
