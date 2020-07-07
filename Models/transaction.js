const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = Schema({
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
  refundStatus: {
    type: Boolean,
    default: false,
  },
});

const Transaction = mongoose.model("transaction", transactionSchema);
module.exports = Transaction;
