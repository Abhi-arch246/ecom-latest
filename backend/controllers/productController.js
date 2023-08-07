const Product = require("../models/productModel");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.send(products);
  } catch (error) {
    return res.status(400).json({ msg: "Something went wrong" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.json(product);
  } catch (error) {
    return res.status(400).json({ msg: "Something went wrong" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
