const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    full_name: {
        type: String,
        //unique: true  /*meaning you cannot create a user with that same name */  
    },
    email: {
        type: String
    },
    // social_media: {
    //     type: String
    // },
    password: {
        type: String,
        required: true
    },
    // wallet : {
    //     type: Number,
    //     default: 0
    // }
}, { timestamps: true });

const User = mongoose.model(/*name*/ 'user', userSchema, /*collection:*/ 'Users');
module.exports = User;