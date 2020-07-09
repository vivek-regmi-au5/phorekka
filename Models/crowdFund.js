const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const crowdFund = Schema({
  profileId: {
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
    type: String,
    enum: ["open", "complete"],
    default: "open",
  },
});

const CrowdFund = mongoose.model("crowdFund", crowdFund);
module.exports = CrowdFund;
