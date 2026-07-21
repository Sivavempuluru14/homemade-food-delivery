const sendEmail = require("../utils/sendEmail");
const sendWhatsapp = require("../utils/sendWhatsapp");

const sendEmailOtp = require("../utils/sendEmailOtp");
const sendWhatsappOtp = require("../utils/sendWhatsappOtp");

const User = require("../models/User");
const Otp = require("../models/Otp");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate OTP
const generateOTP = () => {
  return Math.floor(
    100000 + Math.random() * 900000
  ).toString();
};

// ================= SEND OTP =================

const sendOtp = async (req, res) => {
  try {
    const { email, mobile } = req.body;

    const emailOtp = generateOTP();
    const whatsappOtp = generateOTP();

    await Otp.findOneAndUpdate(
      { email },
      {
        email,
        mobile,
        emailOtp,
        whatsappOtp,
      },
      {
        upsert: true,
        new: true,
      }
    );

    await sendEmailOtp(email, emailOtp);
    await sendWhatsappOtp(
      mobile,
      whatsappOtp
    );

    res.status(200).json({
      message:
        "Email OTP and WhatsApp OTP Sent Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= VERIFY OTP =================

const verifyOtp = async (req, res) => {
  try {

    const {
      email,
      mobile,
      emailOtp,
      whatsappOtp,
    } = req.body;


    // Find OTP record
    const otpData = await Otp.findOne({
      email,
      mobile,
    });


    if (!otpData) {
      return res.status(400).json({
        message: "OTP Expired or Not Found",
      });
    }


    // Check Email OTP
    if (otpData.emailOtp !== emailOtp) {
      return res.status(400).json({
        message: "Invalid Email OTP",
      });
    }


    // Check WhatsApp OTP
    if (otpData.whatsappOtp !== whatsappOtp) {
      return res.status(400).json({
        message: "Invalid WhatsApp OTP",
      });
    }


    // OTP Verification Success
    otpData.verified = true;

    await otpData.save();


    res.status(200).json({
      message:
        "Email and Mobile Verified Successfully",
    });


  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= REGISTER =================

const registerUser = async (req, res) => {
  try {

    const {
      fullName,
      email,
      mobile,
      password,
      location,
    } = req.body;


    // OTP Verification Check
    const otpData = await Otp.findOne({
      email,
      mobile,
      verified: true,
    });


    if (!otpData) {
      return res.status(400).json({
        message:
          "Please verify OTP first",
      });
    }


    // Check existing user
    const userExists =
      await User.findOne({ email });


    if (userExists) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }


    // Hash Password
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );


    // Create User
    const user =
      await User.create({

        fullName,

        email,

        mobile,

        password:
          hashedPassword,

        location,


        // Verification Status
        emailVerified: true,

        mobileVerified: true,

      });


    // Welcome Email
    await sendEmail(
      user.email,
      user.fullName
    );


    // Welcome WhatsApp Message
    await sendWhatsapp(
      user.mobile,
      user.fullName
    );


    // Remove Password from Response
    const {
      password: pwd,
      ...userData
    } = user._doc;


    res.status(201).json({

      message:
        "Registration Successful",

      user: userData,

    });


  } catch (error) {

    res.status(500).json({

      message:
        error.message,

    });

  }
};

// ================= LOGIN =================

const loginUser = async (req, res) => {
  try {
    const { email, password } =
      req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid Password",
      });
    }

    const token = jwt.sign(
  {
    id: user._id,
    role: user.role,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

    const {
      password: pwd,
      ...userData
    } = user._doc;

    res.status(200).json({
      message:
        "Login Successful",
      token,
      user: userData,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

// ================= USER LOGIN =================

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    // Only User Login
    if (user.role !== "user") {
      return res.status(403).json({
        message: "User Login Only",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const {
      password: pwd,
      ...userData
    } = user._doc;

    res.status(200).json({
      message: "User Login Successful",
      token,
      user: userData,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= ADMIN LOGIN =================

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    // Only Admin Login
    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Admin Login Only",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const {
      password: pwd,
      ...userData
    } = user._doc;

    res.status(200).json({
      message: "Admin Login Successful",
      token,
      user: userData,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// ================= PROFILE =================

const getProfile = async (
  req,
  res
) => {
  try {
    res.status(200).json(
      req.user
    );
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
  registerUser,
  loginUser,
  userLogin,
  adminLogin,
  getProfile,
};