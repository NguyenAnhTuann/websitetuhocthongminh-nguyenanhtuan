//server/routes/admin.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const BannedUser = require("../models/BannedUser");
const jwt = require("jsonwebtoken");




// ===============================
// Middleware kiểm tra Admin
// ===============================
function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Chưa đăng nhập" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Bạn không có quyền truy cập" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token không hợp lệ" });
  }
}


// ===============================
// API: Lấy danh sách user (ĐÃ THÊM TÌM KIẾM) <--- SỬA Ở ĐÂY
// ===============================
router.get("/users", verifyAdmin, async (req, res) => {
    try {
        const { search } = req.query; // Lấy tham số tìm kiếm
        let query = {};

        if (search) {
            const regex = new RegExp(search, "i"); 
            query = {
                $or: [
                    { fullName: { $regex: regex } },
                    { email: { $regex: regex } },
                    { phone: { $regex: regex } },
                    { grade: { $regex: regex } },
                    { school: { $regex: regex } },
                ],
            };
        }

        const users = await User.find(query).select("-password");
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }
});



// ===============================
// API: Lấy danh sách user
// ===============================
router.get("/users", verifyAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// ===============================
// API: XÓA USER + BAN EMAIL/PHONE
// ===============================
router.delete("/delete/:id", verifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy học sinh" });
    }

    // Lưu email + phone vào bảng cấm
    await BannedUser.create({
      email: user.email,
      phone: user.phone
    });

    // Xóa khỏi DB
    await User.findByIdAndDelete(id);

    res.json({ success: true, message: "Đã xóa học sinh và cấm đăng ký lại" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// ===============================
// API: LẤY TỔNG SỐ USER ĐÃ ĐĂNG KÝ
// ===============================
router.get("/users/count", verifyAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.json({ totalUsers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
});




module.exports = router;
