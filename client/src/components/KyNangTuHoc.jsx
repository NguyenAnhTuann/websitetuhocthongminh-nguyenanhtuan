import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Images } from "lucide-react";
import avatarImage from "../assets/a.JPG"; // đổi ảnh tại đây

// Hiệu ứng gõ chữ
const Typewriter = ({ text, speed = 40 }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.p
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="w-full max-w-[90%] px-4 text-center text-sm md:text-base pt-4 pb-4 text-black"
    >
      {displayed}
      <span className="animate-pulse">|</span>
    </motion.p>
  );
};

const KyNangTuHoc = ({ language }) => {
  const t = {
    vi: {
      title: "KỸ NĂNG TỰ HỌC",
      subtitle:
        "Nâng cao tư duy – Rèn luyện tinh thần tự chủ – Phát triển bản thân trong Kỷ nguyên số.",
      pdfTitle: "Tài liệu PDF",
      pdf1: "Tầm quan trọng của kỹ năng tự học trong Kỷ nguyên số",
      pdf2: "Biện pháp giúp học sinh sinh viên thay đổi tích cực trong thói quen tự học và quản lý thời gian",
      mediaTitle: "Video - Hình ảnh - Dự án",
      mediaDesc: "Học sinh tự học và ứng dụng kiến thức vào các hoạt động thực tế."
    },

    en: {
      title: "SELF-STUDY SKILLS",
      subtitle:
        "Develop independent learning – Strengthen discipline – Grow sustainably in the digital age.",
      pdfTitle: "PDF Resources",
      pdf1: "The importance of self-study in the digital age",
      pdf2: "Methods to improve students' self-study habits and time management",
      mediaTitle: "Videos – Images – Projects",
      mediaDesc: "Students apply knowledge in real-life activities."
    }
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center px-4 py-20 bg-white">

      {/* ======= TIÊU ĐỀ ======= */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold text-black font-outfit"
      >
        {t[language].title}
      </motion.h1>

      <Typewriter text={t[language].subtitle} />

      {/* ======= TÀI LIỆU PDF ======= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-full max-w-4xl bg-white border border-gray-200 rounded-2xl p-8 shadow-md mb-12"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 flex items-center justify-center gap-2">
          <FileText className="text-sky-600 w-6 h-6" />
          {t[language].pdfTitle}
        </h2>

        <ul className="space-y-4 text-gray-700">
          <li className="p-4 rounded-xl border hover:border-sky-600 cursor-pointer transition">
            📄 {t[language].pdf1}
          </li>

          <li className="p-4 rounded-xl border hover:border-sky-600 cursor-pointer transition">
            📄 {t[language].pdf2}
          </li>
        </ul>
      </motion.div>

      {/* ======= MEDIA ======= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="w-full max-w-4xl bg-white border border-gray-200 rounded-2xl p-8 shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4 flex items-center justify-center gap-2">
          <Images className="text-sky-600 w-6 h-6" />
          {t[language].mediaTitle}
        </h2>

        <p className="text-gray-600 text-center mb-6">
          {t[language].mediaDesc}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-100 h-40 rounded-lg flex items-center justify-center">
            🎬 Video
          </div>
          <div className="bg-gray-100 h-40 rounded-lg flex items-center justify-center">
            🖼 Hình ảnh
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default KyNangTuHoc;
