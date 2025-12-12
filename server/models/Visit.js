// server/models/Visit.js
const mongoose = require("mongoose"); // Dùng require

const VisitSchema = new mongoose.Schema({
  // Ngày truy cập (dùng để nhóm và chỉ lưu 1 bản ghi/ngày)
  date: {
    type: Date,
    required: true,
    unique: true,
    default: () => new Date(new Date().setHours(0, 0, 0, 0)),
  },
  // Tổng số lượt truy cập trong ngày đó
  count: {
    type: Number,
    required: true,
    default: 0,
  },
}, {
  timestamps: true
});

VisitSchema.index({ date: 1 });

const Visit = mongoose.model("Visit", VisitSchema);

module.exports = Visit; // Dùng module.exports