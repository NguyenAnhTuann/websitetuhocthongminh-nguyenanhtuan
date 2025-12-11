import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// Import các icon cần thiết
import { LuArrowLeft, LuLink, LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function BaiTapToan() {
  // === DỮ LIỆU BÀI TẬP (Lớp 10, 11, 12) ===
  const allExercises = [
    // --- LỚP 10 ---
    {
      name: "Giải phương trình bậc hai - Lớp 10",
      link: "https://nguyenthanhthan.my.canva.site/gi-i-ph-ng-tr-nh-b-c-hai",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Bài tập trắc nghiệm mệnh đề - Lớp 10",
      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-tr-c-nghi-m-m-nh",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Trắc nghiệm toán tập hợp - Lớp 10",
      link: "https://nguyenthanhthan.my.canva.site/tr-c-nghi-m-to-n-l-p-10-t-p-h-p",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Các phép toán trên tập hợp - Lớp 10",
      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-to-n-l-p-10",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Mệnh đề và tập hợp - Lớp 10",
      link: "https://nguyenthanhthan.my.canva.site/btrfj6548pzbsqqy",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Bất phương trình bậc nhất hai ẩn - Lớp 10",
      link: "https://nguyenthanhthan.my.canva.site/btrfxg29jzj1k4ka",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Hệ bất phương trình bậc nhất hai ẩn - Lớp 10",
      link: "https://nguyenthanhthan.my.canva.site/btrg7rw07zjshcpy",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Bất phương trình và Hệ bất phương trình bậc nhất hai ẩn - Lớp 10",
      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-tr-c-nghi-m-to-n-l-p-10",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Hàm số và đồ thị - Lớp 10",
      link: "https://nguyenthanhthan.my.canva.site/btrh3zahbgta381h",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Hàm số bậc hai - Lớp 10",
      link: "https://nguyenthanhthan.my.canva.site/tr-c-nghi-m-h-m-s-b-c-hai",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Đồ thị và hàm số - Lớp 10",
      link: "https://nguyenthanhthan.my.canva.site/btrhhq70c6wjvw71",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Số gần đúng và sai số - Lớp 10",
      link: "https://nguyenthanhthan.my.canva.site/btrkgb2rcy16jb7h",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Tích vô hướng của hai véc-tơ - Lớp 10",
      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-tr-c-nghi-m-to-n-10",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Tích của một số với một véc-tơ - Lớp 10",
      link: "https://nguyenthanhthan.my.canva.site/btrjw3h2kvsjyttz",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Tổng và hiệu của hai véc-tơ - Lớp 10",
      link: "https://nguyenthanhthan.my.canva.site/btrjp36yy81f22vh",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Véc-tơ - Lớp 10",
      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-tr-c-nghi-m-vecto",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Tam giác - Lớp 10",
      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-gi-i-tam-gi-c",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Cosin và Sin - Lớp 10",
      link: "https://nguyenthanhthan.my.canva.site/btrhwpsz34k9qsxh",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Giá trị lượng giác của một góc từ 0° đến 180° - Lớp 10",
      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-gi-tr-l-ng-gi-c",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },

    // --- LỚP 11 ---
    {
      name: "Trung vị và Tứ phân vị của mẫu số liệu ghép nhóm - Lớp 11",
      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-tr-c-nghi-m-to-n-h-c",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Số Trung Bình & Mốt - Mẫu Số Liệu Ghép Nhóm - Lớp 11",
      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-to-n-th-ng-k",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Phương trình lượng giác cơ bản - Lớp 11",
      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-l-ng-gi-c-l-p-11",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Hàm Số Lượng Giác - Lớp 11",
      link: "https://nguyenthanhthan.my.canva.site/quiz-h-m-s-l-ng-gi-c",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "CÔNG THỨC LƯỢNG GIÁC - Lớp 11",
      link: "https://nguyenthanhthan.my.canva.site/tr-c-nghi-m-l-ng-gi-c",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Giá Trị Lượng Giác - Lớp 11",
      link: "https://nguyenthanhthan.my.canva.site/b-i-quiz-gi-tr-l-ng-gi-c",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Góc Lượng Giác - Lớp 11",
      link: "https://nguyenthanhthan.my.canva.site/b-i-ki-m-tra-g-c-l-ng-gi-c",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },

    // --- LỚP 12 ---
    {
      name: "Tính đơn điệu và cực trị của hàm số - Lớp 12",
      link: "https://nguyenthanhthan.my.canva.site/b-i-ki-m-tra-to-n-l-p-12",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Giá Trị Lớn Nhất, Giá Trị Nhỏ Nhất Của Hàm Số - Lớp 12",
      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-tr-c-nghi-m-to-n-12",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Đường Tiệm Cận của Đồ Thị Hàm Số - Lớp 12",
      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-to-n-ng-ti-m-c-n",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Khảo sát và vẽ đồ thị hàm số cơ bản - Lớp 12",
      link: "https://nguyenthanhthan.my.canva.site/tr-c-nghi-m-to-n-l-p-12",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Vecto và Các phép toán trên vecto - Lớp 12",
      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-tr-c-nghi-m-to-n",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Tọa độ của vectơ trong không gian - Lớp 12",
      link: "https://nguyenthanhthan.my.canva.site/bv38q85w5z8qy4ts",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Tổng hợp - Lớp 12",
      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-to-n-h-c-tr-c-nghi-m",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Khoảng biến thiên và khoảng tứ phân vị - Lớp 12",
      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-to-n-l-p-12",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    },
    {
      name: "Phương Sai và Độ Lệch Chuẩn của Mẫu Số Liệu Ghép Nhóm - Lớp 12",
      link: "https://nguyenthanhthan.my.canva.site/quiz-to-n-h-c-l-p-12",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765428972/Gemini_Generated_Image_nh6295nh6295nh62_uwtwuv.png"
    }
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

  return (
    // Padding-top lớn để tránh bị Header che
    <section className="min-h-screen w-full bg-slate-50 relative overflow-hidden px-4 pt-32 pb-10">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-96 h-96 bg-[#1c7c76] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-[20%] -right-[10%] w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header: Nút quay lại & Tiêu đề */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
          <Link 
            to="/thuchanh" 
            className="w-fit flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-[#1c7c76] hover:border-[#1c7c76] transition shadow-sm font-semibold"
          >
            <LuArrowLeft /> Quay lại
          </Link>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-black">TƯƠNG TÁC TOÁN HỌC</h1>
            <p className="text-gray-500 text-sm mt-1">
              Tổng hợp bài tập trắc nghiệm và tự luận Toán 10, 11, 12
            </p>
          </div>
        </div>

        {/* Grid hiển thị danh sách bài tập */}
        {/* Reset animation khi đổi trang bằng key={currentPage} */}
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
              className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#1c7c76]/50 transition-all duration-300 transform hover:-translate-y-1"
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
                   <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">No Image</div>
                )}
              </div>

              {/* Phần thông tin tên bài */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#1c7c76] transition-colors line-clamp-2 min-h-[3.5rem]">
                  {item.name}
                </h3>
                
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span className="bg-teal-50 text-[#1c7c76] px-2 py-1 rounded-md font-medium text-xs">Bài tập Canva</span>
                  <span className="flex items-center gap-1 group-hover:text-[#1c7c76] transition-colors font-medium">
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
                  : "bg-white text-gray-700 hover:bg-[#1c7c76] hover:text-white border-gray-300 shadow-sm"
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
                    ? "bg-[#1c7c76] text-white border-[#1c7c76]"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-[#1c7c76]"
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
                  : "bg-white text-gray-700 hover:bg-[#1c7c76] hover:text-white border-gray-300 shadow-sm"
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