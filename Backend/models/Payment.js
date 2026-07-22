const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    transactionId: {
      type: String,
      required: true,
      unique: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    planType: {
      type: String,
      enum: ["Veg", "Non-Veg"],
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["UPI", "Card", "Net Banking", "Cash"],
      default: "UPI",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending",
    },

    paymentDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Payment", paymentSchema);