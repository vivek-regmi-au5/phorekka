const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConf = require("./../passport");
const Address = require("./../Models/address");

// @route  Get api/profile/address
// @desc   Get all address for profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const addresses = await Address.find({ user: req.user._id })
        .populate("user", "-password")
        .populate("profile", ["name"]);
      res.status(200).json(addresses);
    } catch (error) {
      next(error);
    }
  }
);

// @route  Post/ api/profile/address
// @desc   Create address
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const {
      country,
      state,
      district,
      pin,
      houseNo,
      landmark,
      mobile,
      name,
    } = req.body;

    //Build address fields
    const addressFields = {};
    addressFields.user = req.user._id;

    if (name) addressFields.name = name;
    if (mobile) addressFields.mobile = mobile;
    if (landmark) addressFields.landmark = landmark;
    if (houseNo) addressFields.houseNo = houseNo;
    if (pin) addressFields.pin = pin;
    if (district) addressFields.district = district;
    if (country) addressFields.country = country;
    if (state) {
      addressFields.state = state;
    }

    try {
      // Save an address
      const address = new Address(addressFields);
      const newAddress = await address.save();
      res.status(201).json({ address: newAddress });
    } catch (error) {
      next(error);
    }
  }
);

// @route  Put api/address/id
// @desc   Update address
// @access Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const {
      country,
      state,
      district,
      pin,
      houseNo,
      landmark,
      mobile,
      name,
    } = req.body;

    //Build address fields
    const addressFields = {};
    addressFields.user = req.user._id;

    if (name) addressFields.name = name;
    if (mobile) addressFields.mobile = mobile;
    if (landmark) addressFields.landmark = landmark;
    if (houseNo) addressFields.houseNo = houseNo;
    if (pin) addressFields.pin = pin;
    if (district) addressFields.district = district;
    if (country) addressFields.country = country;
    if (state) {
      addressFields.state = state;
    }

    try {
      const address = await Address.findOneAndUpdate(
        { _id: req.params.id },
        { $set: addressFields },
        { new: true }
      );

      res.status(201).json(address);
    } catch (error) {
      next(error);
    }
  }
);

// @route  Delete api/profile/address
// @desc   Delete address
// @access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      await Address.findOneAndDelete({ _id: req.params.id });
      res.status(200).send("Address Successfully deleted");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
