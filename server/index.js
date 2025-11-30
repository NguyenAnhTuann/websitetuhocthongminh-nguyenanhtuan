const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fetch = require("node-fetch");

const User = require("./models/User");

// KHỞI TẠO APP — PHẢI ĐỂ Ở ĐÂY
const app = express();

// MIDDLEWARE
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://www.tuhocthongminh.online",
      "https://tuhocthongminh.online",
      "https://websitetuhocthongminh-nguyenanhtuan.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);


// ROUTES
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);

// ===============================
// 1) KẾT NỐI MONGODB
// ===============================

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🔗 Connected to DB:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err);
    process.exit(1);
  });

// ===============================
// TẠO ADMIN
// ===============================
app.get("/make-admin", async (req, res) => {
  try {
    const email = "admin@gmail.com";
    await User.findOneAndUpdate(
      { email },
      { role: "admin" },
      { new: true }
    );
    res.send("Đã chuyển tài khoản thành admin");
  } catch (err) {
    res.status(500).send("Lỗi server");
  }
});

// ===============================
// 4) API Gemini Chat
// ===============================
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.json({
      reply: "⚠️ Lỗi: Chưa cấu hình GEMINI_API_KEY trong Render",
    });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Google API Error:", data);
      return res.json({
        reply: `⚠️ Lỗi từ Google: ${data.error?.message || "Không rõ nguyên nhân"}`,
      });
    }

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) return res.json({ reply: "⚠️ AI không trả lời." });

    res.json({ reply });
  } catch (err) {
    console.error("❌ Server Error:", err);
    res.json({ reply: "⚠️ Lỗi kết nối đến server." });
  }
});

// ===============================
// 5) START SERVER
// ===============================
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy trên PORT ${PORT}`);
});
