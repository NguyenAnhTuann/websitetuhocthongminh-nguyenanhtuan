// server/utils/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Giả định User model nằm ở đường dẫn này

// Middleware kiểm tra token và vai trò admin
const isAdmin = async (req, res, next) => {
    let token;

    // 1. Kiểm tra header Authorization
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Lấy token từ header "Bearer <token>"
            token = req.headers.authorization.split(" ")[1];

            // 2. Xác thực token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key"); 
            // Lưu ý: Đảm bảo JWT_SECRET trong .env trùng với secret bạn dùng khi tạo token

            // 3. Tìm người dùng
            const user = await User.findById(decoded.userId).select("-password");

            if (!user) {
                return res.status(401).json({ message: "Người dùng không tồn tại." });
            }

            // 4. Kiểm tra vai trò
            if (user.role !== "admin") {
                return res.status(403).json({ message: "Truy cập bị từ chối. Chỉ Admin mới được phép." });
            }

            // Gán user vào request để sử dụng sau (nếu cần)
            req.user = user;
            next();

        } catch (error) {
            console.error("Lỗi xác thực token:", error.message);
            res.status(401).json({ message: "Không được phép, token không hợp lệ hoặc hết hạn." });
        }
    } else {
        res.status(401).json({ message: "Không có token, không được phép truy cập." });
    }
};

module.exports = { isAdmin };