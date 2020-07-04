const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  whom: {
    type: String,
    enum: ["men", "women", "all"],
  },
  category: {
    type: String,
    enum: ["clothing", "footware", "beauty", "electronics", "accessories"],
    required: [true, "Category is required"],
  },
  brand: {
    type: String,
    required: [true, "Brand name is required"],
  },
  originalPrice: {
    type: String,
    required: [true, "Original price is required"],
  },
  sellingPrice: {
    type: String,
    required: [true, "Selling price is required"],
  },
  discount: {
    type: String,
    required: [true, "Discount is required"],
  },

  descriptionMain: {
    type: String,
    required: [true, "Main description is required"],
  },
  descriptionSub: {
    type: String,
    required: [true, "Secondary description is required"],
  },
  descriptionSmall: {
    type: String,
  },
  images: [{ type: String }],
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;
