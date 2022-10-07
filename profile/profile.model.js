const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, // it associates a user by its id
    ref: "user", //we ref the collection we have in our database which is the users
  },
  handle: {
    type: String,
    required: true,
    max: 40,
  },
  bio: {
    type: String,
    required: true,
  },

  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Profile = mongoose.model(/*name*/ 'profile', profileSchema, /*collection:*/ 'Profiles');
module.exports = Profile