const Payment = require("../models/Payment");
const Subscription = require("../models/Subscription");

const createPayment = async (req, res) => {
  try {
    const { userId, subscriptionId, amount } = req.body;

    if (!userId || !amount) {
      return res.status(400).json({ message: "userId and amount are required" });
    }

    const transactionId = "TXN" + Date.now();

    const payment = await Payment.create({
      userId,
      transactionId,
      amount,
      paymentStatus: "Success",
    });

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

const getPayments = async (req, res) => {
  try {
    const filter = req.query.userId ? { userId: req.query.userId } : {};
    const payments = await Payment.find(filter).sort({ paymentDate: -1 });

    res.status(200).json({ payments });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createPayment, getPayments };