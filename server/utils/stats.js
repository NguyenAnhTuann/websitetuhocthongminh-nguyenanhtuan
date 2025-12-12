// server/routes/stats.js
import express from "express";
import Visit from "../models/Visit.js";
import User from "../models/User.js"; // Giả định bạn muốn thống kê thêm User

const router = express.Router();

// Middleware kiểm tra quyền Admin
const isAdmin = (req, res, next) => {
  // **LƯU Ý QUAN TRỌNG:** Bạn cần triển khai cơ chế kiểm tra Token/Session và Role thực tế ở đây!
  // Giả định bạn đã có middleware kiểm tra Auth/Admin, tôi sẽ dùng một logic đơn giản
  // Dựa vào việc check token/role trong AdminDashboard.jsx của bạn.
  // Ở đây tôi chỉ là một placeholder, bạn phải thay thế bằng middleware bảo mật thực tế của mình.
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    // Giả định token đã được xác thực và chứa role = "admin"
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
    const totalUsers = await User.countDocuments(); // Sử dụng User Model của bạn

    // 3. Lượt truy cập 7 ngày gần nhất (Dùng để vẽ biểu đồ nếu cần)
    const sevenDaysAgo = new Date(new Date().setHours(0, 0, 0, 0));
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    const recentVisits = await Visit.find({ date: { $gte: sevenDaysAgo } })
      .sort({ date: 1 })
      .select("date count -_id"); // Chỉ lấy date và count

    res.status(200).json({
      totalUsers,
      totalVisits,
      recentVisits,
    });
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu thống kê:", error.message);
    res.status(500).json({ message: "Lỗi Server khi lấy thống kê" });
  }
});

export default router;