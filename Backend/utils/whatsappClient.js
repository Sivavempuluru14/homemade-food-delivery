const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
  authStrategy: new LocalAuth({
    clientId: "homemade-food-delivery",
  }),

  puppeteer: {
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",

    headless: true,

    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  },
});

client.on("qr", (qr) => {
  console.log("📱 Scan this QR Code:");

  qrcode.generate(qr, {
    small: true,
  });
});

client.on("authenticated", () => {
  console.log("✅ WhatsApp Authenticated");
});

client.on("ready", () => {
  console.log("✅ WhatsApp Client Ready");
});

client.on("auth_failure", (msg) => {
  console.log("❌ Authentication Failed:", msg);
});

client.on("disconnected", (reason) => {
  console.log("❌ WhatsApp Disconnected:", reason);
});

client.initialize().catch((err) => {
  console.error(
    "❌ WhatsApp Initialization Error:",
    err
  );
});

module.exports = client;