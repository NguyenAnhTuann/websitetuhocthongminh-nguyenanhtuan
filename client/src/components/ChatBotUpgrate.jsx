import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Icon SVG Components (để không phụ thuộc thư viện ngoài)
const GearIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const LockIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

export default function ChatBotMaintenance() {
  // Giả lập thanh tiến trình (Progress Bar)
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 85) return 85; // Dừng ở 85% để chờ thực tế
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 85);
      });
    }, 800);

    return () => clearInterval(timer);
  }, []);

  const subjects = [
    { name: "Toán", link: "/chatbot/toan" },
    { name: "Ngữ Văn", link: "/chatbot/nguvan" },
    { name: "Tiếng Anh", link: "/chatbot/tienganh" },
    { name: "Vật Lý", link: "/chatbot/vatly" },
    { name: "Hoá Học", link: "/chatbot/hoahoc" },
    { name: "Sinh Học", link: "/chatbot/sinhhoc" },
    { name: "Địa Lý", link: "/chatbot/dialy" },
    { name: "Lịch Sử", link: "/chatbot/lichsu" },
    { name: "Tin Học", link: "/chatbot/tinhoc" },
    { name: "Công Nghệ", link: "/chatbot/congnghe" },
    { name: "Quốc Phòng", link: "/chatbot/quocphong" },
    { name: "Thể Dục", link: "/chatbot/theduc" },
    { name: "Hướng Nghiệp", link: "/chatbot/huongnghiep" },
    { name: "Kinh Tế – Pháp Luật", link: "/chatbot/kinhtephapluat" },
  ];

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 bg-gray-50 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
         <div className="absolute top-10 left-10 w-32 h-32 bg-[#1c7c76] rounded-full blur-3xl"></div>
         <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#1c7c76] rounded-full blur-3xl"></div>
      </div>

      {/* ===== HERO MAINTENANCE ===== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 z-10 max-w-2xl"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="text-[#1c7c76]"
          >
            <GearIcon className="w-20 h-20 md:w-24 md:h-24" />
          </motion.div>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-[#1c7c76] mb-4">
          Hệ thống đang nâng cấp
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Chúng tôi đang cập nhật AI ChatBot để thông minh hơn và phản hồi nhanh hơn. 
          <br className="hidden md:block"/> Vui lòng quay lại sau ít phút!
        </p>

        {/* Fake Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 overflow-hidden">
          <motion.div 
            className="bg-[#1c7c76] h-2.5 rounded-full" 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          ></motion.div>
        </div>
        <p className="text-xs text-gray-500 text-right font-mono">Loading modules... {Math.floor(progress)}%</p>
      </motion.div>

      {/* ===== DANH SÁCH MÔN HỌC (LOCKED STATE) ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-4xl"
      >
        <div className="flex items-center gap-2 mb-4 text-gray-500 font-semibold text-sm uppercase tracking-wide">
          <LockIcon className="w-4 h-4" /> Các tính năng đang bảo trì:
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {subjects.map((item) => (
            <div
              key={item.link}
              className="relative p-3 bg-white border border-gray-200 text-gray-400 rounded-xl shadow-sm text-center text-sm md:text-base cursor-not-allowed select-none overflow-hidden group"
            >
              {/* Overlay Lock Effect */}
              <div className="absolute inset-0 bg-gray-100/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <LockIcon className="w-5 h-5 text-gray-500" />
              </div>
              
              <span className="relative z-10 group-hover:blur-[1px] transition-all">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ===== FOOTER ACTION ===== */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12"
      >
        <Link 
          to="/" 
          className="px-8 py-3 bg-white border-2 border-[#1c7c76] text-[#1c7c76] font-bold rounded-full hover:bg-[#1c7c76] hover:text-white transition-all shadow-md"
        >
          Quay về Trang chủ
        </Link>
      </motion.div>

    </section>
  );
}