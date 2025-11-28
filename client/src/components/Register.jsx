import { motion } from "framer-motion";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";



export default function Register() {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [pass, setPass] = useState("");
  const [passAgain, setPassAgain] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const [msg, setMsg] = useState("");

  const handleRegister = async () => {
    if (pass !== passAgain) {
      setMsg("❌ Mật khẩu nhập lại không khớp!");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMsg("❌ Email không hợp lệ!");
      window.scrollTo({ top: 0, behavior: "smooth" });

      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setMsg("❌ Số điện thoại phải gồm đúng 10 số!");
      window.scrollTo({ top: 0, behavior: "smooth" });

      return;
    }
    const strongPass =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!strongPass.test(pass)) {
      setMsg("❌ Mật khẩu phải tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt!");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }




    try {
      const res = await fetch("https://websitetuhocthongminh-nguyenanhtuan.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          dob,
          school,
          grade,
          phone,
          email,
          password: pass,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setMsg("❌ " + data.error);
        window.scrollTo({ top: 0, behavior: "smooth" });

      } else {
        setMsg("✅ Tạo tài khoản thành công!");
        window.scrollTo({ top: 0, behavior: "smooth" });

        // 🔥 Reset form
        setFullName("");
        setDob("");
        setSchool("");
        setGrade("");
        setPhone("");
        setEmail("");
        setPass("");
        setPassAgain("");
        setShowPass(false);
        setShowPass2(false);
      }

    } catch (err) {
      setMsg("❌ Lỗi kết nối server!");
      window.scrollTo({ top: 0, behavior: "smooth" });

    }
  };

  return (
    <section className="min-h-screen flex items-start justify-center bg-white px-4 pt-32 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8"
      >
        {/* HEADER */}
        <h1 className="text-3xl font-extrabold text-center mb-2 text-white bg-[#1c7c76] rounded-xl py-3">
          Đăng Ký Tài Khoản
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Tạo tài khoản mới để bắt đầu học tập hiệu quả hơn.
        </p>

        {msg && (
          <p
            className={`text-center mb-4 ${msg.includes("✅") ? "text-green-600" : "text-red-600"
              }`}
          >
            {msg}
          </p>
        )}


        {/* FULL NAME */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Họ và tên</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nhập họ tên..."
            className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#1c7c76]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Ngày sinh</label>

          <input
            type="text"
            value={dob}
            onChange={(e) => {
              let v = e.target.value.replace(/\D/g, ""); // chỉ giữ số

              // tự thêm dấu "/"
              if (v.length > 2 && v.length <= 4) {
                v = v.replace(/(\d{2})(\d{1,2})/, "$1/$2");
              } else if (v.length > 4) {
                v = v.replace(/(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3");
              }

              const parts = v.split("/");

              if (parts[0]) {
                let day = parseInt(parts[0]);
                if (day > 31) day = 31;
                if (day < 1) day = 1;
                parts[0] = day.toString().padStart(2, "0");
              }

              if (parts[1]) {
                let month = parseInt(parts[1]);
                if (month > 12) month = 12;
                if (month < 1) month = 1;
                parts[1] = month.toString().padStart(2, "0");
              }

              if (parts[2]?.length === 4) {
                let year = parseInt(parts[2]);
                if (year < 1900) year = 1900;
                if (year > 2025) year = 2025;
                parts[2] = year.toString();
              }

              setDob(parts.join("/"));
            }}
            placeholder="VD: 12/08/2008"
            className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#1c7c76]"
          />
        </div>



        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Trường học</label>
          <input
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            placeholder="Nhập tên trường..."
            className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#1c7c76]"
          />
        </div>

        {/* GRADE */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Lớp</label>
          <input
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="Ví dụ: 10A1"
            className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#1c7c76]"
          />
        </div>

        {/* PHONE */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Số điện thoại</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Nhập số điện thoại..."
            className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#1c7c76]"
          />
        </div>

        {/* EMAIL */}
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

        {/* PASSWORD */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 font-medium mb-1">Mật khẩu</label>

          <input
            type={showPass ? "text" : "password"}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Tạo mật khẩu..."
            className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#1c7c76]"
          />

          <span
            className="absolute right-4 top-[45px] text-gray-600 cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <FiEyeOff size={22} /> : <FiEye size={22} />}
          </span>
        </div>


        {/* PASSWORD AGAIN */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 font-medium mb-1">Nhập lại mật khẩu</label>

          <input
            type={showPass2 ? "text" : "password"}
            value={passAgain}
            onChange={(e) => setPassAgain(e.target.value)}
            placeholder="Nhập lại mật khẩu..."
            className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#1c7c76]"
          />

          <span
            className="absolute right-4 top-[45px] text-gray-600 cursor-pointer"
            onClick={() => setShowPass2(!showPass2)}
          >
            {showPass2 ? <FiEyeOff size={22} /> : <FiEye size={22} />}
          </span>
        </div>


        {/* REGISTER BUTTON */}
        <button
          onClick={handleRegister}
          className="w-full bg-[#1c7c76] hover:bg-[#166662] text-white py-3 rounded-xl font-semibold shadow-md transition"
        >
          Tạo tài khoản
        </button>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Đã có tài khoản?
          <a href="/dangnhap" className="text-[#1c7c76] font-medium underline"> Đăng nhập</a>
        </p>
      </motion.div>
    </section>
  );
}
