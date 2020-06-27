const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  originalPrice: {
    type: String,
    required: true,
  },
  sellingPrice: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },

  descriptionMain: {
    type: String,
    required: true,
  },
  descriptionSub: {
    type: String,
    required: true,
  },
  descriptionSmall: {
    type: String,
  },
  images: [{ type: String }],
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;
