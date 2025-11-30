const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    dob: { type: String, required: true },
    school: { type: String, required: true },
    grade: { type: String, required: true },

    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },


    password: { type: String, required: true },

    // ===== Thêm cho quên mật khẩu =====
    resetCode: { type: String, default: null },
    resetCodeExpire: { type: Number, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);