const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
    body: {
        type:String,
        required:true,
        // add max characters 
    }, 
    maintTweet: {type:mongoose.Schema.Types.ObjectId, ref:'tweets'}, // if the object is comment this get filled
    comments: [{type: mongoose.Schema.Types.ObjectId, ref:'tweets'} ],
    likes: [{type: mongoose.Schema.Types.ObjectId, ref:'users'} ],
    user: {
        type: mongoose.Schema.Types.ObjectId, ref:'users',
        required: true
    },
}, 
{timestamps: true}
);

const Tweets = mongoose.model('user', TweetSchema);
module.exports = Tweets;