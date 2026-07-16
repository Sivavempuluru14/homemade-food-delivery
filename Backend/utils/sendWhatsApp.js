const client = require("./whatsappClient");

const sendWhatsapp = async (mobile, fullName) => {
  try {
    const phone = `91${mobile}@c.us`;

    await client.sendMessage(
      phone,
      `🍱 Homemade Food Delivery

Hi ${fullName},

🎉 Registration Successful!

Welcome to Homemade Food Delivery.

🍛 Veg Plan – ₹6500/month
🍗 Non-Veg Plan – ₹7500/month

Thank you for joining us.`
    );

    console.log("✅ WhatsApp Message Sent");
  } catch (error) {
    console.log("❌ WhatsApp Error:", error.message);
  }
};

module.exports = sendWhatsapp;