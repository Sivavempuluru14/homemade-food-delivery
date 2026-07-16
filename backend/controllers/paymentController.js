const Payment = require("../models/Payment");

const makePayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);

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

module.exports = {
  makePayment,
};