const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  verification_code: {
    type: Number,
  },
  
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});
// hashPasswordPlugin(UserSchema)
module.exports = User = mongoose.model('users', UserSchema);