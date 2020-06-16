const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type:String,
        required: true, 
        unique:true
    },
    password: {
        type:String,
        required: true, 
    },
    description: String, 
    name: String, 
    profilePic: String, 
    followers: [{type: mongoose.Schema.Types.ObjectId, ref:'users'} ],
    following: [{type: mongoose.Schema.Types.ObjectId, ref:'users'} ],
    tweets: [{type: mongoose.Schema.Types.ObjectId, ref:'tweets'} ],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref:'comments'} ],
}, 
{timestamps: true}
);

const Users = mongoose.model('user', UserSchema);
module.exports = Users;