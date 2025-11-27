const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    dob: { type: String, required: true }, // format dd/mm/yyyy
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
