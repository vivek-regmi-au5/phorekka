const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const refundSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  crowdFundId: {
    type: Schema.Types.ObjectId,
    ref: "crowdFund",
  },
  donated: {
    type: String,
    required: [true, "A donated amount is required"],
  },
  transactionId: {
    type: Schema.Types.ObjectId,
    ref: "transaction",
  },
  reason: {
    type: String,
  },
});

const Refund = mongoose.model("refund", refundSchema);
module.exports = Refund;
