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
    required: [true, "Country is required"],
  },
  state: {
    type: String,
    required: [true, "State is required"],
  },
  district: {
    type: String,
    required: [true, "District is required"],
  },
  pin: {
    type: String,
    required: [true, "Pin is required"],
  },
  houseNo: {
    type: String,
  },
  landmark: {
    type: String,
  },
  mobile: {
    type: String,
    required: [true, "Mobile number is required"],
  },
});

const Address = mongoose.model("address", addressSchema);
module.exports = Address;
