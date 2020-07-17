const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConf = require("./../passport");
const CrowdFund = require("./../Models/crowdFund");

// @route  Get api/crowdFund by curent user id
// @desc   Get all crowd funded items for current user
// @access Private
router.get(
  "/:profileId",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const crowdFundItems = await CrowdFund.find({
        profileId: req.params.profileId,
      })
        .populate("profileId")
        .populate("productId");
      res.status(200).json(crowdFundItems);
    } catch (error) {
      res.send(error);
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
    try {
      const { profileId, productId } = req.body;
      const crowdFundfields = {};
      crowdFundfields.profileId = profileId;
      crowdFundfields.productId = productId;
      // Save an address
      const crowdFundItem = new CrowdFund(crowdFundfields);
      const newitem = await crowdFundItem.save();
      res.status(201).json({ crowdFund: newitem });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

// @route  Put api/crowdfund/id
// @desc   Update crowdfunded item by adding a transcation id after someone donates money
// @access Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const { transaction } = req.body;

    //

    try {
      const crowdFundItem = await CrowdFund.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { donationPool: transaction } },
        { new: true }
      );

      res.status(201).json(crowdFundItem);
    } catch (error) {
      next(error);
    }
  }
);

// @route  Delete api/crowdFund/id
// @desc   Delete address
// @access Private
router.delete("/:id", async (req, res, next) => {
  try {
    await CrowdFund.findOneAndDelete({ _id: req.params.id });
    res.status(200).send("Item Successfully deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
