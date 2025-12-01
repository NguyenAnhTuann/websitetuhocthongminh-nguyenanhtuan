import { motion } from "framer-motion";
import { useState } from "react";

export default function QuenMatKhau({ onNext }) {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [loading, setLoading] = useState(false);   // ⭐ vị trí 1

  const handleSendCode = async () => {
    if (!email) {
      setMsg("Vui lòng nhập email!");
      setMsgType("error");
      return;
    }

    setLoading(true);  // ⭐ vị trí 2

    const res = await fetch(
      "https://websitetuhocthongminh-nguyenanhtuan.onrender.com/api/auth/quenmatkhau",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();
    setLoading(false); // ⭐ vị trí 3

    if (!data.success) {
      setMsg(data.message);
      setMsgType("error");
      return;
    }

    setMsg("Đã gửi mã OTP về email!");
    setMsgType("success");

    setTimeout(() => onNext(email), 1800);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4">
      
      {/* FORM */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-extrabold text-center mb-2 text-white bg-[#1c7c76] rounded-xl py-3">
          Quên Mật Khẩu
        </h1>

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
      </motion.div>

      {/* POPUP MESSAGE */}
      {msg && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.6, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-white w-[88%] max-w-sm p-7 rounded-3xl shadow-xl text-center"
          >
            <p className={`text-lg ${msgType === "success" ? "text-[#1c7c76]" : "text-red-600"}`}>
              {msg}
            </p>

            <button
              onClick={() => setMsg("")}
              className="mt-6 w-full bg-[#1c7c76] text-white py-3 rounded-2xl font-semibold"
            >
              Đóng
            </button>
          </motion.div>
        </div>
      )}

      {/* LOADING SPINNER */}
      {loading && (  // ⭐ vị trí 4
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </section>
  );
}
