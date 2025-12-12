// server/routes/stats.js
const express = require('express');
const router = express.Router();
const Visit = require('../models/Visit');
const { isAdmin } = require('../utils/authMiddleware'); // 🔥 Cần file này

// GET /api/stats/visits - Cần middleware isAdmin để bảo vệ route này
router.get('/visits', isAdmin, async (req, res) => {
    try {
        const now = new Date();

        // 1. Thống kê theo ngày (Hôm nay)
        // Lấy bản sao để thay đổi giờ mà không ảnh hưởng đến biến 'now'
        const today = new Date(now); 
        const startOfToday = today.setHours(0, 0, 0, 0); // Lấy 00:00:00 hôm nay

        const visitsToday = await Visit.countDocuments({
            timestamp: { $gte: startOfToday }
        });

        // 2. Thống kê theo tháng (Tháng hiện tại)
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const visitsMonth = await Visit.countDocuments({
            timestamp: { $gte: startOfMonth }
        });

        // 3. Thống kê theo năm (Năm hiện tại)
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const visitsYear = await Visit.countDocuments({
            timestamp: { $gte: startOfYear }
        });

        res.json({
            today: visitsToday,
            month: visitsMonth,
            year: visitsYear,
        });

    } catch (error) {
        console.error('Lỗi khi lấy thống kê truy cập:', error);
        res.status(500).json({ message: 'Lỗi server khi lấy thống kê.' });
    }
});

module.exports = router;