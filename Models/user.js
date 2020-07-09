const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = Schema({
  email: {
    type: String,
    lowercase: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  try {
    if (this.password) {
      // Creating salt
      const salt = await bcrypt.genSalt(10);
      // Hash password using salt
      const passwordHash = await bcrypt.hash(this.password, salt);
      // Reassign the hashpassword to password
      this.password = passwordHash;
      next();
    }
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model("user", userSchema);
module.exports = User;
