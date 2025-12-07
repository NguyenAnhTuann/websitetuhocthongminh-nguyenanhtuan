import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// Import thêm LuShield để làm icon hiển thị khi chưa có ảnh
import { LuArrowLeft, LuLink, LuShield } from "react-icons/lu";

export default function KyNangMang() {
  // === DỮ LIỆU ĐỂ TRỐNG (BẠN SẼ ĐIỀN SAU) ===
  const exercises = [
    {
      name: "Bảo mật thông tin cá nhân",
      link: "", // Điền link bài tập vào đây
      thumbnail: "" 
    },
    {
      name: "Phòng chống lừa đảo trực tuyến (Phishing)",
      link: "",
      thumbnail: ""
    },
    {
      name: "Quy tắc ứng xử trên mạng xã hội",
      link: "",
      thumbnail: ""
    },
    {
      name: "Nhận biết và phòng tránh Mã độc",
      link: "",
      thumbnail: ""
    },
    {
      name: "An toàn khi sử dụng Wi-Fi công cộng",
      link: "",
      thumbnail: ""
    },
    {
      name: "Sao lưu và bảo vệ dữ liệu quan trọng",
      link: "",
      thumbnail: ""
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
    // Padding-top lớn (pt-32) để tránh bị Header che
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
            <h1 className="text-3xl font-extrabold text-[#1c7c76]">TƯƠNG TÁC KỸ NĂNG AN TOÀN MẠNG</h1>
            <p className="text-gray-500 text-sm mt-1">Trang bị kiến thức và kỹ năng bảo vệ bản thân trên không gian số</p>
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
              href={item.link || "#"} // Nếu chưa có link thì để #
              target={item.link ? "_blank" : "_self"}
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
                   /* Hiển thị Icon Khiên khi chưa có ảnh */
                   <div className="w-full h-full flex flex-col items-center justify-center bg-teal-50 text-teal-200 group-hover:text-teal-500 transition-colors">
                      <LuShield size={48} />
                      <span className="text-xs font-medium mt-2 text-gray-400">Chưa có ảnh</span>
                   </div>
                )}
              </div>

              {/* Phần thông tin tên bài */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#1c7c76] transition-colors line-clamp-2 min-h-[3.5rem]">
                  {item.name}
                </h3>
                
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span className="bg-teal-50 text-[#1c7c76] px-2 py-1 rounded-md font-medium text-xs">An toàn mạng</span>
                  <span className="flex items-center gap-1 group-hover:text-[#1c7c76] transition-colors font-medium">
                    {item.link ? "Mở ngay" : "Đang cập nhật"} <LuLink />
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