const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConf = require("./../passport");
const Profile = require("./../Models/profile");

// @route  Get api/profile
// @desc   Get profiles
// @access Public
router.get("/", async (req, res, next) => {
  try {
    const profiles = await Profile.find()
      .populate("user", "-password")
      .populate("listed")
      .populate("funded");
    res.status(200).json(profiles);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// @route  Get api/profile/id
// @desc   Get current users profile
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),

  async (req, res, next) => {
    try {
      const profile = await Profile.findOne({ user: req.user._id }).populate(
        "user",
        "-password"
      );

      if (profile) {
        return res.status(200).json(profile);
      }
    } catch (error) {
      res.send("Couldn't find any profile");
    }
  }
);

// @route  Post/put api/profile
// @desc   Create or update profiles
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
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
    profileFields.listed = [];
    profileFields.funded = [];
    profileFields.user = req.user._id;
    if (name) profileFields.name = name;
    if (gravatar) profileFields.gravatar = gravatar;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (age) profileFields.age = age;
    if (message) profileFields.message = message;
    if (currentlyWorking) profileFields.currentlyWorking = currentlyWorking;
    if (interests) {
      profileFields.interests = [];
      interests.forEach((interest) => profileFields.interests.push(interest));
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
        const profileFieldsUpd = {};
        profileFieldsUpd.user = req.user._id;
        if (name) profileFieldsUpd.name = name;
        if (gravatar) profileFieldsUpd.gravatar = gravatar;
        if (location) profileFieldsUpd.location = location;
        if (bio) profileFieldsUpd.bio = bio;
        if (age) profileFieldsUpd.age = age;
        if (message) profileFieldsUpd.message = message;
        if (currentlyWorking)
          profileFieldsUpd.currentlyWorking = currentlyWorking;
        if (interests) {
          profileFieldsUpd.interests = [];
          interests.forEach((interest) =>
            profileFieldsUpd.interests.push(interest)
          );
        }
        if (youtube) profileFieldsUpd.youtube = youtube;
        if (twitter) profileFieldsUpd.twitter = twitter;
        if (instagram) profileFieldsUpd.instagram = instagram;
        if (facebook) profileFieldsUpd.facebook = facebook;
        if (tiktok) profileFieldsUpd.tiktok = tiktok;
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFieldsUpd },
          { new: true }
        )
          .populate("funded")
          .populate("listed");
        return res.status(200).json(profile);
      }

      // If profile is not found, create new profile

      const newProfile = new Profile(profileFields);
      const nwProf = await newProfile.save();
      res.status(201).json({ profile: nwProf });
    } catch (error) {
      res.json(error);
    }
  }
);

// @route  Delete api/profile
// @desc   Delete profiles
// @access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      await Profile.findOneAndDelete({ user: req.user._id });
      res.status(200).send("Profile Successfully deleted");
    } catch (error) {
      res.json(error);
    }
  }
);

// @route  put api/profile/funded
// @desc   add items for crowdfunding
// @access Private
router.put(
  "/funded",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let profile = await Profile.findOneAndUpdate(
        { user: req.user._id },
        {
          $push: { funded: req.body.funded },
        },
        { new: true }
      )
        .populate("funded")
        .populate("listed");

      res.status(200).json(profile);
    } catch (error) {
      res.json(error);
    }
  }
);

// @route  put api/profile/listed
// @desc   add items for crowdfunding
// @access Private
router.put(
  "/listed",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let profile = await Profile.findOneAndUpdate(
        { user: req.user._id },
        {
          $push: { listed: req.body.listed },
        },
        { new: true }
      )
        .populate("listed")
        .populate("funded");

      res.status(200).json(profile);
    } catch (error) {
      res.json(error);
    }
  }
);

module.exports = router;
