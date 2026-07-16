const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  console.log("📱 Scan this QR Code:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("✅ WhatsApp Client Ready");
});

client.on("authenticated", () => {
  console.log("✅ WhatsApp Authenticated");
});

client.on("auth_failure", (msg) => {
  console.log("❌ Authentication Failed:", msg);
});

client.initialize();

module.exports = client;