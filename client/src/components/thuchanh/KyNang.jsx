import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// Đã xóa LuPlay khỏi import vì không dùng nữa
import { LuArrowLeft, LuLink } from "react-icons/lu";

export default function KyNang() {
  // === DỮ LIỆU BẠN YÊU CẦU ===
  const exercises = [
    {
      name: "Kỹ năng an toàn mạng – Công nghệ",
      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-an-to-n-m-ng-l-p-10",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764143867/Gemini_Generated_Image_3vjfra3vjfra3vjf_f9epvh.png"
    },
    {
      name: "Phòng chống thiên tai",
      link: "https://nguyenthanhthan.my.canva.site/quiz-ph-ng-ch-ng-thi-n-tai",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764143866/Gemini_Generated_Image_ila2twila2twila2_vraszx.png"
    },
    {
      name: "Kỹ năng cá nhân",
      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-k-n-ng-c-nh-n",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764143871/Gemini_Generated_Image_w37txew37txew37t_w8gses.png"
    },
    {
      name: "Kỹ năng giao tiếp – xã hội",
      link: "https://nguyenthanhthan.my.canva.site/quiz-k-n-ng-giao-ti-p-x-h-i",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764143866/Gemini_Generated_Image_9bb4qi9bb4qi9bb4_xpmq7v.png"
    },
    {
      name: "Kỹ năng an toàn – Sức khỏe",
      link: "https://nguyenthanhthan.my.canva.site/b-i-ki-m-tra-an-to-n-s-c-kh-e",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764143870/Gemini_Generated_Image_4raqgn4raqgn4raq_zgjhwe.png"
    },
    {
      name: "Kỹ năng định hướng và tư duy",
      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-k-n-ng-n-ng",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764143865/Gemini_Generated_Image_4jjqsc4jjqsc4jjq_f5dgsm.png"
    }
  ];

  // Hiệu ứng chuyển động
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  };

  return (
    // Giữ nguyên padding-top lớn (pt-32) để tránh bị Header che
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
            <h1 className="text-3xl font-extrabold text-[#1c7c76]">TƯƠNG TÁC KỸ NĂNG SỐNG</h1>
            <p className="text-gray-500 text-sm mt-1">Luyện tập tình huống thực tế qua bài giảng Canva</p>
          </div>
        </div>

        {/* Grid hiển thị danh sách bài tập */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {exercises.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              variants={itemVariants}
              className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#1c7c76]/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Phần hình ảnh Thumbnail */}
              <div className="block bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
                {item.thumbnail ? (
                  <img 
                    src={item.thumbnail} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                   <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">No Image</div>
                )}
                
                {/* Đã xóa phần overlay chứa nút Play ở đây */}
              </div>

              {/* Phần thông tin tên bài */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#1c7c76] transition-colors line-clamp-2 min-h-[3.5rem]">
                  {item.name}
                </h3>
                
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span className="bg-teal-50 text-[#1c7c76] px-2 py-1 rounded-md font-medium text-xs">Bài tập</span>
                  <span className="flex items-center gap-1 group-hover:text-[#1c7c76] transition-colors font-medium">
                    Mở ngay <LuLink />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}