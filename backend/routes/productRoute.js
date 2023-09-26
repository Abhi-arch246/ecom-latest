const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  addProductReview,
  addProduct,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", getAllProducts);
router.post("/", protect, admin, addProduct);
router.get("/:id", getProductById);
router.post("/:id/reviews", protect, addProductReview);

module.exports = router;
