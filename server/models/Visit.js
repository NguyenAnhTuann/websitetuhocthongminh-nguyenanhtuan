//server/models/Visit.js
const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
      index: true, // rất quan trọng cho thống kê theo ngày/tháng/năm
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model("Visit", visitSchema);
