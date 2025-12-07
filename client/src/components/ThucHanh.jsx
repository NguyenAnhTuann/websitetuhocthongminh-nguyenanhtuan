import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// Import bộ icon từ thư viện react-icons/lu
import { 
  LuCalculator, LuBookOpen, LuLanguages, LuAtom, LuFlaskConical, 
  LuLeaf, LuGlobe, LuHourglass, LuMonitor, LuCpu, 
  LuCompass, LuScale, 
  LuBrainCircuit,   // Icon cho Tương tác kỹ năng
  LuFileSignature,  // ĐÃ SỬA: Thay LuFileEdit bằng LuFileSignature
  LuLayers          // Icon cho Mô phỏng
} from "react-icons/lu";

export default function ThucHanh() {
  
  // Cấu hình danh sách các mục hiển thị
  const items = [
    // --- 3 MỤC MỚI (ƯU TIÊN HIỂN THỊ ĐẦU) ---
    { 
      name: "Tương tác kỹ năng", 
      link: "/thuchanh/kynang", // Bạn sẽ điền link thật sau
      icon: <LuBrainCircuit />, 
      desc: "Xử lý tình huống, Kỹ năng mềm",
      highlight: true // Đánh dấu để hiển thị màu khác biệt
    },
    { 
      name: "Tương tác bài tập", 
      link: "/thuchanh/baitap", 
      icon: <LuFileSignature />, // ĐÃ SỬA: Dùng icon mới
      desc: "Luyện tập, Trắc nghiệm",
      highlight: true
    },
    { 
      name: "Mô phỏng", 
      link: "/thuchanh/mophong", 
      icon: <LuLayers />, 
      desc: "Mô hình trực quan, Đồ thị",
      highlight: true
    },

    // --- CÁC MÔN HỌC (Đã bỏ Thể Dục & Quốc Phòng) ---
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
    { name: "Hướng Nghiệp", link: "/chatbot/huongnghiep", icon: <LuCompass />, desc: "Tư vấn chọn nghề" },
    { name: "Kinh Tế – PL", link: "/chatbot/kinhtephapluat", icon: <LuScale />, desc: "Luật, Tài chính" },
  ];

  // Hiệu ứng xuất hiện
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center px-4 py-16 bg-white from-slate-50 to-gray-100 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-96 h-96 bg-[#1c7c76] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-[20%] -right-[10%] w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      {/* ===== HERO SECTION ===== */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 z-10 relative"
      >
        <h1 className="mt-6 md:mt-10 mx-auto text-center block
             text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-outfit
             bg-[#1c7c76] px-6 py-4 rounded-2xl shadow-sm">
          THỰC HÀNH & MÔ PHỎNG
        </h1>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg bg-white/80 backdrop-blur-sm p-2 rounded-lg">
          Không gian rèn luyện kỹ năng, tương tác bài tập thực tế và trải nghiệm các mô hình mô phỏng trực quan.
        </p>
      </motion.div>

      {/* ===== GRID DANH SÁCH ===== */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 z-10 relative"
      >
        {items.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Link
              to={item.link}
              className={`group relative flex flex-col items-center p-6 bg-white rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 h-full overflow-hidden
                ${item.highlight 
                  ? "border-[#1c7c76] shadow-md ring-1 ring-[#1c7c76]/20" 
                  : "border-gray-200 hover:border-[#1c7c76]/30"
                }
              `}
            >
              {/* Hiệu ứng hover nền */}
              <div className="absolute inset-0 bg-[#1c7c76] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>

              {/* Icon Container */}
              <div className={`w-14 h-14 mb-4 rounded-xl flex items-center justify-center text-3xl transition-all duration-300 shadow-inner
                ${item.highlight
                  ? "bg-[#1c7c76] text-white group-hover:scale-110"
                  : "bg-teal-50 text-[#1c7c76] group-hover:bg-[#1c7c76] group-hover:text-white group-hover:scale-110"
                }
              `}>
                {item.icon}
              </div>

              {/* Tên mục */}
              <h3 className={`text-lg font-bold transition-colors text-center
                ${item.highlight ? "text-[#1c7c76]" : "text-gray-800 group-hover:text-[#1c7c76]"}
              `}>
                {item.name}
              </h3>

              {/* Mô tả ngắn */}
              <p className="text-xs text-gray-400 mt-1 text-center font-medium">
                {item.desc}
              </p>

              {/* Mũi tên chỉ hiện khi hover */}
              <div className="mt-4 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-[#1c7c76] text-sm font-semibold flex items-center gap-1">
                Truy cập <span>→</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* ===== FOOTER ===== */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 text-center text-gray-400 text-sm"
      >
        © 2025 TuHocThongMinh AI. Powered by Advanced Language Models.
      </motion.div>

    </section>
  );
}