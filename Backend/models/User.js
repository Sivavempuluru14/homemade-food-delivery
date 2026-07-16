const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  fullName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  mobile: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  location: {
    type: String
  },

  emailVerified: {
    type: Boolean,
    default: false
  },

  mobileVerified: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
});


module.exports = mongoose.model("User", userSchema);