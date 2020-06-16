const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
// const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User')
require('dotenv/config')
let PORT = process.env.PORT || 4000

// connect to mongoose
mongoose.set('useNewUrlParser',true);
mongoose.set('useCreateIndex',true);
mongoose.connect(process.env.DBCONNECT, {useNewUrlParser : true , useUnifiedTopology: true } )
.then(()=> console.log('Mongodb is running'),(err)=> console.log(err) )

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))

// app.use(passport.initialize())
// app.use(passport.session());

app.use('/auth',require('./routes/auth'))
app.use('/tweet',require('./routes/tweet'))



app.listen(PORT, ()=>console.log('server is running on port '+PORT))