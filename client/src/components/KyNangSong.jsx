import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import avatarImage from "../assets/a.JPG";
import { FileText, Images } from "lucide-react";

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

const KyNangSong = ({ language }) => {
  const t = {
    vi: {
      title: "KỸ NĂNG SỐNG",
      subtitle:
        "Rèn luyện tư duy tích cực – Ứng phó tình huống – Xây dựng lối sống lành mạnh và an toàn.",
      pdfTitle: "Tài liệu PDF",
      pdf1: "Chia sẻ tình huống mất kiểm soát trên không gian mạng (An toàn mạng)",
      pdf2: "Biện pháp xử lý bạo lực học đường",
      mediaTitle: "Video - Hình ảnh",
      mediaDesc:
        "Tư liệu minh họa các tình huống thực tế liên quan đến kỹ năng sống của học sinh.",
    },

    en: {
      title: "LIFE SKILLS",
      subtitle:
        "Strengthen positive thinking – Handle situations wisely – Build a healthy and safe lifestyle.",
      pdfTitle: "PDF Resources",
      pdf1: "Case study: Losing control online (Cyber safety)",
      pdf2: "Solutions for dealing with school violence",
      mediaTitle: "Videos – Images",
      mediaDesc:
        "Visual materials demonstrating real-life situations related to life skills.",
    },
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

      {/* ======= VIDEO – HÌNH ẢNH ======= */}
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

        <p className="text-gray-600 text-center mb-6">{t[language].mediaDesc}</p>

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

export default KyNangSong;
