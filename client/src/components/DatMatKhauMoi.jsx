import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function DatMatKhauMoi({ email, onNext }) {


  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [loading, setLoading] = useState(false);   // ⭐ THÊM Ở ĐÂY


  const [strength, setStrength] = useState(null);
  const [matchStatus, setMatchStatus] = useState("");

  // 🎯 CHECK MATCH
  useEffect(() => {
    if (!pass2) setMatchStatus("");
    else if (pass !== pass2) setMatchStatus("no");
    else setMatchStatus("yes");
  }, [pass, pass2]);

  // 🎯 CHECK STRENGTH
  const checkStrength = (password) => {
    let score = 0;

    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;

    if (score <= 2) return { label: "Yếu", color: "bg-red-500", width: "w-1/4" };
    if (score <= 4) return { label: "Trung bình", color: "bg-yellow-500", width: "w-2/4" };
    if (score === 5) return { label: "Mạnh", color: "bg-blue-500", width: "w-3/4" };
    if (score === 6) return { label: "Cực mạnh", color: "bg-green-600", width: "w-full" };
  };

  const handleReset = async () => {
    setMsg("");

    const strongPass =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!strongPass.test(pass)) {
      setMsg("Mật khẩu phải tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt!");
      setMsgType("error");
      return;
    }

    if (pass !== pass2) {
      setMsg("Mật khẩu nhập lại không khớp!");
      setMsgType("error");
      return;
    }

      setLoading(true);   // ⭐ BẬT LOADING Ở ĐÂY


    const res = await fetch("https://websitetuhocthongminh-nguyenanhtuan.onrender.com/api/auth/datmatkhaumoi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword: pass }),
    });

    const data = await res.json();

      setLoading(false);  // ⭐ TẮT LOADING Ở ĐÂY


    if (!data.success) {
      setMsg(data.message);
      setMsgType("error");
      return;
    }

    setMsg("Đặt lại mật khẩu thành công!");
    setMsgType("success");

    localStorage.removeItem("reset_step");


    setTimeout(() => {
      window.location.href = "/dangnhap";
    }, 2000);
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
          Đặt Mật Khẩu Mới
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Mật khẩu mới cho tài khoản: <b>{email}</b>
        </p>

        {/* ===== PASSWORD ===== */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 font-medium mb-1">
            Mật khẩu mới
          </label>

          <input
            type={show ? "text" : "password"}
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
              setStrength(checkStrength(e.target.value));
            }}
            className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#1c7c76]"
          />

          <span
            className="absolute right-4 top-[45px] cursor-pointer text-gray-600"
            onClick={() => setShow(!show)}
          >
            {show ? <FiEyeOff size={22} /> : <FiEye size={22} />}
          </span>

          {pass && strength && (
            <div className="mt-2">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${strength.color} ${strength.width} transition-all duration-300`}
                ></div>
              </div>
              <p className="text-sm mt-1 font-medium text-gray-700">
                {strength.label}
              </p>
            </div>
          )}
        </div>

        {/* ===== PASSWORD AGAIN ===== */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 font-medium mb-1">
            Nhập lại mật khẩu
          </label>

          <input
            type={show2 ? "text" : "password"}
            value={pass2}
            onChange={(e) => setPass2(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#1c7c76]"
          />

          <span
            className="absolute right-4 top-[45px] cursor-pointer text-gray-600"
            onClick={() => setShow2(!show2)}
          >
            {show2 ? <FiEyeOff size={22} /> : <FiEye size={22} />}
          </span>

          {matchStatus === "no" && (
            <p className="text-sm text-red-500 mt-1 font-medium">
              ❌ Mật khẩu không khớp
            </p>
          )}

          {matchStatus === "yes" && (
            <p className="text-sm text-green-600 mt-1 font-medium">
              ✔ Mật khẩu khớp
            </p>
          )}
        </div>

        <button
          onClick={handleReset}
          className="w-full bg-[#1c7c76] hover:bg-[#166662] text-white py-3 rounded-xl font-semibold shadow-md transition"
        >
          Cập nhật mật khẩu
        </button>
      </motion.div>

      {/* POPUP MESSAGE */}
      {msg && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[500] pointer-events-auto">
          <motion.div
            initial={{ scale: 0.6, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-white w-[88%] max-w-sm p-7 rounded-3xl shadow-xl text-center"
          >
            <div className="flex justify-center mb-4">
              {msgType === "success" ? (
                <img src="/done.png" className="w-24 h-24 drop-shadow-xl" />
              ) : (
                <img src="/error.png" className="w-24 h-24 drop-shadow-xl" />
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
              onClick={() => setMsg("")}
              className="mt-6 w-full bg-[#1c7c76] hover:bg-[#166662] text-white py-3 rounded-2xl font-semibold shadow-md transition"
            >
              Đóng
            </button>
          </motion.div>
        </div>
      )}

      {loading && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[500] pointer-events-auto">
    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  </div>
)}

    </section>
  );
}
