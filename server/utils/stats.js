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
    const totalUsers = await User.countDocuments();

    // Tổng lượt truy cập
    const totalVisitsAgg = await Visit.aggregate([
      { $group: { _id: null, total: { $sum: "$count" } } }
    ]);
    const totalVisits = totalVisitsAgg[0]?.total || 0;

    // 📅 Tháng hiện tại
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    // 📊 Lượt truy cập tháng
    const monthlyAgg = await Visit.aggregate([
      { $match: { date: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$count" } } }
    ]);

    // 📊 Lượt truy cập năm
    const yearlyAgg = await Visit.aggregate([
      { $match: { date: { $gte: startOfYear } } },
      { $group: { _id: null, total: { $sum: "$count" } } }
    ]);

    res.json({
      totalUsers,
      totalVisits,
      monthlyVisits: monthlyAgg[0]?.total || 0,
      yearlyVisits: yearlyAgg[0]?.total || 0,
    });

  } catch (err) {
    res.status(500).json({ message: "Lỗi thống kê" });
  }
});


module.exports = router; // Dùng module.exports