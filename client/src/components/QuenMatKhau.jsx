import { motion } from "framer-motion";
import { useState } from "react";

export default function QuenMatKhau() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const handleSendCode = async () => {
    if (!email) {
      setMsg("Vui lòng nhập email!");
      setMsgType("error");
      return;
    }

    const res = await fetch("https://websitetuhocthongminh-nguyenanhtuan.onrender.com/api/auth/quenmatkhau", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!data.success) {
      setMsg(data.message);
      setMsgType("error");
      localStorage.removeItem("reset_step");
      return;
    }

    setMsg("Đã gửi mã OTP về email!");
    setMsgType("success");

    localStorage.setItem("reset_step", "otp_sent");


    // chuyển sang trang OTP
    setTimeout(() => {
      window.location.href = `/otp?email=${email}`;
    }, 1800);
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
          Quên Mật Khẩu
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Nhập email để nhận mã khôi phục.
        </p>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email..."
            className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#1c7c76]"
          />
        </div>

        <button
          onClick={handleSendCode}
          className="w-full bg-[#1c7c76] hover:bg-[#166662] text-white py-3 rounded-xl font-semibold shadow-md transition"
        >
          Gửi mã OTP
        </button>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Trở lại{" "}
          <a href="/dangnhap" className="text-[#1c7c76] font-medium underline">
            Đăng nhập
          </a>
        </p>
      </motion.div>

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
                <img src="/done.png" className="w-24 h-24 drop-shadow-xl" />
              ) : (
                <img src="/error.png" className="w-24 h-24 drop-shadow-xl" />
              )}
            </div>

            <p
              className={`text-lg leading-relaxed ${
                msgType === "success"
                  ? "text-[#1c7c76] font-bold"
                  : "text-red-600 font-semibold"
              }`}
            >
              {msg}
            </p>

            <button
              onClick={() => setMsg("")}
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
