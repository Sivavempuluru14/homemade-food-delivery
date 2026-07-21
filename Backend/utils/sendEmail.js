const nodemailer = require("nodemailer");

const sendEmail = async (email, fullName) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Homemade Food Delivery 🍱",
      html: `
        <h2>Hello ${fullName},</h2>

        <p>🎉 Congratulations! Your registration with <b>Homemade Food Delivery</b> has been completed successfully.</p>

        <p>We're excited to have you as part of our family. You can now explore our delicious homemade meal plans and enjoy fresh, healthy food delivered to your doorstep.</p>

        <p>Thank you for choosing us!</p>

        <p>
        Best Regards,<br>
        <b>Homemade Food Delivery Team</b>
        </p>
      `,
    });

    console.log("Email Sent Successfully");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendEmail;