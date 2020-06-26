const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Profile = require("./../Models/profile");

const addressSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  houseNo: {
    type: String,
  },
  landmark: {
    type: String,
  },
  mobile: {
    type: String,
    required: true,
  },
});

const Address = mongoose.model("address", addressSchema);
module.exports = Address;
