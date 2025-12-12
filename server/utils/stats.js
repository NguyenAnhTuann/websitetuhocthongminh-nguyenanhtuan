// server/utils/stats.js

const express = require("express");
const Visit = require("../models/Visit");
const User  = require("../models/User");


const router = express.Router();

// Middleware kiểm tra quyền Admin (CẦN CODE THỰC TẾ CỦA BẠN ĐỂ KIỂM TRA ROLE)
const isAdmin = (req, res, next) => {
  // Thay thế bằng logic kiểm tra token và role="admin" thực tế
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    // Giả định: logic kiểm tra token ở đây thành công và là admin
    next();
  } else {
    return res.status(401).json({ message: "Chưa được xác thực hoặc không có quyền Admin" });
  }
};


// GET /api/stats/dashboard
// Lấy tổng số liệu cho Dashboard Admin
router.get("/dashboard", isAdmin, async (req, res) => {
  try {
    // 1. Tổng số lượt truy cập (tất cả các ngày)
    const totalVisitsResult = await Visit.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$count" },
        },
      },
    ]);
    const totalVisits = totalVisitsResult.length > 0 ? totalVisitsResult[0].total : 0;

    // 2. Tổng số người dùng đăng ký
    const totalUsers = await User.countDocuments(); 

    // 3. Lượt truy cập 7 ngày gần nhất
    const sevenDaysAgo = new Date(new Date().setHours(0, 0, 0, 0));
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    const recentVisits = await Visit.find({ date: { $gte: sevenDaysAgo } })
      .sort({ date: 1 })
      .select("date count -_id"); 

    res.status(200).json({
      totalUsers,
      totalVisits,
      // Đảm bảo dữ liệu gửi về có trường này để AdminDashboard.jsx không bị lỗi
      recentVisits, 
    });
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu thống kê:", error.message);
    res.status(500).json({ message: "Lỗi Server khi lấy thống kê" });
  }
});

module.exports = router; // Dùng module.exports