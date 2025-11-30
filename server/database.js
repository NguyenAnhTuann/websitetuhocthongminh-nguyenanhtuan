import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Đăng ký event TRƯỚC khi connect
    mongoose.connection.on("connected", () => {
      console.log("🔗 Connected to DB:", mongoose.connection.name);
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB error:", error);
    process.exit(1);
  }
};

export default connectDB;
