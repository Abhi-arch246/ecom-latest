const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

module.exports = router;
