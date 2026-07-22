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
      "--no-first-run",
      "--no-zygote",
    ],
  },
});

// ================= QR CODE =================

client.on("qr", (qr) => {
  console.log("📱 Scan this QR Code:");

  qrcode.generate(qr, {
    small: true,
  });
});

// ================= AUTHENTICATED =================

client.on("authenticated", () => {
  console.log("✅ WhatsApp Authenticated");
});

// ================= READY =================

client.on("ready", () => {
  console.log("✅ WhatsApp Client Ready");
});

// ================= AUTH FAILURE =================

client.on("auth_failure", (msg) => {
  console.error(
    "❌ WhatsApp Authentication Failed:",
    msg
  );
});

// ================= DISCONNECTED =================

client.on("disconnected", (reason) => {
  console.log(
    "⚠️ WhatsApp Disconnected:",
    reason
  );

  // IMPORTANT:
  // Do NOT destroy the client here.
  // Do NOT delete .wwebjs_auth.
  // Session should remain saved.
});

// ================= INITIALIZE =================

const initializeWhatsApp = async () => {
  try {
    console.log(
      "🔄 Initializing WhatsApp Client..."
    );

    await client.initialize();

    console.log(
      "✅ WhatsApp Initialization Completed"
    );

  } catch (error) {
    console.error(
      "❌ WhatsApp Initialization Error:",
      error.message
    );

    // Retry after 10 seconds
    console.log(
      "🔄 Retrying WhatsApp initialization in 10 seconds..."
    );

    setTimeout(() => {
      initializeWhatsApp();
    }, 10000);
  }
};

// Start WhatsApp Client
initializeWhatsApp();

module.exports = client;