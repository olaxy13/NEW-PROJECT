const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: {
        type: String
    },
    social_media: {
        type: String
    },
    password: {
        type: String
    },
}, { timestamps: true });

const User = mongoose.model(/*name*/ 'user', userSchema, /*collection:*/ 'Users');
module.exports = User