// server/models/Visit.js
import mongoose from "mongoose";

const VisitSchema = new mongoose.Schema({
  // Ngày truy cập (dùng để nhóm và chỉ lưu 1 bản ghi/ngày)
  date: {
    type: Date,
    required: true,
    unique: true, // Đảm bảo chỉ có 1 bản ghi cho mỗi ngày
    default: () => new Date(new Date().setHours(0, 0, 0, 0)), // Đặt mặc định là đầu ngày hôm nay (00:00:00)
  },
  // Tổng số lượt truy cập trong ngày đó
  count: {
    type: Number,
    required: true,
    default: 0,
  },
}, {
  timestamps: true // Thêm createdAt và updatedAt
});

// Tạo index để tìm kiếm theo ngày nhanh hơn
VisitSchema.index({ date: 1 });

const Visit = mongoose.model("Visit", VisitSchema);

export default Visit;