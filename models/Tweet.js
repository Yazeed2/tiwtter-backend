const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
    body: {
        type:String,
        required:true,
        // add max characters 
    }, 
    mainTweet: {type:mongoose.Schema.Types.ObjectId, ref:'tweet'}, // if the object is comment this get filled
    comments: [{type: mongoose.Schema.Types.ObjectId, ref:'tweet'} ],
    likes: [{type: mongoose.Schema.Types.ObjectId, ref:'user'} ],
    user:{
        type: mongoose.Schema.Types.ObjectId, ref:'user',
        required: true
    },
}, 
{timestamps: true}
);

const Tweets = mongoose.model('tweet', TweetSchema);
module.exports = Tweets;