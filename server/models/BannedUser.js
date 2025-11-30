const mongoose = require("mongoose");

const BannedUserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  bannedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("BannedUser", BannedUserSchema);
