import { motion } from "framer-motion";
import { useState } from "react";

export default function NhapOTP() {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");

  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const handleVerify = async () => {
    if (!code) {
      setMsg("Vui lòng nhập mã OTP!");
      setMsgType("error");
      return;
    }

    const res = await fetch("https://websitetuhocthongminh-nguyenanhtuan.onrender.com/api/auth/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    const data = await res.json();

    if (!data.success) {
      setMsg(data.message);
      setMsgType("error");
      return;
    }

    setMsg("Xác thực OTP thành công!");
    setMsgType("success");

    setTimeout(() => {
      window.location.href = `/datmatkhaumoi?email=${email}`;
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
          Nhập mã OTP
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Mã đã được gửi tới <b>{email}</b>
        </p>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Mã OTP
          </label>
          <input
            type="text"
            value={code}
            maxLength={6}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Nhập mã 6 số..."
            className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#1c7c76]"
          />
        </div>

        <button
          onClick={handleVerify}
          className="w-full bg-[#1c7c76] hover:bg-[#166662] text-white py-3 rounded-xl font-semibold shadow-md transition"
        >
          Xác nhận
        </button>
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
