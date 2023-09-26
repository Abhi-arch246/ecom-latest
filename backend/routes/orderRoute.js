const express = require("express");
const router = express.Router();
const {
  addOrder,
  getMyOrders,
  getOrderById,
  updateOrderPay,
  updateOrderDeliver,
  getAllOrders,
} = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", addOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", getOrderById);
router.put("/:id/pay", updateOrderPay);
router.get("/", protect, admin, getAllOrders);
router.put("/:id/deliver", protect, admin, updateOrderDeliver);

module.exports = router;
