const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const crowdFund = Schema({
  influencerProfileId: {
    type: Schema.Types.ObjectId,
    ref: "profile",
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  donationPool: [
    {
      // Populate only userName, userId, userImage, donated amount, timestamp
      type: Schema.Types.ObjectId,
      ref: "transaction",
    },
  ],
  status: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    // 1: Open, 2: Complete, 3: Claimed, 4: Cancelled, 5: Expired
    default: 1,
  },
});

const CrowdFund = mongoose.model("crowdFund", crowdFund);
module.exports = CrowdFund;
