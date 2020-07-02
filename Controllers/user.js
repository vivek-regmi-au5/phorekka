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
  const { email, password } = req.value.body;

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
  });
  await newUser.save();

  // Create a tokem
  const token = signToken(newUser);

  // Send the response
  res.status(200).json({ token });
};

const signin = async (req, res, next) => {
  const token = signToken(req.user);
  const profile = await Profile.find({ user: req.user._id })
    .populate("listed")
    .populate("funded");
  if (profile.length > 0) {
    return res.status(200).json({ token, profile });
  } else {
    return res.status(200).json(token);
  }
};

const secret = async (req, res, next) => {
  res.send("Super secret route");
};

const googleOauth = async (req, res, next) => {
  const token = signToken(req.user);
  const profile = await Profile.find({ user: req.user._id })
    .populate("listed")
    .populate("funded");
  if (profile.length > 0) {
    return res.status(200).json({ token, profile });
  } else {
    return res.status(200).json(token);
  }
};

const facebookOauth = async (req, res, next) => {
  const token = signToken(req.user);
  const profile = await Profile.find({ user: req.user._id })
    .populate("listed")
    .populate("funded");
  if (profile.length > 0) {
    return res.status(200).json({ token, profile });
  } else {
    return res.status(200).json(token);
  }
};

module.exports = {
  signup,
  signin,
  secret,
  googleOauth,
  facebookOauth,
};
