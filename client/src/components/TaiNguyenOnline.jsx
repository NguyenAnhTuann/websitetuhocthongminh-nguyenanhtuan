import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Link as LinkIcon } from "lucide-react";

const TaiNguyenOnline = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pdfFiles = [
    {
      title: "Tài liệu kỹ năng tự học (PDF 1)",
      link: "https://drive.google.com/file/d/14rvbx4P6vzL1-4q5R8Vr24KUIwNeuDvp/view?usp=sharing",
    },
    {
      title: "Tài liệu kỹ năng sống – an toàn mạng",
      link: "https://drive.google.com/file/d/xxxxxx/view",
    },
    {
      title: "Bài giảng giáo dục công dân lớp 10",
      link: "https://drive.google.com/file/d/yyyyyy/view",
    },
  ];

  return (
    <section className="min-h-screen w-full flex flex-col items-center px-4 py-24 bg-white">

      {/* ======= TIÊU ĐỀ ======= */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          text-3xl md:text-5xl lg:text-6xl font-extrabold text-white text-center font-outfit
          bg-[#1c7c76] px-6 py-4 rounded-2xl shadow-sm inline-block
        "
      >
        TÀI NGUYÊN ONLINE
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-gray-600 text-center max-w-2xl mt-3 text-sm md:text-base"
      >
        Tổng hợp tài liệu PDF, giáo trình, bài giảng, hướng dẫn học tập được lưu trữ trên Google Drive.
      </motion.p>

      {/* ======= DANH SÁCH FILE PDF ======= */}
      <div className="w-full max-w-5xl mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {pdfFiles.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="
              bg-white border border-gray-200 rounded-2xl p-6 shadow-sm
              hover:shadow-md hover:border-[#3C9E8F] transition cursor-pointer
            "
            onClick={() => window.open(item.link, "_blank")}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute w-10 h-10 bg-[#A8DCD2] rounded-xl opacity-60" />
                <FileText className="relative z-10 w-6 h-6 text-[#3C9E8F]" />
              </div>

              <h3 className="text-base md:text-lg font-bold text-gray-900">
                {item.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#3C9E8F] font-semibold">
              <LinkIcon className="w-4 h-4" />
              <span className="underline">Mở tài liệu</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FOOTER */}
      <p className="mt-8 text-xs text-gray-500">
        Tài liệu được lưu trữ an toàn trên Google Drive – cập nhật thường xuyên.
      </p>

    </section>
  );
};

export default TaiNguyenOnline;
