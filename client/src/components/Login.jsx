import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = () => {
    console.log("Login:", email, pass);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8"
      >

        {/* HEADER */}
        <h1 className="text-3xl font-extrabold text-center mb-2
                       text-white bg-[#1c7c76] rounded-xl py-3">
          Đăng Nhập
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Chào mừng bạn trở lại! Vui lòng đăng nhập để tiếp tục.
        </p>

        {/* INPUT EMAIL / PHONE */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Email hoặc Số điện thoại
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        {/* OR LINE */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-gray-500">Hoặc</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* SOCIAL LOGIN */}
        <div className="grid grid-cols-1 gap-3">
          {/* GOOGLE */}
          <button className="flex items-center justify-center gap-3 border rounded-xl py-3 hover:bg-gray-50 transition">
            <FcGoogle size={24} />
            <span className="font-medium">Đăng nhập bằng Google</span>
          </button>

          {/* FACEBOOK */}
          <button className="flex items-center justify-center gap-3 border rounded-xl py-3 hover:bg-gray-50 transition">
            <FaFacebook size={22} className="text-blue-600" />
            <span className="font-medium">Đăng nhập bằng Facebook</span>
          </button>
        </div>

        {/* REGISTER LINK */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          Chưa có tài khoản?{" "}
          <a href="/register" className="text-[#1c7c76] font-medium underline">
            Đăng ký ngay
          </a>
        </p>
      </motion.div>
    </section>
  );
}
