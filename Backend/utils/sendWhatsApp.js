const twilio = require("twilio");

const sendWhatsapp = async (mobile, fullName) => {
  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const phone = String(mobile)
      .trim()
      .replace(/\s+/g, "")
      .replace("+91", "");

    const toNumber = `whatsapp:+91${phone}`;

    console.log("Sending WhatsApp to:", toNumber);

    const message = await client.messages.create({
      body: `🍱 Homemade Food Delivery

Hi ${fullName},

🎉 Registration Successful!

Your account has been created successfully.

Thank you for joining Homemade Food Delivery.

🍛 Veg Plan – ₹6500/month
🍗 Non-Veg Plan – ₹7500/month

We are excited to serve you.

- Homemade Food Delivery Team`,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: toNumber,
    });

    console.log("✅ WhatsApp Message Sent Successfully");
    console.log("Message SID:", message.sid);

    return message;
  } catch (error) {
    console.log("❌ WhatsApp Error");
    console.log("Message:", error.message);
    console.log("Code:", error.code);
    console.log("Status:", error.status);
    console.log("More Info:", error.moreInfo);

    return null;
  }
};

module.exports = sendWhatsapp;