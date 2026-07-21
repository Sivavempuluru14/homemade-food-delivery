const express = require("express");
const router = express.Router();

const {
  createPayment,
  getPayments,
  getPaymentById,
} = require("../controllers/paymentController");

const { protect } = require("../middleware/authMiddleware");

// Create Payment (Logged-in User)
router.post("/", protect, createPayment);

// Get Payment History
// Admin -> All Transactions
// User -> Own Transactions Only
router.get("/history", protect, getPayments);

// Get Payment By ID
router.get("/:id", protect, getPaymentById);

module.exports = router;