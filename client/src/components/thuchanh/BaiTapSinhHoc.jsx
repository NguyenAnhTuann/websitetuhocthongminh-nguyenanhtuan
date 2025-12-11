import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// Import các icon c?n thi?t
import { LuArrowLeft, LuLink, LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function BaiTapSinhHoc() {
  // === D? LI?U BÀI T?P SINH H?C ===
  const allExercises = [
    // --- BÀI T?P SINH H?C ---
    {
      name: "Thành phần của DNA",
      link: "https://gemini.google.com/share/0fb69abc9424",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234977/Gemini_Generated_Image_j2p1fsj2p1fsj2p6_z1y7x4.png",
      category: "Sinh học Tế bào",
      source: "Tài liệu/Quiz"
    },
{
      name: "Chu trình tế bào",
      link: "https://nguyenthanhthan.my.canva.site/chu-tr-nh-t-b-o-quiz",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234977/Gemini_Generated_Image_j2p1fsj2p1fsj2p6_z1y7x4.png",
      category: "Sinh h?c T? bào",
      source: "Tài liệu/Quiz"
    },
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
  
  // Màu ch? d?o m?i cho Sinh H?c: Xanh lá cây (Emerald)
  const primaryColor = "#10b981"; // Màu xanh lá cây (emerald-500)
  const lightAccentColor = "bg-emerald-50";

  return (
    // Padding-top l?n d? tránh b? Header che
    <section className="min-h-screen w-full bg-slate-50 relative overflow-hidden px-4 pt-32 pb-10">
      
      {/* Background Decor: Màu xanh lá cây */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Màu xanh d?m */}
        <div className={`absolute -top-[10%] -left-[10%] w-96 h-96 bg-[${primaryColor}] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob`}></div>
        {/* Màu xanh nh?t */}
        <div className="absolute top-[20%] -right-[10%] w-96 h-96 bg-lime-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header: Nút quay l?i & Tiêu d? */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
          <Link 
            to="/thuchanh" 
            className={`w-fit flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-[${primaryColor}] hover:border-[${primaryColor}] transition shadow-sm font-semibold`}
          >
            <LuArrowLeft /> Quay l?i
          </Link>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className={`text-3xl font-extrabold text-[${primaryColor}]`}>TUONG TÁC SINH H?C</h1>
            <p className="text-gray-500 text-sm mt-1">
              T?ng h?p bài t?p th?c hành các chuyên d? Sinh H?c
            </p>
          </div>
        </div>

        {/* Grid hi?n th? danh sách bài t?p */}
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
              // Thay d?i hover color
              className={`group block bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[${primaryColor}]/50 transition-all duration-300 transform hover:-translate-y-1`}
            >
              {/* Ph?n hình ?nh Thumbnail */}
              <div className="relative w-full h-48 overflow-hidden bg-gray-100 border-b border-gray-100">
                {item.thumbnail ? (
                  <img 
                    src={item.thumbnail} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                    // Th? div placeholder
                   <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-sm">No Image</div>
                )}
                {/* Hi?n th? Category lên trên hình ?nh */}
                {item.category && (
                    <span className="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-md backdrop-blur-sm">
                        {item.category}
                    </span>
                )}
              </div>

              {/* Ph?n thông tin tên bài */}
              <div className="p-5">
                <h3 className={`text-lg font-bold text-gray-800 group-hover:text-[${primaryColor}] transition-colors line-clamp-2 min-h-[3.5rem]`}>
                  {item.name}
                </h3>
                
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  {/* Hi?n th? Ngu?n/Lo?i hình bài t?p */}
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

            {/* Các s? trang */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 rounded-lg font-semibold transition shadow-sm border ${
                  currentPage === page
                    ? `bg-[${primaryColor}] text-white border-[${primaryColor}]`
                    : `bg-white text-gray-700 border-gray-300 hover:bg-emerald-50 hover:text-[${primaryColor}]`
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