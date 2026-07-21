const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
  },

  mobile: {
    type: String,
    required: true,
  },

  emailOtp: {
    type: String,
    required: true,
  },

  whatsappOtp: {
    type: String,
    required: true,
  },

  verified: {
    type: Boolean,
    default: false,
  },

  expireAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },

});


module.exports = mongoose.model("Otp", otpSchema);