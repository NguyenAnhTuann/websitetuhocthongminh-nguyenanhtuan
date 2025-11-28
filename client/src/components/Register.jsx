import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [fullNameError, setFullNameError] = useState("");
  const [schoolError, setSchoolError] = useState("");
  const [gradeError, setGradeError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dobError, setDobError] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [msgType, setMsgType] = useState("");




  useEffect(() => {
    if (day && month && year) {
      const formatted = `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
      setDob(formatted);
    }
  }, [day, month, year]);

  // Kiểm tra độ khớp mật khẩu
  useEffect(() => {
    if (!passAgain) {
      setMatchStatus(""); // chưa nhập gì
    } else if (passAgain && passAgain !== pass) {
      setMatchStatus("no"); // không khớp
    } else if (pass.length > 0 && pass === passAgain) {
      setMatchStatus("yes"); // khớp
    }
  }, [pass, passAgain]);



  const [msg, setMsg] = useState("");
  const [strength, setStrength] = useState(null);
  const [matchStatus, setMatchStatus] = useState("");



  // Đánh giá độ mạnh mật khẩu
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


  const handleRegister = async () => {
    let hasError = false;

    // --- KIỂM TRA LẠI TOÀN BỘ CÁC INPUT ---
    if (!fullName.trim()) {
      setFullNameError("Họ tên không được để trống!");
      hasError = true;
    }

    // KIỂM TRA NGÀY SINH
    if (!day || !month || !year) {
      setDobError("Vui lòng chọn đầy đủ ngày - tháng - năm!");
      hasError = true;
    } else {
      setDobError("");
    }



    if (!school.trim()) {
      setSchoolError("Tên trường không được để trống!");
      hasError = true;
    }

    if (!grade.trim()) {
      setGradeError("Vui lòng nhập tên lớp!");
      hasError = true;
    }

    if (!phone.trim()) {
      setPhoneError("Vui lòng nhập số điện thoại!");
      hasError = true;
    } else if (phone.length !== 10) {
      setPhoneError("Số điện thoại phải đúng 10 số!");
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Email không được để trống!");
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setEmailError("Email không hợp lệ!");
      hasError = true;
    }

    if (hasError) {
      setMsg("Vui lòng sửa các lỗi bên dưới!");
      setMsgType("error");
      return;
    }

    // --- KIỂM TRA MẬT KHẨU ---
    if (pass !== passAgain) {
      setMsg("Mật khẩu nhập lại không khớp!");
      setMsgType("error");
      return;
    }

    const strongPass =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!strongPass.test(pass)) {
      setMsg("Mật khẩu phải tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt!");
      setMsgType("error");
      return;
    }

    // --- TIẾP TỤC GỬI API ---
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

      if (!res.ok) {
        setMsg(data.message || "Đăng ký thất bại!");
        setMsgType("error");
        return;
      }

      setMsg("Tạo tài khoản thành công!");
      setMsgType("success");
      resetForm();


    } catch (err) {
      setMsg("Lỗi kết nối với hệ thóng!");
      setMsgType("error");

    }
  };
  const resetForm = () => {
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

    setDay("");
    setMonth("");
    setYear("");

    setFullNameError("");
    setSchoolError("");
    setGradeError("");
    setPhoneError("");
    setEmailError("");
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
            onChange={(e) => {
              const value = e.target.value;
              setFullName(value);

              if (!value.trim()) setFullNameError("Họ tên không được để trống!");
              else if (value.length < 2) setFullNameError("Họ tên quá ngắn!");
              else setFullNameError("");
            }}
            placeholder="Nhập họ tên..."
            className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#1c7c76]"
          />
          {fullNameError && (
            <p className="text-sm mt-1 font-medium text-red-500">{fullNameError}</p>
          )}
        </div>


        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Ngày sinh
          </label>

          <div className="grid grid-cols-3 gap-3">

            {/* Ngày */}
            <div className="relative">
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full appearance-none px-4 py-3 border rounded-xl outline-none 
                 focus:border-[#1c7c76] bg-white text-gray-700"
              >
                <option value="">Ngày</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              {/* Icon dropdown */}
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                ▼
              </span>
            </div>

            {/* Tháng */}
            <div className="relative">
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full appearance-none px-4 py-3 border rounded-xl outline-none 
                 focus:border-[#1c7c76] bg-white text-gray-700"
              >
                <option value="">Tháng</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>

              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                ▼
              </span>
            </div>

            {/* Năm */}
            <div className="relative">
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full appearance-none px-4 py-3 border rounded-xl outline-none 
                 focus:border-[#1c7c76] bg-white text-gray-700"
              >
                <option value="">Năm</option>
                {Array.from({ length: 30 }, (_, i) => 2025 - i).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>

              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                ▼
              </span>
            </div>

          </div>


          {dobError && (
            <p className="text-sm mt-1 font-medium text-red-500">{dobError}</p>
          )}

        </div>




        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Trường học</label>
          <input
            type="text"
            value={school}
            onChange={(e) => {
              const value = e.target.value;
              setSchool(value);

              if (!value.trim()) setSchoolError("Tên trường không được trống!");
              else setSchoolError("");
            }}
            placeholder="Nhập tên trường..."
            className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#1c7c76]"
          />
          {schoolError && (
            <p className="text-sm mt-1 font-medium text-red-500">{schoolError}</p>
          )}
        </div>



        {/* GRADE */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Lớp</label>
          <input
            type="text"
            value={grade}
            onChange={(e) => {
              const value = e.target.value;
              setGrade(value);

              if (!value.trim()) setGradeError("Vui lòng nhập tên lớp!");
              else setGradeError("");
            }}
            placeholder="10A1"
            className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#1c7c76]"
          />
          {gradeError && (
            <p className="text-sm mt-1 font-medium text-red-500">{gradeError}</p>
          )}
        </div>


        {/* PHONE */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Số điện thoại</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, "");
              setPhone(v);

              if (v.length !== 10) setPhoneError("Số điện thoại phải đúng 10 số!");
              else setPhoneError("");
            }}

            placeholder="Nhập số điện thoại..."
            className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#1c7c76]"
          />
          {phoneError && (
            <p className="text-sm mt-1 font-medium text-red-500">{phoneError}</p>
          )}

        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              const v = e.target.value;
              setEmail(v);

              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

              if (!emailRegex.test(v)) setEmailError("Email không hợp lệ!");
              else setEmailError("");
            }}

            placeholder="Nhập email..."
            className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#1c7c76]"
          />
          {emailError && (
            <p className="text-sm mt-1 font-medium text-red-500">{emailError}</p>
          )}

        </div>

        {/* PASSWORD */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 font-medium mb-1">Mật khẩu</label>

          <input
            type={showPass ? "text" : "password"}
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
              setStrength(checkStrength(e.target.value));
            }}
            placeholder="Tạo mật khẩu..."
            className="w-full px-4 py-3 border rounded-xl outline-none focus:border-[#1c7c76]"
          />

          {pass && strength && (
            <div className="mt-2">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${strength.color} ${strength.width} transition-all duration-300`}
                ></div>
              </div>
              <p className="text-sm mt-1 font-medium text-gray-700">{strength.label}</p>
            </div>
          )}



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

          {matchStatus === "no" && (
            <p className="c">
              ❌ Mật khẩu không khớp
            </p>
          )}

          {matchStatus === "yes" && (
            <p className="text-sm mt-1 font-medium text-green-600">
              ✔ Mật khẩu khớp
            </p>
          )}

          {matchStatus === "" && passAgain.length > 0 && (
            <p className="text-sm mt-1 font-medium text-gray-500">
              ...Đang kiểm tra
            </p>
          )}


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


      {msg && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.6, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-white w-[88%] max-w-sm p-7 rounded-3xl shadow-xl text-center relative"
          >

            {/* ICON */}
            <div className="flex justify-center mb-4">
              {msgType === "success" ? (
                <img
                  src="/done.png"
                  alt="success"
                  className="w-24 h-24 drop-shadow-xl"
                />
              ) : (
                <img
                  src="/error.png"
                  alt="error"
                  className="w-24 h-24 drop-shadow-xl"
                />
              )}
            </div>

            {/* MESSAGE */}
            <p
              className={`text-lg leading-relaxed ${msgType === "success"
                  ? "text-[#1c7c76] font-bold"
                  : "text-red-600 font-semibold"
                }`}
            >
              {msg}
            </p>

            {/* BUTTON */}
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
