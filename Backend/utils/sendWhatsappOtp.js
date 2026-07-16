const client = require("./whatsappClient");

const sendWhatsappOtp = async (
  mobile,
  otp
) => {
  try {
    const phone = `91${mobile}@c.us`;

    await client.sendMessage(
      phone,
      `🔐 Homemade Food Delivery

Your WhatsApp Verification OTP is:

${otp}

This OTP is valid for 5 minutes.`
    );

    console.log("✅ WhatsApp OTP Sent");
  } catch (error) {
    console.log(
      "❌ WhatsApp OTP Error:",
      error.message
    );
  }
};

module.exports = sendWhatsappOtp;