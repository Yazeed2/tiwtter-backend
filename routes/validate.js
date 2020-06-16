
require( 'dotenv/config')
const jwt = require('jsonwebtoken')
const valdiate  = (token) => new Promise((resolve, reject)=>{
    // make it a real validation yazeed :P 
  
    var decoded = jwt.verify(token, process.env.SECRET );    
    resolve(decoded)

}) 


module.exports = valdiate