const express = require("express");
const router = express.Router();
const {
  addOrder,
  getMyOrders,
  getOrderById,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", addOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", getOrderById);

module.exports = router;
