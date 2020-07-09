const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const profileSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  gravatar: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
  },
  location: {
    type: String,
  },
  age: {
    type: String,
  },
  interests: [{ type: String }],
  currentlyWorking: {
    type: String,
  },
  message: {
    type: String,
  },
  twitter: {
    type: String,
  },
  instagram: {
    type: String,
  },
  facebook: {
    type: String,
  },
  youtube: {
    type: String,
  },
  tiktok: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Profile = mongoose.model("profile", profileSchema);
module.exports = Profile;
