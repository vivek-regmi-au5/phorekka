const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConf = require("./../passport");
const Transaction = require("./../Models/transaction");
const Refund = require("./../Models/refund");

// @route  Get api/transaction
// @desc   Get all transactions for a user
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const transactions = await Transaction.find({ user: req.user._id })
        .populate("user", "-password")
        .populate("crowdFundId");
      res.status(200).json(transactions);
    } catch (error) {
      res.json(error);
    }
  }
);

// @route  Post/ api/transaction
// @desc   Create transaction
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const { donated, crowdFundId } = req.body;
    const transactionField = {};
    transactionField.user = req.user._id;
    transactionField.crowdFundId = crowdFundId;
    transactionField.donated = donated;
    try {
      // Save an address
      const transaction = new Transaction(transactionField);
      const newTransaction = await transaction.save();
      res.status(201).json({ transaction: newTransaction });
    } catch (error) {
      next(error);
    }
  }
);

// @route  Put api/transaction/id
// @desc   Update address
// @access Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const { refundStatus } = req.body;

    try {
      const transaction = await transaction.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            refundStatus,
          },
        },
        { new: true }
      );

      res.status(201).json(transaction);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
