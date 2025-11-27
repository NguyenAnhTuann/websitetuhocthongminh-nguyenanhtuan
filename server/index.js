const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Dùng node-fetch để gọi API trực tiếp
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const User = require("./models/User");

app.use(cors({
  origin: "*",
  credentials: true
}));


const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);


// ===============================
// 1) KẾT NỐI MONGODB
// ===============================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));




app.get("/make-admin", async (req, res) => {
  try {
    const email = "admin@gmail.com"; // sửa thành email bạn muốn
    await User.findOneAndUpdate(
      { email },
      { role: "admin" }
    );
    res.send("Đã chuyển tài khoản thành admin");
  } catch (err) {
    res.status(500).send("Lỗi server");
  }
});


// ===============================
// 4) API Gemini Chat (ĐÃ SỬA VỀ MODEL CHUẨN)
// ===============================
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.json({ reply: "⚠️ Lỗi: Chưa cấu hình API Key trong file .env" });
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
          contents: [
            {
              parts: [{ text: message }]
            }
          ]
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Google API Error Detail:", JSON.stringify(data, null, 2));
      return res.json({ reply: `⚠️ Lỗi từ Google: ${data.error?.message || "Không rõ nguyên nhân"}` });
    }

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (reply) {
      res.json({ reply });
    } else {
      res.json({ reply: "⚠️ AI không trả lời (Phản hồi trống)." });
    }

  } catch (err) {
    console.error("❌ Server Error:", err);
    res.json({ reply: "⚠️ Lỗi kết nối đến server." });
  }
});

// ===============================
// 5) KHỞI ĐỘNG SERVER
// ===============================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});