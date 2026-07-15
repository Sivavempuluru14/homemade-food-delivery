const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  planType: {
    type: String,
    enum: ["Veg", "Non-Veg"],
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  lunchBoxCharge: {
    type: Number,
    default: 1000
  },

  totalAmount: {
    type: Number,
    required: true
  },

  paymentStatus: {
    type: String,
    default: "Pending"
  }

},
{
  timestamps:true
}
);


module.exports = mongoose.model(
  "Subscription",
  subscriptionSchema
);