const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.get("/allusers", protect, admin, getAllUsers);

module.exports = router;
