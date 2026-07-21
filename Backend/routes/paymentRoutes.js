const express = require("express");
const router = express.Router();

const {
  createPayment,
  getPayments,
  getPaymentById,
} = require("../controllers/paymentController");

const { protect } = require("../middleware/authMiddleware");

// ==================================================
// CREATE PAYMENT
// Logged-in Users Only
// ==================================================
router.post("/", protect, createPayment);


// ==================================================
// GET PAYMENT HISTORY
//
// Admin:
// -> Can view ALL users' payment transactions
//
// User:
// -> Can view ONLY their own payment transactions
// ==================================================
router.get("/history", protect, getPayments);


// ==================================================
// GET PAYMENT DETAILS BY ID
//
// Admin:
// -> Can view any payment
//
// User:
// -> Can view ONLY their own payment
// ==================================================
router.get("/:id", protect, getPaymentById);


module.exports = router;