const express = require("express");
const router = express.Router();

const {
  sendOtp,
  verifyOtp,
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");

const {
  protect,
} = require("../middleware/authMiddleware");

// OTP Routes
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);

module.exports = router;