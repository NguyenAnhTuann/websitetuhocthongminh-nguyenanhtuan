import { useState } from "react"; // [1] Thêm useState
import { motion, AnimatePresence } from "framer-motion"; // [1] Thêm AnimatePresence
import { Link } from "react-router-dom";
// Import các icon
import {
  LuCalculator, LuBookOpen, LuLanguages, LuAtom, LuFlaskConical,
  LuLeaf, LuGlobe, LuHourglass, LuMonitor, LuCpu,
  LuShield, LuDumbbell, LuCompass, LuScale, LuSparkles, 
  LuLock, LuX, LuLogIn // [1] Thêm icon X và Login
} from "react-icons/lu";

export default function ChatBotHub() {
  // State quản lý Modal thông báo đăng nhập
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Danh sách đầy đủ
  const allSubjects = [
    {
      name: "Dùng Thử AI",
      link: "/ChatTest",
      icon: <LuSparkles />,
      desc: "Trải nghiệm ngay (Không cần đăng nhập)"
    },
    { name: "Toán", link: "/chatbot/toan", icon: <LuCalculator />, desc: "Đại số, Hình học" },
    { name: "Ngữ Văn", link: "/chatbot/nguvan", icon: <LuBookOpen />, desc: "Phân tích, Soạn bài" },
    { name: "Tiếng Anh", link: "/chatbot/tienganh", icon: <LuLanguages />, desc: "Từ vựng, Ngữ pháp" },
    { name: "Vật Lý", link: "/chatbot/vatly", icon: <LuAtom />, desc: "Cơ, Nhiệt, Điện" },
    { name: "Hoá Học", link: "/chatbot/hoahoc", icon: <LuFlaskConical />, desc: "Hữu cơ, Vô cơ" },
    { name: "Sinh Học", link: "/chatbot/sinhhoc", icon: <LuLeaf />, desc: "Di truyền, Sinh thái" },
    { name: "Địa Lý", link: "/chatbot/dialy", icon: <LuGlobe />, desc: "Tự nhiên, Kinh tế" },
    { name: "Lịch Sử", link: "/chatbot/lichsu", icon: <LuHourglass />, desc: "Việt Nam, Thế giới" },
    { name: "Tin Học", link: "/chatbot/tinhoc", icon: <LuMonitor />, desc: "Lập trình, Office" },
    { name: "Công Nghệ", link: "/chatbot/congnghe", icon: <LuCpu />, desc: "Kỹ thuật, Trồng trọt" },
    { name: "Quốc Phòng", link: "/chatbot/quocphong", icon: <LuShield />, desc: "An ninh, Quân sự" },
    { name: "Thể Dục", link: "/chatbot/theduc", icon: <LuDumbbell />, desc: "Vận động, Sức khỏe" },
    { name: "Hướng Nghiệp", link: "/chatbot/huongnghiep", icon: <LuCompass />, desc: "Tư vấn chọn nghề" },
    { name: "Kinh Tế – PL", link: "/chatbot/kinhtephapluat", icon: <LuScale />, desc: "Luật, Tài chính" },
  ];

  const testSubject = allSubjects[0];
  const mainSubjects = allSubjects.slice(1);
  const isLoggedIn = localStorage.getItem("token");

  // Hàm render Card
  const renderCard = (item, isFeatured = false) => {
    // Logic khóa
    const isLocked = !isLoggedIn && item.link !== "/ChatTest";

    // [2] QUAN TRỌNG: Chọn thẻ bao bọc (Wrapper)
    // Nếu bị khóa -> Dùng 'div' để hứng sự kiện click mở Modal
    // Nếu không khóa -> Dùng 'Link' để chuyển trang
    const Component = isLocked ? "div" : Link;
    
    // Props tương ứng
    const props = isLocked 
      ? { onClick: () => setShowLoginModal(true) } 
      : { to: item.link };

    return (
      <Component
        {...props}
        className={`group relative flex flex-col items-center p-6 bg-white rounded-2xl border shadow-sm transition-all duration-300 h-full overflow-hidden cursor-pointer
          ${isLocked
            ? "border-gray-200 opacity-70 hover:shadow-none" // Bỏ cursor-not-allowed để người dùng biết là bấm được
            : "border-[#1c7c76]/50 hover:shadow-xl hover:border-[#1c7c76]/30"
          }
          ${isFeatured ? "ring-4 ring-[#1c7c76]/10 scale-105 hover:scale-110" : ""} 
        `}
      >
        {isLocked && (
          <div className="absolute top-3 right-3 text-gray-400 bg-gray-100 p-2 rounded-full z-20">
            <LuLock size={20} />
          </div>
        )}

        {!isLocked && (
          <div className="absolute inset-0 bg-[#1c7c76] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
        )}

        <div className={`w-14 h-14 mb-4 rounded-xl flex items-center justify-center text-3xl transition-all duration-300 shadow-inner
          ${isLocked
            ? "bg-gray-100 text-gray-400"
            : isFeatured 
              ? "bg-gradient-to-tr from-yellow-400 to-orange-500 text-white"
              : "bg-teal-50 text-[#1c7c76] group-hover:scale-110 group-hover:bg-[#1c7c76] group-hover:text-white"
          }`}>
          {item.icon}
        </div>

        <h3 className={`text-lg font-bold transition-colors ${isFeatured ? "text-orange-600" : "text-gray-800"}`}>
          {item.name}
        </h3>
        <p className="text-xs text-gray-400 mt-1 text-center font-medium">
          {item.desc}
        </p>

        {!isLocked && (
          <div className={`mt-4 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-sm font-semibold flex items-center gap-1
             ${isFeatured ? "text-orange-500" : "text-[#1c7c76]"}`}>
            Bắt đầu <span>→</span>
          </div>
        )}

        {isLocked && (
          <div className="mt-4 text-xs font-semibold text-red-400 flex items-center gap-1">
            <LuLock size={12} /> Cần đăng nhập
          </div>
        )}
      </Component>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center px-4 py-16 bg-white from-slate-50 to-gray-100 relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-96 h-96 bg-[#1c7c76] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-[20%] -right-[10%] w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 z-10 relative"
      >
        <h1 className="mt-6 md:mt-10 mx-auto text-center block text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-outfit bg-[#1c7c76] px-6 py-4 rounded-2xl shadow-sm">
          TRỢ LÍ HỌC TẬP AI CHATBOT
        </h1>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto text-lg">
          Chọn môn học bạn cần hỗ trợ. Hệ thống AI sẽ giải đáp thắc mắc,
          hướng dẫn giải bài tập và ôn thi 24/7.
        </p>
      </motion.div>

      {/* Dùng thử */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-xs md:max-w-sm mb-10 z-10 relative flex justify-center"
      >
        <div className="w-full">
           {renderCard(testSubject, true)}
        </div>
      </motion.div>

      {/* Grid Môn Học */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 z-10 relative"
      >
        {mainSubjects.map((item) => (
          <motion.div key={item.link} variants={itemVariants}>
            {renderCard(item)}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 text-center text-gray-400 text-sm"
      >
        © 2025 TuHocThongMinh AI. Powered by Advanced Language Models.
      </motion.div>


      {/* [3] --- MODAL YÊU CẦU ĐĂNG NHẬP --- */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
            
            {/* Lớp nền đen làm mờ */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            ></motion.div>

            {/* Hộp thông báo */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl z-10 text-center"
            >
              {/* Nút đóng */}
              <button 
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <LuX size={24} />
              </button>

              {/* Icon */}
              <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <LuLock size={40} />
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Yêu cầu đăng nhập
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Tính năng ChatBot chuyên sâu này dành riêng cho thành viên. 
                Vui lòng đăng nhập để mở khóa toàn bộ 13 môn học.
              </p>

              <div className="flex flex-col gap-3">
                <Link 
                  to="/dangnhap" 
                  className="w-full py-3.5 bg-[#1c7c76] text-white rounded-xl font-bold text-lg hover:bg-[#155f5b] transition-all shadow-lg shadow-[#1c7c76]/30 flex items-center justify-center gap-2"
                >
                  <LuLogIn size={20} />
                  Đăng nhập ngay
                </Link>
                
                <button 
                  onClick={() => setShowLoginModal(false)}
                  className="w-full py-3.5 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Để sau
                </button>
              </div>
              
              <p className="mt-6 text-sm text-gray-400">
                Chưa có tài khoản? <Link to="/dangky" className="text-[#1c7c76] hover:underline font-semibold">Đăng ký miễn phí</Link>
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}