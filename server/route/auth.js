import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.json({ error: "Email đã tồn tại!" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed
    });

    res.json({ message: "Đăng ký thành công!", user });
  } catch (error) {
    res.json({ error: "Lỗi server" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ error: "Sai email hoặc mật khẩu" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ error: "Sai email hoặc mật khẩu" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ message: "Đăng nhập thành công!", token, user });
  } catch (error) {
    res.json({ error: "Lỗi server" });
  }
});

export default router;
