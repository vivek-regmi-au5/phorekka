require("dotenv").config();
const Profile = require("./../Models/profile");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");

signToken = (user) => {
  return jwt.sign(
    {
      iss: "Phorekka",
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    process.env.JWT_SECRET
  );
};

// Email password validation
const signup = async (req, res, next) => {
  const { email, password, name } = req.value.body;

  // Check whether same email is already registered locally
  const found = await User.findOne({ email: email });
  if (found) {
    console.log("foundLocal: ", found);
    return res.status(403).send("Email Already exists locally");
    // const err = new Error("Email Already exists as local");
    // return next(err);
  }

  // Creating and saving a new User
  const newUser = new User({
    email: email,
    password: password,
    name: name,
  });
  await newUser.save();

  // Create a tokem
  const token = signToken(newUser);

  // Send the response
  res.status(200).json({ token, user: newUser });
};

const signin = async (req, res, next) => {
  const token = signToken(req.user);
  const user = await User.findById(req.user._id);
  const profile = await Profile.findOne({ user: req.user._id });

  return res.status(200).json({ token, user, profile });
};

const googleOauth = async (req, res, next) => {
  const token = signToken(req.user);

  return res.status(200).json(token);
};

const facebookOauth = async (req, res, next) => {
  const token = signToken(req.user);
  const user = await User.findById(req.user._id);
  const profile = await Profile.findOne({ user: req.user._id });
  console.log("Profile at facebook login: ", profile);
  console.log("User at facebook login: ", user);

  return res.status(200).json({ token, user, profile });
};

module.exports = {
  signup,
  signin,
  googleOauth,
  facebookOauth,
};
