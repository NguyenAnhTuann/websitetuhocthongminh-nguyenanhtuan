const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ===============================
// 1) KẾT NỐI MONGODB
// ===============================
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB error:", err));


// ===============================
// 2) TẠO USER MODEL
// ===============================
const UserSchema = new mongoose.Schema({
  fullname: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", UserSchema);


// ===============================
// 3) API ĐĂNG KÝ
// ===============================
app.post("/api/auth/register", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: "Email đã được sử dụng" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({ fullname, email, password: hashed });

    res.json({ success: true, message: "Đăng ký thành công" });

  } catch (err) {
    res.json({ success: false, message: "Lỗi server" });
  }
});


// ===============================
// 4) API ĐĂNG NHẬP
// ===============================
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Email không tồn tại" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ success: false, message: "Sai mật khẩu" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Đăng nhập thành công",
      token,
      fullname: user.fullname
    });

  } catch (err) {
    res.json({ success: false, message: "Lỗi server" });
  }
});


// ===============================
// 5) API CHAT GPT (giữ nguyên của bạn)
// ===============================
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const result = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Bạn là trợ lý Toán Lớp 10 – Cô Ngân. Hãy giải thích dễ hiểu, từng bước, không bỏ sót."
          },
          { role: "user", content: message }
        ]
      })
    });

    const data = await result.json();
    res.json({ reply: data.choices[0].message.content });

  } catch (err) {
    console.log(err);
    res.json({ reply: "Lỗi server hoặc API OpenAI" });
  }
});


// ===============================
// 6) KHỞI ĐỘNG SERVER
// ===============================
app.listen(5000, () => {
  console.log("🚀 Server đang chạy tại http://localhost:5000");
});
