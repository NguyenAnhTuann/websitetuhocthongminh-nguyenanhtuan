import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// Import các icon phù hợp từ thư viện react-icons
import { 
  LuCalculator, LuBookOpen, LuLanguages, LuAtom, LuFlaskConical, 
  LuLeaf, LuGlobe, LuHourglass, LuMonitor, LuCpu, 
  LuShield, LuDumbbell, LuCompass, LuScale 
} from "react-icons/lu";

export default function ChatBotHub() {
  // Danh sách môn học kèm Icon và Màu sắc (nếu muốn colorful hơn)
  const subjects = [
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

  // Cấu hình hiệu ứng xuất hiện lần lượt
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // Mỗi item hiện cách nhau 0.1s
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center px-4 py-16 bg-white from-slate-50 to-gray-100 relative overflow-hidden">
      
      {/* Background Decor (Trang trí nền) */}
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
        <h1 className=" mt-6 md:mt-10 mx-auto text-center block
             text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-outfit
             bg-[#1c7c76] px-6 py-4 rounded-2xl shadow-sm">
          Trợ Lý Học Tập <span className="text-white">AI ChatBot</span>
        </h1>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto text-lg">
          Chọn môn học bạn cần hỗ trợ. Hệ thống AI sẽ giải đáp thắc mắc, 
          hướng dẫn giải bài tập và ôn thi 24/7.
        </p>
      </motion.div>

      {/* ===== GRID DANH SÁCH MÔN ===== */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 z-10 relative"
      >
        {subjects.map((item) => (
          <motion.div key={item.link} variants={itemVariants}>
            <Link
              to={item.link}
              className="group relative flex flex-col items-center p-6 bg-white rounded-2xl border border-[#1c7c76]/50 shadow-sm hover:shadow-xl hover:border-[#1c7c76]/30 transition-all duration-300 h-full overflow-hidden"
            >
              {/* Hiệu ứng hover background */}
              <div className="absolute inset-0 bg-[#1c7c76] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>

              {/* Icon Container */}
              <div className="w-14 h-14 mb-4 rounded-xl bg-teal-50 text-[#1c7c76] flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-[#1c7c76] group-hover:text-white transition-all duration-300 shadow-inner">
                {item.icon}
              </div>

              {/* Text Info */}
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#1c7c76] transition-colors">
                {item.name}
              </h3>
              <p className="text-xs text-gray-400 mt-1 text-center font-medium">
                {item.desc}
              </p>

              {/* Arrow Indicator (Chỉ hiện khi hover) */}
              <div className="mt-4 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-[#1c7c76] text-sm font-semibold flex items-center gap-1">
                Bắt đầu <span>→</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* ===== FOOTER NOTE ===== */}
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