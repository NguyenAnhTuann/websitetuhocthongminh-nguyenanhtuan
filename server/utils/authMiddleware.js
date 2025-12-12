// server/utils/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User"); 

// Middleware kiểm tra token và vai trò admin
const isAdmin = async (req, res, next) => {
    let token;
    
    // Đảm bảo JWT_SECRET được định nghĩa trong .env
    const jwtSecret = process.env.JWT_SECRET || "your_fallback_secret"; 

    // 1. Kiểm tra header Authorization
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // 2. Xác thực token
            const decoded = jwt.verify(token, jwtSecret); 

            // 3. Tìm người dùng
            const user = await User.findById(decoded.userId).select("role");

            if (!user) {
                return res.status(401).json({ message: "Người dùng không tồn tại." });
            }

            // 4. Kiểm tra vai trò
            if (user.role !== "admin") {
                return res.status(403).json({ message: "Truy cập bị từ chối. Chỉ Admin mới được phép." });
            }

            req.user = user;
            next();

        } catch (error) {
            console.error("Lỗi xác thực hoặc truy vấn database:", error.message);
            // Trả về lỗi 401 nếu token không hợp lệ (hết hạn, sai secret)
            return res.status(401).json({ message: "Token không hợp lệ hoặc hết hạn. Vui lòng đăng nhập lại." });
        }
    } else {
        // Trả về lỗi 401 nếu không tìm thấy token
        return res.status(401).json({ message: "Không tìm thấy token. Vui lòng đăng nhập." });
    }
};

module.exports = { isAdmin };