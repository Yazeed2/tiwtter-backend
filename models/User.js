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
    lastCheck: Date,
    followers: [{type: mongoose.Schema.Types.ObjectId, ref:'user'} ],
    following: [{type: mongoose.Schema.Types.ObjectId, ref:'user'} ],
    tweets: [{type: mongoose.Schema.Types.ObjectId, ref:'tweet'} ],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref:'comment'} ],
    likes:[{type: mongoose.Schema.Types.ObjectId, ref:'tweet'} ],
}, 
{timestamps: true}
);

const Users = mongoose.model('user', UserSchema);
module.exports = Users;