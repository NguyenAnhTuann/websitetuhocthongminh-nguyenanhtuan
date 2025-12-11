import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// Import các icon cần thiết
import { LuArrowLeft, LuLink, LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function BaiTapVatLy() {
  // === DỮ LIỆU BÀI TẬP VẬT LÝ ===
  const allExercises = [
    // --- BÀI TẬP VẬT LÝ ---
    {
      name: "Lực và Véc-tơ lực",
      link: "https://nguyenthanhthan.my.canva.site/tr-ch-i-v-t-l-l-c-v-vecto-l-c",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234877/Gemini_Generated_Image_j2p1fsj2p1fsj2p5_w0x9c3.png",
      category: "Cơ học",
      source: "Quiz Game"
    },
    {
      name: "Định luật Ohm",
      link: "https://nguyenthanhthan.my.canva.site/tr-ch-i-nh-lu-t-ohm",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234877/Gemini_Generated_Image_j2p1fsj2p1fsj2p5_w0x9c3.png",
      category: "Điện học",
      source: "Quiz Game"
    },
    {
      name: "Công và Công suất",
      link: "https://nguyenthanhthan.my.canva.site/tr-ch-i-v-t-l",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234877/Gemini_Generated_Image_j2p1fsj2p1fsj2p5_w0x9c3.png",
      category: "Cơ học",
      source: "Trò chơi"
    },
    // Thêm các bài tập Vật Lý khác nếu cần...
  ];

  // === LOGIC PHÂN TRANG ===
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allExercises.length / itemsPerPage);

  const currentExercises = allExercises.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  // Màu chủ đạo mới cho Vật Lý: Đỏ
  const primaryColor = "#ef4444"; // Màu đỏ (red-500)
  const lightAccentColor = "bg-red-50";

  return (
    // Padding-top lớn để tránh bị Header che
    <section className="min-h-screen w-full bg-slate-50 relative overflow-hidden px-4 pt-32 pb-10">
      
      {/* Background Decor: Màu đỏ */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Màu đỏ đậm */}
        <div className={`absolute -top-[10%] -left-[10%] w-96 h-96 bg-[${primaryColor}] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob`}></div>
        {/* Màu hồng đỏ nhạt */}
        <div className="absolute top-[20%] -right-[10%] w-96 h-96 bg-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header: Nút quay lại & Tiêu đề */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
          <Link 
            to="/thuchanh" 
            className={`w-fit flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-[${primaryColor}] hover:border-[${primaryColor}] transition shadow-sm font-semibold`}
          >
            <LuArrowLeft /> Quay lại
          </Link>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className={`text-3xl font-extrabold text-[${primaryColor}]`}>TƯƠNG TÁC VẬT LÝ</h1>
            <p className="text-gray-500 text-sm mt-1">
              Tổng hợp bài tập thực hành các chuyên đề Vật Lý
            </p>
          </div>
        </div>

        {/* Grid hiển thị danh sách bài tập */}
        <motion.div 
          key={currentPage} 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
        >
          {currentExercises.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              variants={itemVariants}
              // Thay đổi hover color
              className={`group block bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[${primaryColor}]/50 transition-all duration-300 transform hover:-translate-y-1`}
            >
              {/* Phần hình ảnh Thumbnail */}
              <div className="relative w-full h-48 overflow-hidden bg-gray-100 border-b border-gray-100">
                {item.thumbnail ? (
                  <img 
                    src={item.thumbnail} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                    // Thẻ div placeholder
                   <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-sm">No Image</div>
                )}
                {/* Hiển thị Category lên trên hình ảnh */}
                {item.category && (
                    <span className="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-md backdrop-blur-sm">
                        {item.category}
                    </span>
                )}
              </div>

              {/* Phần thông tin tên bài */}
              <div className="p-5">
                <h3 className={`text-lg font-bold text-gray-800 group-hover:text-[${primaryColor}] transition-colors line-clamp-2 min-h-[3.5rem]`}>
                  {item.name}
                </h3>
                
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  {/* Hiển thị Nguồn/Loại hình bài tập */}
                  <span className={`${lightAccentColor} text-[${primaryColor}] px-2 py-1 rounded-md font-medium text-xs`}>
                    {item.source || 'Online Quiz'}
                  </span>
                  <span className={`flex items-center gap-1 group-hover:text-[${primaryColor}] transition-colors font-medium`}>
                    Làm bài ngay <LuLink />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* === PHÂN TRANG (PAGINATION) === */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            
            {/* Nút Previous */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border transition ${
                currentPage === 1 
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200" 
                  : `bg-white text-gray-700 hover:bg-[${primaryColor}] hover:text-white border-gray-300 shadow-sm`
              }`}
            >
              <LuChevronLeft size={20} />
            </button>

            {/* Các số trang */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 rounded-lg font-semibold transition shadow-sm border ${
                  currentPage === page
                    ? `bg-[${primaryColor}] text-white border-[${primaryColor}]`
                    : `bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:text-[${primaryColor}]`
                }`}
              >
                {page}
              </button>
            ))}

            {/* Nút Next */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border transition ${
                currentPage === totalPages 
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200" 
                  : `bg-white text-gray-700 hover:bg-[${primaryColor}] hover:text-white border-gray-300 shadow-sm`
              }`}
            >
              <LuChevronRight size={20} />
            </button>

          </div>
        )}

      </div>
    </section>
  );
}