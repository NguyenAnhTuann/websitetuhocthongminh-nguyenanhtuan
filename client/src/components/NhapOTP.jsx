import { motion } from "framer-motion";
import { useState } from "react";

export default function NhapOTP() {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");


  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };



  const handleResendOTP = async () => {
    setMsg(""); // tắt popup cũ

    const res = await fetch(
      "https://websitetuhocthongminh-nguyenanhtuan.onrender.com/api/auth/quenmatkhau",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();

    if (!data.success) {
      setMsg(data.message);
      setMsgType("error");
      return;
    }

    // Reset lại các ô nhập OTP
    setCode(["", "", "", "", "", ""]);

    setMsg("Đã gửi lại mã OTP mới!");
    setMsgType("success");

    // Flow vẫn ở bước 1
    localStorage.setItem("reset_step", "otp_sent");
  };




  const handleVerify = async () => {
    const otp = code.join("");
    if (otp.length !== 6) {
      setMsg("Mã OTP phải gồm 6 số!");
      setMsgType("error");
      return;
    }


    const res = await fetch("https://websitetuhocthongminh-nguyenanhtuan.onrender.com/api/auth/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code: otp }),
    });

    const data = await res.json();

    if (!data.success) {
      setMsg(data.message);
      setMsgType("error");
      return;
    }

    setMsg("Xác thực OTP thành công!");
    setMsgType("success");

    localStorage.setItem("reset_step", "otp_verified");


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
        className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-6 sm:p-8"
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
          <div className="grid grid-cols-6 gap-2 sm:gap-3 mb-6">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="
        w-full h-12 sm:h-14 text-center text-xl sm:text-2xl font-bold 
        border rounded-xl outline-none
        focus:border-[#1c7c76] focus:ring-2 focus:ring-[#1c7c76]/40
        transition bg-gray-50
      "
              />
            ))}
          </div>


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
              className={`text-lg leading-relaxed ${msgType === "success"
                ? "text-[#1c7c76] font-bold"
                : "text-red-600 font-semibold"
                }`}
            >
              {msg}
            </p>

            {msgType === "error" && (
              <button
                onClick={handleResendOTP}
                className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-2xl font-semibold shadow-md transition"
              >
                Gửi lại mã OTP
              </button>
            )}

            <button
              onClick={() => setMsg("")}
              className="mt-3 w-full bg-[#1c7c76] hover:bg-[#166662] text-white py-3 rounded-2xl font-semibold shadow-md transition"
            >
              Đóng
            </button>



          </motion.div>
        </div>
      )}
    </section>
  );
}
