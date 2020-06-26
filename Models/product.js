const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;
