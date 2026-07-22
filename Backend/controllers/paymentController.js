const Payment = require("../models/Payment");
const Subscription = require("../models/Subscription");

// ================= CREATE PAYMENT =================

const createPayment = async (req, res) => {
  try {
    const {
  subscriptionId,
  amount,
  paymentMethod,
  planType,
} = req.body;
    // Logged-in User ID from JWT
    const userId = req.user._id;

    // Amount validation
    if (!amount) {
      return res.status(400).json({
        message: "Amount is required",
      });
    }

    // If subscriptionId is provided,
    // verify that subscription belongs to logged-in user
    if (subscriptionId) {
      const subscription = await Subscription.findById(
        subscriptionId
      );

      if (!subscription) {
        return res.status(404).json({
          message: "Subscription not found",
        });
      }

      // Prevent user from paying/updating another user's subscription
      if (
        subscription.userId.toString() !==
        userId.toString()
      ) {
        return res.status(403).json({
          message:
            "Access Denied. This subscription does not belong to you.",
        });
      }
    }

    // Generate Transaction ID
    const transactionId =
      "TXN" + Date.now();

    // Create Payment
   const payment = await Payment.create({
  userId,
  transactionId,
  amount,
  paymentMethod,
  planType,
  paymentStatus: "Success",
});

    // Update Subscription Payment Status
    if (subscriptionId) {
      await Subscription.findByIdAndUpdate(
        subscriptionId,
        {
          paymentStatus: "Success",
        }
      );
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

    // ================= ADMIN =================
    // Admin can view ALL users' transactions
    if (req.user.role === "admin") {
      payments = await Payment.find()
        .populate("userId", "fullName email mobile")
        .sort({ createdAt: -1 });
    }

    // ================= USER =================
    // User can view ONLY their own transactions
    else {
      payments = await Payment.find({
        userId: req.user._id,
      })
        .sort({ createdAt: -1 });
    }

    res.status(200).json({
      payments,
    });

  } catch (error) {
    console.error("Get Payments Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET PAYMENT BY ID =================

const getPaymentById = async (req, res) => {
  try {
    // Find payment and populate user details
    const payment = await Payment.findById(
      req.params.id
    ).populate(
      "userId",
      "fullName email mobile"
    );

    // Payment not found
    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    // ================= ADMIN =================
    // Admin can view any payment
    if (req.user.role === "admin") {
      return res.status(200).json(payment);
    }

    // ================= USER =================
    // User can view only their own payment
    if (
      payment.userId._id.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "Access Denied. You can view only your own payment.",
      });
    }

    // Return own payment
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= EXPORT =================

module.exports = {
  createPayment,
  getPayments,
  getPaymentById,
};