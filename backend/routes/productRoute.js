const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  addProductReview,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", getAllProducts);
router.post("/", protect, admin, addProduct);
router.get("/:id", getProductById);
router.put("/:id", protect, admin, updateProduct);
router.post("/:id/reviews", protect, addProductReview);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
