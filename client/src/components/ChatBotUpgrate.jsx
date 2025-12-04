import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  LuSettings, LuHammer, LuArrowLeft, LuRefreshCcw, 
  LuServer, LuShieldCheck, LuDatabase, LuCpu 
} from "react-icons/lu";

export default function MaintenancePage() {
  
  // Danh sách các trạng thái giả lập để hiển thị
  const statusMessages = [
    { text: "Đang kết nối đến máy chủ dữ liệu...", icon: <LuServer /> },
    { text: "Đang tối ưu hóa các thuật toán AI...", icon: <LuCpu /> },
    { text: "Đang kiểm tra bảo mật hệ thống...", icon: <LuShieldCheck /> },
    { text: "Đang dọn dẹp bộ nhớ đệm...", icon: <LuDatabase /> },
    { text: "Đang cập nhật giao diện người dùng...", icon: <LuSettings /> },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Hiệu ứng chuyển đổi status mỗi 2.5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % statusMessages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 8, // Quay chậm hơn cho điềm tĩnh
    repeat: Infinity
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center px-4 bg-white from-slate-50 to-gray-100 relative overflow-hidden">
      
      {/* ===== BACKGROUND DECOR ===== */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-96 h-96 bg-[#1c7c76] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-[20%] -right-[10%] w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-8 md:p-12 max-w-lg w-full text-center"
      >
        
        {/* Animated Main Icon */}
        <div className="relative flex justify-center items-center mb-8">
            {/* Vòng lan tỏa (Pulse effect) thay vì thanh loading */}
            <span className="absolute inline-flex h-32 w-32 rounded-full bg-teal-400 opacity-20 animate-ping"></span>
            <div className="absolute w-28 h-28 bg-teal-50 rounded-full"></div>
            
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={spinTransition}
              className="relative z-10 text-[#1c7c76] text-6xl"
            >
              <LuSettings />
            </motion.div>

            {/* Icon búa nhỏ trang trí */}
            <motion.div 
              animate={{ rotate: [0, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -right-1 -top-1 text-orange-400 text-2xl z-20 bg-white rounded-full p-1 shadow-sm"
            >
              <LuHammer />
            </motion.div>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-800 mb-3 font-outfit">
          Đang Nâng Cấp Hệ Thống
        </h1>
        
        <p className="text-gray-500 mb-8">
          Chúng tôi đang thực hiện một số cải tiến quan trọng.
          <br/>
          Vui lòng quay lại sau ít phút.
        </p>

        {/* ===== THAY THẾ THANH LOADING Ở ĐÂY ===== */}
        {/* Khu vực hiển thị trạng thái "AI đang làm việc" */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-8 border border-gray-100 flex items-center justify-center min-h-[60px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 text-[#1c7c76] font-medium text-sm md:text-base"
            >
              <span className="text-xl">{statusMessages[currentIndex].icon}</span>
              {statusMessages[currentIndex].text}
            </motion.div>
          </AnimatePresence>
          
          {/* Hiệu ứng 3 chấm nhảy nhảy (Typing dots) */}
          <div className="absolute bottom-1 right-3 flex gap-1">
             <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} className="w-1 h-1 bg-teal-300 rounded-full"></motion.span>
             <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} className="w-1 h-1 bg-teal-300 rounded-full"></motion.span>
             <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} className="w-1 h-1 bg-teal-300 rounded-full"></motion.span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => window.location.reload()} 
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#1c7c76] text-white rounded-xl font-semibold hover:bg-[#15635e] hover:shadow-lg transition-all shadow-md active:scale-95"
          >
            <LuRefreshCcw />
            Kiểm tra trạng thái
          </button>
          
          <Link to="/" className="w-full">
            <button className="flex items-center justify-center gap-2 w-full py-3.5 bg-transparent text-gray-500 rounded-xl font-medium hover:bg-gray-50 hover:text-[#1c7c76] transition-all">
              <LuArrowLeft />
              Quay về trang chủ
            </button>
          </Link>
        </div>

      </motion.div>
    </section>
  );
}