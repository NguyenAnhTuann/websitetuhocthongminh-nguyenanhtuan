import { motion } from "framer-motion";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login({openForget }) {
  const [identifier, setIdentifier] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [msgType, setMsgType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleLogin = async () => {
    if (isSubmitting) return; // ❗ Ngăn Enter nhiều lần

    setIsSubmitting(true);
    setMsg("");

    if (!identifier || !pass) {
      setMsg("Vui lòng nhập đầy đủ thông tin!");
      setMsgType("error");
      setIsSubmitting(false);
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
        setMsg(data.message || "Đăng nhập thất bại!");
        setMsgType("error");
        setIsSubmitting(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user.role);

      setMsg("Đăng nhập thành công! Đang chuyển hướng...");
      setMsgType("success");

      setTimeout(() => {
        window.location.href = data.user.role === "admin" ? "/admin-dashboard" : "/home";
      }, 3000);

    } catch (err) {
      console.error("Login error:", err);
      setMsg("❌ Lỗi kết nối với hệ thống!");
      setIsSubmitting(false);
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
          ĐĂNG NHẬP
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Chào mừng bạn trở lại! Vui lòng đăng nhập để tiếp tục.
        </p>

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
        <div className="mb-2 relative">
          <label className="block text-gray-700 font-medium mb-1">
            Mật khẩu
          </label>

          <input
            type={showPass ? "text" : "password"}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            placeholder="Nhập mật khẩu..."
            className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#1c7c76]"
          />


          <span
            className="absolute right-4 top-[45px] text-gray-600 cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <FiEyeOff size={22} /> : <FiEye size={22} />}
          </span>
        </div>

        {/* FORGOT PASSWORD */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={openForget}   // ❗ Quan trọng
            className="text-[#1c7c76] text-sm font-medium hover:underline"
          >
            Quên mật khẩu?
          </button>
        </div>


        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          disabled={isSubmitting}
          className="w-full bg-[#1c7c76] hover:bg-[#166662] disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold shadow-md transition"
        >
          {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
        </button>


        <p className="text-center text-gray-600 mt-6 text-sm">
          Chưa có tài khoản?
          <a href="/dangky" className="text-[#1c7c76] font-medium underline">
            {" "}
            Đăng ký ngay
          </a>
        </p>
      </motion.div>


      {isSubmitting && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}


      {msg && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.6, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-white w-[88%] max-w-sm p-7 rounded-3xl shadow-xl text-center relative"
          >
            <div className="flex justify-center mb-4">
              {msgType === "success" ? (
                <img src="/done.png" alt="success" className="w-24 h-24 drop-shadow-xl" />
              ) : (
                <img src="/error.png" alt="error" className="w-24 h-24 drop-shadow-xl" />
              )}
            </div>

            <p
              className={`text-lg leading-relaxed ${msgType === "success"
                ? "text-[#1c7c76] font-bold"
                : "text-red-600 font-semibold"
                }`}
            >
              {msg}
            </p>

            <button
              onClick={() => {
                setMsg("");
                setMsgType("");
              }}
              className="mt-6 w-full bg-[#1c7c76] hover:bg-[#166662] text-white py-3 rounded-2xl font-semibold shadow-md transition"
            >
              Đóng
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}