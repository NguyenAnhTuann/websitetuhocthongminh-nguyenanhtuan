import { motion } from "framer-motion";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function DatMatKhauMoi() {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");

  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const handleReset = async () => {
    if (!pass || !pass2) {
      setMsg("Vui lòng nhập đầy đủ!");
      setMsgType("error");
      return;
    }

    if (pass !== pass2) {
      setMsg("Mật khẩu nhập lại không khớp!");
      setMsgType("error");
      return;
    }

    const res = await fetch("http://localhost:5000/api/auth/datmatkhaumoi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword: pass }),
    });

    const data = await res.json();

    if (!data.success) {
      setMsg(data.message);
      setMsgType("error");
      return;
    }

    setMsg("Đặt lại mật khẩu thành công!");
    setMsgType("success");

    setTimeout(() => {
      window.location.href = "/dangnhap";
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
          Mật Khẩu Mới
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Nhập mật khẩu mới cho tài khoản: <b>{email}</b>
        </p>

        {/* Password */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 font-medium mb-1">
            Mật khẩu mới
          </label>
          <input
            type={show ? "text" : "password"}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl outline-none"
          />
          <span
            className="absolute right-4 top-[45px] cursor-pointer text-gray-600"
            onClick={() => setShow(!show)}
          >
            {show ? <FiEyeOff size={22} /> : <FiEye size={22} />}
          </span>
        </div>

        {/* Password Again */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 font-medium mb-1">
            Nhập lại mật khẩu
          </label>
          <input
            type={show2 ? "text" : "password"}
            value={pass2}
            onChange={(e) => setPass2(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl outline-none"
          />
          <span
            className="absolute right-4 top-[45px] cursor-pointer text-gray-600"
            onClick={() => setShow2(!show2)}
          >
            {show2 ? <FiEyeOff size={22} /> : <FiEye size={22} />}
          </span>
        </div>

        <button
          onClick={handleReset}
          className="w-full bg-[#1c7c76] hover:bg-[#166662] text-white py-3 rounded-xl font-semibold shadow-md transition"
        >
          Đặt lại mật khẩu
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
