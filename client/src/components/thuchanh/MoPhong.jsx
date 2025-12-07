import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// Import icon: LuLayers (Mô hình/Lớp), LuExternalLink (Mở tab mới)
import { LuArrowLeft, LuExternalLink, LuLayers } from "react-icons/lu";

export default function MoPhong() {
  // === DỮ LIỆU BẠN YÊU CẦU ===
  const simulations = [
    {
      name: "Quy hoạch tuyến tính (BPT bậc nhất 2 ẩn)",
      link: "https://chatgpt.com/canvas/shared/68e9fe0251dc81918d64619b92e1da1b",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234818/Gemini_Generated_Image_3nxl043nxl043nxl_f4j6lu.png"
    },
    {
      name: "Hàm Số Bậc Hai",
      link: "https://chatgpt.com/canvas/shared/68fd811a91c881918c7b182c8698f1fd",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234818/Gemini_Generated_Image_3nxl043nxl043nxl_f4j6lu.png"
    },
    {
      name: "Hàm Số Bậc Ba",
      link: "https://chatgpt.com/canvas/shared/68ff8e127bb88191ac2262c3d9d1b26d",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234818/Gemini_Generated_Image_3nxl043nxl043nxl_f4j6lu.png"
    },
    {
      name: "Quy Hoạch Tuyến Tính (Nâng cao)",
      link: "https://chatgpt.com/canvas/shared/68ffa2452ac48191892c7f0efec6977b",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234818/Gemini_Generated_Image_3nxl043nxl043nxl_f4j6lu.png"
    },
    {
      name: "Hệ số a, b, c trong đồ thị",
      link: "https://chatgpt.com/canvas/shared/6902f506befc81918bb0d805f6778e09",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234818/Gemini_Generated_Image_3nxl043nxl043nxl_f4j6lu.png"
    },
    {
      name: "Dây neo thuyền & định lí Py-ta-go",
      link: "https://chatgpt.com/canvas/shared/6900de158f448191b192cb92de6d3056",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234818/Gemini_Generated_Image_3nxl043nxl043nxl_f4j6lu.png"
    },
    {
      name: "APP khinh khí cầu trong Oxyz",
      link: "https://ai.studio/apps/drive/1gaPNHTRuCDfbKYUyV1CY_fNnDD9XvmHf",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234818/Gemini_Generated_Image_3nxl043nxl043nxl_f4j6lu.png"
    },
    {
      name: "APP thống kê mô tả - Số liệu ghép nhóm",
      link: "https://ai.studio/apps/drive/12k9xC-YDMAGtxCCZ3lnguarb5HGnyuCo",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234818/Gemini_Generated_Image_3nxl043nxl043nxl_f4j6lu.png"
    },
    {
      name: "APP tọa độ điểm trong Oxyz",
      link: "https://ai.studio/apps/drive/1oXfyMM8Zc28R0zm4wrNBITsBhiWRCOTE",
      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234818/Gemini_Generated_Image_3nxl043nxl043nxl_f4j6lu.png"
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
            <h1 className="text-3xl font-extrabold text-[#1c7c76]">MÔ PHỎNG TOÁN HỌC</h1>
            <p className="text-gray-500 text-sm mt-1">Tương tác trực quan với các đồ thị và mô hình toán học trên Canvas</p>
          </div>
        </div>

        {/* Grid hiển thị danh sách mô phỏng */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {simulations.map((item, index) => (
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
                   <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                     <LuLayers size={48} />
                   </div>
                )}
                
                {/* Không có nút Play che hình */}
              </div>

              {/* Phần thông tin tên bài */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#1c7c76] transition-colors line-clamp-2 min-h-[3.5rem]">
                  {item.name}
                </h3>
                
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span className="bg-teal-50 text-[#1c7c76] px-2 py-1 rounded-md font-medium text-xs">Mô phỏng</span>
                  <span className="flex items-center gap-1 group-hover:text-[#1c7c76] transition-colors font-medium">
                    Tương tác ngay <LuExternalLink />
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