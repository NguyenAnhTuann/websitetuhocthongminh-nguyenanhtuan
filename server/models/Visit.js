// server/models/Visit.js
const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    // Lưu thời gian truy cập
    timestamp: {
        type: Date,
        default: Date.now
    },
    // Bạn có thể lưu thêm thông tin như IP, user agent nếu cần,
    // nhưng chỉ timestamp là đủ cho mục đích thống kê này.
    // ipAddress: { type: String }, 
    // userAgent: { type: String }
});

const Visit = mongoose.model('Visit', visitSchema);

module.exports = Visit;