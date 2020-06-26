const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConf = require("./../passport");
const Profile = require("./../Models/profile");

// @route  Get api/profile
// @desc   Get profiles
// @access Public
router.get("/", async (req, res) => {
  const profiles = await Profile.find().populate("user", "-password");
  res.status(200).json(profiles);
});

// @route  Get api/profile/id
// @desc   Get current users profile
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),

  async (req, res) => {
    const profile = await Profile.findOne({ user: req.user._id }).populate(
      "user",
      "-password"
    );
    if (profile) {
      return res.status(200).json(profile);
    }
    res.status(404).send("Profile not found");
  }
);

// @route  Post/put api/profile
// @desc   Create or update profiles
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const {
      name,
      gravatar,
      bio,
      location,
      age,
      interests,
      currentlyWorking,
      message,
      twitter,
      instagram,
      facebook,
      youtube,
      tiktok,
    } = req.body;

    //Build profile fields
    const profileFields = {};
    profileFields.user = req.user._id;
    if (name) profileFields.name = name;
    if (gravatar) profileFields.gravatar = gravatar;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (age) profileFields.age = age;
    if (message) profileFields.message = message;
    if (currentlyWorking) profileFields.currentlyWorking = currentlyWorking;
    if (interests) {
      profileFields.interests = interests;
    }
    if (youtube) profileFields.youtube = youtube;
    if (twitter) profileFields.twitter = twitter;
    if (instagram) profileFields.instagram = instagram;
    if (facebook) profileFields.facebook = facebook;
    if (tiktok) profileFields.tiktok = tiktok;

    try {
      var profile = await Profile.findOne({ user: req.user._id });

      // If  profile found, update profile
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.status(200).json(profile);
      }

      // If profile is not found, create new profile

      const newProfile = new Profile(profileFields);
      const nwProf = await newProfile.save();
      res.status(201).json({ profile: nwProf });
    } catch (error) {
      console.log(error);
    }
  }
);

// @route  Put api/profile
// @desc   Update profiles
// @access Private
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const profile = Profile.find({ user: req.user._id });
    if (!profile) {
      const newProfile = new Profile({
        user: req.user._id,
        name: req.body.name,
        gravatar: req.body.gravatar,
        bio: req.body.bio,
        location: req.body.location,
        age: req.body.age,
        interests: req.body.interests,
        currentlyWorking: req.body.currentlyWorking,
        message: req.body.message,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
        facebook: req.body.facebook,
        youtube: req.body.youtube,
        tiktok: req.body.tiktok,
      });
      const profile = await newProfile.save();
      return res.status(201).json({ profile });
    } else {
    }
  }
);

// @route  Delete api/profile
// @desc   Delete profiles
// @access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Profile.findOneAndDelete({ user: req.user._id });

    res.status(200).send("Profile Successfully deleted");
  }
);

module.exports = router;
