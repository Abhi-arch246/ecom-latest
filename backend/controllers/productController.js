const Product = require("../models/productModel");

//endPoint : '/api/products'
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.send(products);
  } catch (error) {
    return res.status(400).json({ msg: "Something went wrong" });
  }
};

//endPoint : '/api/products/:id'
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.json(product);
  } catch (error) {
    return res.status(400).json({ msg: "Something went wrong" });
  }
};

//endPoint : '/api/products/:id/reviews'
const addProductReview = async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (rv) => rv.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400).send("Product already reviewed");
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    console.log(review);

    product.reviews.push(review);
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();
    return res.status(201).send("Review added");
  } else {
    return res.status(400).send("Review not added, something went wrong");
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProductReview,
};
