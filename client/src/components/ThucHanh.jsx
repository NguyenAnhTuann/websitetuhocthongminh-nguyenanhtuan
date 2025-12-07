import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
// Import icons
import {
  LuCalculator, LuBookOpen, LuLanguages, LuAtom, LuFlaskConical,
  LuLeaf, LuGlobe, LuHourglass, LuMonitor, LuCpu,
  LuCompass, LuScale, 
  LuBrainCircuit, // Icon cho Tương tác kỹ năng
  LuFileEdit,     // Icon cho Tương tác bài tập
  LuLayers,       // Icon cho Mô phỏng
  LuArrowLeft,    // Icon nút quay lại
  LuPlayCircle,   // Icon play cho link
  LuFileText      // Icon file
} from "react-icons/lu";

export default function ThucHanh() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // --- DỮ LIỆU CŨ (Giữ lại nội dung bài tập của bạn) ---
  const dataSkill = [
    { name: "Kỹ năng an toàn mạng – Công nghệ", link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-an-to-n-m-ng-l-p-10", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764143867/Gemini_Generated_Image_3vjfra3vjfra3vjf_f9epvh.png" },
    { name: "Phòng chống thiên tai", link: "https://nguyenthanhthan.my.canva.site/quiz-ph-ng-ch-ng-thi-n-tai", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764143866/Gemini_Generated_Image_ila2twila2twila2_vraszx.png" },
    { name: "Kỹ năng cá nhân", link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-k-n-ng-c-nh-n", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764143871/Gemini_Generated_Image_w37txew37txew37t_w8gses.png" },
    { name: "Kỹ năng giao tiếp – xã hội", link: "https://nguyenthanhthan.my.canva.site/quiz-k-n-ng-giao-ti-p-x-h-i", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764143866/Gemini_Generated_Image_9bb4qi9bb4qi9bb4_xpmq7v.png" },
    { name: "Kỹ năng an toàn – Sức khỏe", link: "https://nguyenthanhthan.my.canva.site/b-i-ki-m-tra-an-to-n-s-c-kh-e", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764143870/Gemini_Generated_Image_4raqgn4raqgn4raq_zgjhwe.png" },
    { name: "Kỹ năng định hướng và tư duy", link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-k-n-ng-n-ng", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764143865/Gemini_Generated_Image_4jjqsc4jjqsc4jjq_f5dgsm.png" }
  ];

  const dataSimulation = [
    { name: "Quy hoạch tuyến tính (BPT bậc nhất 2 ẩn)", link: "https://chatgpt.com/canvas/shared/68e9fe0251dc81918d64619b92e1da1b" },
    { name: "Hàm Số Bậc Hai", link: "https://chatgpt.com/canvas/shared/68fd811a91c881918c7b182c8698f1fd" },
    { name: "Hàm Số Bậc Ba", link: "https://chatgpt.com/canvas/shared/68ff8e127bb88191ac2262c3d9d1b26d" },
    { name: "Quy Hoạch Tuyến Tính (Nâng cao)", link: "https://chatgpt.com/canvas/shared/68ffa2452ac48191892c7f0efec6977b" },
    { name: "Hệ số a, b, c trong đồ thị", link: "https://chatgpt.com/canvas/shared/6902f506befc81918bb0d805f6778e09" },
    { name: "Dây neo thuyền & định lí Py-ta-go", link: "https://chatgpt.com/canvas/shared/6900de158f448191b192cb92de6d3056" }
  ];

  // Gộp chung các bài tập Toán 10, 11, 12 vào mục "Tương tác bài tập"
  const dataExercises = [
    { 
      group: "Toán 10", 
      items: [
        { name: "Giải phương trình bậc hai", link: "https://nguyenthanhthan.my.canva.site/gi-i-ph-ng-tr-nh-b-c-hai" },
        { name: "Mệnh đề và tập hợp", link: "https://nguyenthanhthan.my.canva.site/btrfj6548pzbsqqy" },
        { name: "Bất phương trình bậc nhất hai ẩn", link: "https://nguyenthanhthan.my.canva.site/btrfxg29jzj1k4ka" },
        { name: "Hàm số và đồ thị", link: "https://nguyenthanhthan.my.canva.site/btrh3zahbgta381h" },
        { name: "Véc-tơ và các phép toán", link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-tr-c-nghi-m-vecto" }
      ]
    },
    { 
      group: "Toán 11", 
      items: [
        { name: "Trung vị và Tứ phân vị", link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-tr-c-nghi-m-to-n-h-c" },
        { name: "Phương trình lượng giác cơ bản", link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-l-ng-gi-c-l-p-11" },
        { name: "Hàm Số Lượng Giác", link: "https://nguyenthanhthan.my.canva.site/quiz-h-m-s-l-ng-gi-c" }
      ]
    },
    { 
      group: "Toán 12", 
      items: [
        { name: "Tính đơn điệu và cực trị", link: "https://nguyenthanhthan.my.canva.site/b-i-ki-m-tra-to-n-l-p-12" },
        { name: "Đường Tiệm Cận", link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-to-n-ng-ti-m-c-n" },
        { name: "Tọa độ vectơ không gian", link: "https://nguyenthanhthan.my.canva.site/bv38q85w5z8qy4ts" }
      ]
    }
  ];

  // --- CẤU HÌNH MENU CHÍNH ---
  const menuItems = [
    // 3 Mục Mới (Được ưu tiên lên đầu hoặc vị trí nổi bật)
    { 
      id: "skill", 
      name: "Tương tác kỹ năng", 
      icon: <LuBrainCircuit />, 
      desc: "Xử lý tình huống, Kỹ năng mềm", 
      special: true, // Đánh dấu để xử lý click riêng
      color: "text-orange-500 bg-orange-50 border-orange-200"
    },
    { 
      id: "exercise", 
      name: "Tương tác bài tập", 
      icon: <LuFileEdit />, 
      desc: "Luyện tập Toán, Lý, Hóa...", 
      special: true,
      color: "text-blue-500 bg-blue-50 border-blue-200"
    },
    { 
      id: "simulation", 
      name: "Mô phỏng", 
      icon: <LuLayers />, 
      desc: "Mô hình trực quan, Đồ thị", 
      special: true,
      color: "text-purple-500 bg-purple-50 border-purple-200"
    },
    // Các môn học cơ bản (Giữ lại từ ChatBot nhưng bỏ Thể Dục/Quốc Phòng)
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // --- RENDER CHI TIẾT (KHI CLICK VÀO 3 MỤC MỚI) ---
  const renderDetailContent = () => {
    if (selectedCategory === "skill") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataSkill.map((item, idx) => (
            <a key={idx} href={item.link} target="_blank" rel="noreferrer" className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-40 overflow-hidden relative bg-gray-100">
                {item.thumbnail ? (
                  <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300"><LuBrainCircuit size={48} /></div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full text-[#1c7c76] opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  <LuPlayCircle size={24} />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-800 text-lg group-hover:text-[#1c7c76] transition-colors line-clamp-2">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-2 flex items-center gap-1"><LuFileText size={14} /> Bài tập tình huống</p>
              </div>
            </a>
          ))}
        </div>
      );
    }

    if (selectedCategory === "simulation") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataSimulation.map((item, idx) => (
            <a key={idx} href={item.link} target="_blank" rel="noreferrer" className="group flex flex-col bg-white rounded-2xl border border-purple-100 p-6 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-4 text-2xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <LuLayers />
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">{item.name}</h3>
              <p className="text-sm text-gray-500 mt-auto">Mô phỏng trực quan trên Canvas</p>
            </a>
          ))}
        </div>
      );
    }

    if (selectedCategory === "exercise") {
      return (
        <div className="space-y-8">
          {dataExercises.map((group, gIdx) => (
            <div key={gIdx} className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                {group.group}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.items.map((item, idx) => (
                  <a key={idx} href={item.link} target="_blank" rel="noreferrer" className="flex items-center p-4 rounded-xl bg-gray-50 hover:bg-blue-50 hover:text-blue-700 transition-colors group border border-transparent hover:border-blue-200">
                    <div className="mr-3 text-gray-400 group-hover:text-blue-500"><LuFileEdit /></div>
                    <span className="font-medium text-gray-700 group-hover:text-blue-700">{item.name}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }
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
          THỰC HÀNH KỸ NĂNG
        </h1>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg bg-white/80 backdrop-blur-sm p-2 rounded-lg">
          Luyện tập qua tình huống thực tế, rèn tư duy xử lý và ứng phó an toàn.
        </p>
      </motion.div>

      {/* ===== NỘI DUNG CHÍNH (SWITCH GIỮA GRID VÀ DETAIL) ===== */}
      <div className="w-full max-w-6xl z-10 relative min-h-[500px]">
        <AnimatePresence mode="wait">
          
          {/* VIEW 1: DANH SÁCH MENU (GRID) */}
          {!selectedCategory ? (
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {menuItems.map((item, index) => (
                <motion.div key={index} variants={itemVariants}>
                  {/* Nếu là mục đặc biệt (có logic riêng) */}
                  {item.special ? (
                    <div
                      onClick={() => setSelectedCategory(item.id)}
                      className={`cursor-pointer group relative flex flex-col items-center p-6 bg-white rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 h-full overflow-hidden ${item.color ? `border-l-4 ${item.color.split(' ')[2]}` : 'border-[#1c7c76]/50'}`}
                    >
                      <div className={`w-14 h-14 mb-4 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-all duration-300 shadow-inner ${item.color ? item.color.replace('border-', '') : 'bg-teal-50 text-[#1c7c76] group-hover:bg-[#1c7c76] group-hover:text-white'}`}>
                        {item.icon}
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#1c7c76] transition-colors text-center">{item.name}</h3>
                      <p className="text-xs text-gray-400 mt-1 text-center font-medium">{item.desc}</p>
                      <div className="mt-4 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-[#1c7c76] text-sm font-semibold flex items-center gap-1">
                        Khám phá <span>→</span>
                      </div>
                    </div>
                  ) : (
                    /* Nếu là mục thường (Router Link) */
                    <Link
                      to={item.link}
                      className="group relative flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#1c7c76]/30 transition-all duration-300 h-full overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-[#1c7c76] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                      <div className="w-14 h-14 mb-4 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-[#1c7c76] group-hover:text-white transition-all duration-300 shadow-inner">
                        {item.icon}
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#1c7c76] transition-colors">{item.name}</h3>
                      <p className="text-xs text-gray-400 mt-1 text-center font-medium">{item.desc}</p>
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* VIEW 2: CHI TIẾT NỘI DUNG */
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
            >
              {/* Header của phần chi tiết */}
              <div className="flex items-center gap-4 mb-8">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-300 hover:bg-gray-100 hover:text-[#1c7c76] transition font-semibold text-gray-600"
                >
                  <LuArrowLeft /> Quay lại
                </button>
                <h2 className="text-2xl font-bold text-gray-800">
                  {menuItems.find(i => i.id === selectedCategory)?.name}
                </h2>
              </div>

              {/* Render nội dung tương ứng */}
              {renderDetailContent()}

            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ===== FOOTER ===== */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 text-center text-gray-400 text-sm"
      >
        © 2025 TuHocThongMinh AI. Practice & Skills Development.
      </motion.div>

    </section>
  );
}