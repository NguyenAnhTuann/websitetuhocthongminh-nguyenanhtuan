const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fetch = require("node-fetch");

// ===== OpenAI ChatGPT =====
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
Bạn là trợ lý AI thông minh.
Trả lời chính xác và ngắn gọn.
`;


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
// 4) API ChatGPT
// ===============================
try {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: message },
    ],
  });

  const reply =
    completion.choices?.[0]?.message?.content ||
    "Tôi chưa thể trả lời câu hỏi này.";

  res.json({ reply });
} catch (err) {
  console.error("❌ OpenAI API error:", err);
  res.status(500).json({ reply: "Lỗi server ChatBot. Vui lòng thử lại." });
}



// ===============================
// 5) START SERVER
// ===============================
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy trên PORT ${PORT}`);
});
