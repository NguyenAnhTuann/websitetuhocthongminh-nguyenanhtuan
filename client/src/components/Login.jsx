import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useState } from "react";

export default function Login() {
  const [identifier, setIdentifier] = useState(""); // email hoặc phone
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async () => {
  setMsg(""); // reset msg

  if (!identifier || !pass) {
    setMsg("❌ Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  try {
    const res = await fetch("https://websitetuhocthongminh-nguyenanhtuan.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emailOrPhone: identifier,
        password: pass,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      setMsg("❌ " + (data.message || "Đăng nhập thất bại!"));
      return;
    }

    // LƯU TOKEN
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("role", data.user.role);

    // THÔNG BÁO THÀNH CÔNG
    setMsg("✅ Đăng nhập thành công! Đang chuyển hướng...");

    // Chuyển trang sau 1.2 giây
    setTimeout(() => {
      if (data.user.role === "admin") {
        window.location.href = "/admin-dashboard";
      } else {
        window.location.href = "/home";
      }
    }, 1200);

  } catch (err) {
    console.error("Login error:", err);
    setMsg("❌ Lỗi kết nối server!");
  }
};



  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-extrabold text-center mb-2 text-white bg-[#1c7c76] rounded-xl py-3">
          Đăng Nhập
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Chào mừng bạn trở lại! Vui lòng đăng nhập để tiếp tục.
        </p>

        {msg && (
  <p
    className={`text-center mb-4 ${
      msg.includes("✅") ? "text-green-600" : "text-red-600"
    }`}
  >
    {msg}
  </p>
)}

        {/* Email or Phone */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Email hoặc Số điện thoại
          </label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Nhập email hoặc số điện thoại..."
            className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#1c7c76]"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Mật khẩu
          </label>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Nhập mật khẩu..."
            className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#1c7c76]"
          />
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-[#1c7c76] hover:bg-[#166662] text-white py-3 rounded-xl font-semibold shadow-md transition"
        >
          Đăng nhập
        </button>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Chưa có tài khoản?
          <a href="/dangky" className="text-[#1c7c76] font-medium underline"> Đăng ký ngay</a>
        </p>
      </motion.div>
    </section>
  );
}
