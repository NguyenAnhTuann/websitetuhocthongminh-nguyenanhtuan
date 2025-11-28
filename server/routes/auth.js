const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ===== REGISTER =====
router.post("/register", async (req, res) => {
  try {
    const { fullName, dob, school, grade, phone, email, password } = req.body;

    const exists = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (exists) {
      return res.status(409).json({   
        success: false,
        message: "Email hoặc số điện thoại đã được đăng ký. Vui lòng dùng thông tin khác."
      });
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user
    const newUser = await User.create({
      fullName,
      dob,
      school,
      grade,
      phone,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Tạo tài khoản thành công!",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
      }
    });

  } catch (err) {

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Email hoặc số điện thoại đã tồn tại!"
    });
  }

  console.error("Register error:", err);
  res.status(500).json({ success: false, message: "Lỗi server" });
}

});



router.post("/login", async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Tài khoản không tồn tại" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Sai mật khẩu" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role }, 
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );


    // ✅ TRẢ VỀ: success + token + user
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
});


const sendEmail = require("../utils/sendMail");


// ===== QUÊN MẬT KHẨU (GỬI OTP) =====
router.post("/quenmatkhau", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Email không tồn tại!" });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetCode = code;
    user.resetCodeExpire = Date.now() + 5 * 60 * 1000; // 5 phút
    await user.save();

    await sendEmail(
      email,
      "Mã đặt lại mật khẩu",
      `<h2>Mã đặt lại mật khẩu của bạn:</h2>
       <p style="font-size:22px; font-weight:bold;">${code}</p>
       <p>Mã sẽ hết hạn sau 5 phút.</p>`
    );

    res.json({ success: true, message: "Đã gửi mã xác nhận về email!" });

  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
});


// ===== XÁC NHẬN MÃ OTP =====
router.post("/otp", async (req, res) => {
  const { email, code } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.resetCode !== code) {
    return res.json({ success: false, message: "Mã OTP không đúng!" });
  }

  if (Date.now() > user.resetCodeExpire) {
    return res.json({ success: false, message: "Mã OTP đã hết hạn!" });
  }

  return res.json({ success: true, message: "OTP hợp lệ!" });
});



// ===== ĐẶT LẠI MẬT KHẨU =====
router.post("/datmatkhaumoi", async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ success: false, message: "Email không tồn tại!" });

  const hashed = await bcrypt.hash(newPassword, 10);

  user.password = hashed;
  user.resetCode = null;
  user.resetCodeExpire = null;

  await user.save();

  res.json({ success: true, message: "Đặt lại mật khẩu thành công!" });
});


module.exports = router;
