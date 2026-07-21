const Payment = require("../models/Payment");
const Subscription = require("../models/Subscription");

// ================= CREATE PAYMENT =================

const createPayment = async (req, res) => {
  try {

    const { subscriptionId, amount } = req.body;

    // Logged-in User ID from JWT
    const userId = req.user._id;

    if (!amount) {
      return res.status(400).json({
        message: "Amount is required",
      });
    }

    const transactionId = "TXN" + Date.now();

    const payment = await Payment.create({
      userId,
      transactionId,
      amount,
      paymentStatus: "Success",
    });

    // Update Subscription Status
    if (subscriptionId) {
      await Subscription.findByIdAndUpdate(subscriptionId, {
        paymentStatus: "Success",
      });
    }

    res.status(201).json({
      message: "Payment Successful",
      payment,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= GET PAYMENTS =================

const getPayments = async (req, res) => {
  try {
    let payments;

    // Admin -> View All Transactions
    if (req.user.role === "admin") {
      payments = await Payment.find()
        .populate("userId", "fullName email")
        .sort({ createdAt: -1 });
    }

    // User -> View Only Own Transactions
    else {
      payments = await Payment.find({
        userId: req.user._id,
      }).sort({ createdAt: -1 });
    }

    res.status(200).json({
      payments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET PAYMENT BY ID =================

const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate(
      "userId",
      "fullName email"
    );

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    // User can access only own payment
    if (
      req.user.role !== "admin" &&
      payment.userId._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPayment,
  getPayments,
  getPaymentById,
};