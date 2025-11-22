import React from "react";
import { motion } from "framer-motion";
import { FileText, ExternalLink } from "lucide-react";

const ThucHanh = () => {

  // ==== Danh sách bài tập (sẽ update sau khi bạn gửi) ====
  const exercises = [
    {
      title: "Trắc nghiệm toán lớp 10",
      desc: "Bài tập tập hợp, các phép toán, toán tư duy – làm trực tiếp trên Canva.",
      link: "https://nguyenthanhthan.my.canva.site/tr-c-nghi-m-to-n-l-p-10-t-p-h-p"
    },
    // 👉 Khi bạn gửi thêm link, mình sẽ điền ở đây
  ];

  return (
    <section className="min-h-screen flex flex-col items-center px-4 py-20 bg-white font-sans">

      {/* ====== TITLE ====== */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold text-black text-center font-outfit"
      >
        Trang Thực Hành
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-gray-600 text-center max-w-2xl mt-3 text-sm md:text-base"
      >
        Tổng hợp các bài tập trắc nghiệm, tình huống thực tế và bài luyện tập giúp học sinh rèn luyện kỹ năng.
      </motion.p>

      {/* ====== LIST EXERCISES ====== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full max-w-4xl mt-12 grid md:grid-cols-2 gap-6"
      >
        {exercises.map((ex, idx) => (
          <motion.a
            key={idx}
            href={ex.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="
              bg-white border border-gray-200 rounded-2xl p-5 shadow-sm 
              hover:shadow-md hover:border-sky-600 transition cursor-pointer flex flex-col
            "
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute w-10 h-10 bg-cyan-100 rounded-xl opacity-60"></div>
                <div className="relative z-10 text-sky-600">
                  <FileText className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-base font-bold text-gray-900">{ex.title}</h3>
            </div>

            <p className="text-sm text-gray-600 flex-1">{ex.desc}</p>

            <div className="mt-3 inline-flex items-center text-sky-600 text-sm font-semibold">
              Mở bài tập <ExternalLink className="w-4 h-4 ml-1" />
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
};

export default ThucHanh;
