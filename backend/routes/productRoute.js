const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  addProductReview,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/:id/reviews", protect, addProductReview);

module.exports = router;
