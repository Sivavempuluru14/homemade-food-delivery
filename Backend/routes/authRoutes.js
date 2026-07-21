const express = require("express");
const router = express.Router();

const {
  sendOtp,
  verifyOtp,
  registerUser,
  loginUser,
  userLogin,
  adminLogin,
  getProfile,
} = require("../controllers/authController");

const {
  protect,
} = require("../middleware/authMiddleware");

// ================= OTP Routes =================
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// ================= Register =================
router.post("/register", registerUser);

// ================= Login Routes =================

// Existing Login (Optional - Backward Compatibility)
router.post("/login", loginUser);

// User Login
router.post("/user/login", userLogin);

// Admin Login
router.post("/admin/login", adminLogin);

// ================= Profile =================
router.get("/profile", protect, getProfile);

module.exports = router;