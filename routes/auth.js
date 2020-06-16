const express = require ('express')
const router = express.Router()
const User = require ('../models/User')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv/config");

// make this in passport later (please don't judge me :))
router.post('/register', async(req,res)=>{
    
    let payload = req.body
    await bcrypt.hash(payload.password, 10, (err, hash)=> {
      payload.password = hash
      User.create(payload)
      .then(data=>{
      //send the token!
  
      data = {"_id": data._id}
      let token = jwt.sign(data, process.env.SECRET, {expiresIn:60*60*24*31})
      res.send(token)
      })
      .catch(err=>{
          if(err.code == 11000){
              res.status(401).send('username is used')
          }else{res.send(err)}
      })

    })
   
})


router.post('/login', (req, res)=>{
    User.findOne({username: req.body.username})
    .then(user=>{
        if(user){

            
            if(bcrypt.compareSync( req.body.password, user.password)){


                var paylod = {_id:user._id}

                let token = jwt.sign(paylod, process.env.SECRET, {expiresIn:60*60*24*31})
                res.send(token)
            }else{
                res.send('password is incorrect')
            }
        }else{
            res.send('username is incorrect')

        }
    })
    .catch(err=> res.send(err))
})
//make the change password later :P
router.put('/changepass', (req , res)=>{

} )
router.get('/:id',(req,res)=>{
    User.findById(req.params.id)
    .then(dat =>{
        dat = dat.populate('data')
        res.send(dat)
    })
        .catch(err=>res.send(err))
})


module.exports = router
