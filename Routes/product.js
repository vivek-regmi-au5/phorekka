const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConf = require("./../passport");
const Product = require("./../Models/product");

// @route  Get api/product
// @desc   Get all product
// @access Admin
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

// @route  Get api/product/id
// @desc   Get a product by id
// @access Admin
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json(product);
});

// @route  Post api/product
// @desc   Create product
// @access Admin
router.post("/", async (req, res) => {
  const {
    title,
    category,
    brand,
    originalPrice,
    sellingPrice,
    discount,
    descriptionMain,
    descriptionSub,
    descriptionSmall,
    images,
  } = req.body;

  //Build product fields
  const productFields = {};

  if (title) productFields.title = title;
  if (category) productFields.category = category;
  if (brand) productFields.brand = brand;
  if (originalPrice) productFields.originalPrice = originalPrice;
  if (sellingPrice) productFields.sellingPrice = sellingPrice;
  if (discount) productFields.discount = discount;
  if (descriptionMain) productFields.descriptionMain = descriptionMain;
  if (descriptionSub) productFields.descriptionSub = descriptionSub;
  if (descriptionSmall) productFields.descriptionSmall = descriptionSmall;
  if (images) productFields.images = images;

  try {
    // Save an address
    const product = new Product(productFields);
    const newProduct = await product.save();
    res.status(201).json({ product: newProduct });
  } catch (error) {
    console.log(error);
  }
});

// @route  Put api/address/id
// @desc   Update address
// @access Private
router.put("/:id", async (req, res) => {
  const {
    title,
    category,
    brand,
    originalPrice,
    sellingPrice,
    discount,
    descriptionMain,
    descriptionSub,
    descriptionSmall,
    images,
  } = req.body;

  //Build product fields
  const productFields = {};

  if (title) productFields.title = title;
  if (category) productFields.category = category;
  if (brand) productFields.brand = brand;
  if (originalPrice) productFields.originalPrice = originalPrice;
  if (sellingPrice) productFields.sellingPrice = sellingPrice;
  if (discount) productFields.discount = discount;
  if (descriptionMain) productFields.descriptionMain = descriptionMain;
  if (descriptionSub) productFields.descriptionSub = descriptionSub;
  if (descriptionSmall) productFields.descriptionSmall = descriptionSmall;
  if (images) productFields.images = images;

  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    { $set: productFields },
    { new: true }
  );

  res.status(201).json(product);
});

// @route  Delete api/product
// @desc   Delete product
// @access Admin
router.delete("/:id", async (req, res) => {
  await Product.findOneAndDelete({ _id: req.params.id });
  res.status(200).send("Product Successfully deleted");
});

module.exports = router;
