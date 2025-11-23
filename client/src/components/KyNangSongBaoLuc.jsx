import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

// ------------------ FOLDER TEMPLATE (PDF - IMG - VIDEO) ------------------

const PdfFolder = ({ title, pdfs }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8">
      <div
        onClick={() => setOpen(!open)}
        className="p-4 rounded-xl bg-[#f3fafc] border flex justify-between items-center cursor-pointer hover:bg-[#e8f5f7] transition"
      >
        <span className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          📁 {title}
        </span>
        <span className="text-xl text-gray-700">{open ? "−" : "+"}</span>
      </div>

      {open && (
        <div className="mt-4 space-y-4">
          {pdfs.map((pdf, i) => (
            <a
              key={i}
              href={pdf.link}
              target="_blank"
              className="block p-4 bg-gray-50 rounded-xl border hover:border-[#1c7c76] hover:bg-gray-100 transition shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#3C9E8F] text-white flex items-center justify-center rounded-lg text-xl">
                  📄
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-800">
                    {pdf.name}
                  </h4>
                  <p className="text-sm text-gray-500">Nhấn để mở PDF</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

const ImageFolder = ({ title, images }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8">
      <div
        onClick={() => setOpen(!open)}
        className="p-4 rounded-xl bg-[#f3fafc] border flex justify-between items-center cursor-pointer hover:bg-[#e8f5f7] transition"
      >
        <span className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          📁 {title}
        </span>
        <span className="text-xl text-gray-700">{open ? "−" : "+"}</span>
      </div>

      {open && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((img, i) => (
            <a
              key={i}
              href={img.link}
              target="_blank"
              className="block bg-gray-50 h-40 rounded-xl border hover:border-[#1c7c76] hover:bg-gray-100 transition shadow-sm flex items-center justify-center"
            >
              <span className="text-gray-700 text-base">{img.name}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

const VideoFolder = ({ title, videos }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8">
      <div
        onClick={() => setOpen(!open)}
        className="p-4 rounded-xl bg-[#e8f8f6] border flex justify-between items-center cursor-pointer hover:bg-[#dff3f1] transition"
      >
        <span className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          📁 {title}
        </span>
        <span className="text-xl text-gray-700">{open ? "−" : "+"}</span>
      </div>

      {open && (
        <div className="mt-4 space-y-4">
          {videos.map((v, i) => (
            <a
              key={i}
              href={v.link}
              target="_blank"
              className="block p-4 bg-gray-50 rounded-xl border hover:border-[#1c7c76] hover:bg-gray-100 transition shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#1c7c76] text-white flex items-center justify-center rounded-lg text-xl">
                  🎬
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {v.name}
                  </h4>
                  <p className="text-sm text-gray-500">Nhấn để mở video</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

// ------------------ MAIN PAGE ------------------

const KyNangSongBaoLuc = ({ language }) => {
  const titles = {
    vi: {
      title: "KỸ NĂNG SỐNG TRONG BẠO LỰC",
      subtitle: "Hiểu – phòng tránh – xử lý bạo lực học đường và an toàn số"
    },
    en: {
      title: "LIFE SKILLS – VIOLENCE & SAFETY",
      subtitle: "Understanding – preventing – handling violence and digital safety"
    }
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center px-4 py-20 bg-white">

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white bg-[#1c7c76] px-6 py-4 rounded-2xl shadow-sm inline-block"
      >
        {titles[language].title}
      </motion.h1>

      <Typewriter text={titles[language].subtitle} />

      {/* PDF SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full max-w-4xl bg-white border border-gray-200 rounded-2xl p-8 shadow-md mb-12"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 flex items-center justify-center gap-2">
          <FileText className="text-[#3C9E8F] w-6 h-6" />
          Tài liệu PDF
        </h2>

        <PdfFolder
          title="BẠO LỰC HỌC ĐƯỜNG"
          pdfs={[
            { name: "Tình huống mất kiểm soát trên mạng (PDF)", link: "#" },
            { name: "Biện pháp xử lý bạo lực học đường", link: "#" }
          ]}
        />

      </motion.div>

      {/* MEDIA SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-full max-w-4xl bg-white border border-gray-200 rounded-2xl p-8 shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4 flex items-center justify-center gap-2">
          <Images className="text-[#3C9E8F] w-6 h-6" />
          Hình ảnh & Video
        </h2>

        <ImageFolder
          title="HÌNH ẢNH – TÌNH HUỐNG BẠO LỰC"
          images={[
            { name: "Ảnh minh họa 1", link: "#" },
            { name: "Ảnh minh họa 2", link: "#" }
          ]}
        />

        <VideoFolder
          title="VIDEO – KỸ NĂNG XỬ LÝ BẠO LỰC"
          videos={[
            { name: "Video 1 – Phòng tránh bạo lực", link: "#" },
            { name: "Video 2 – An toàn mạng", link: "#" }
          ]}
        />
      </motion.div>

    </section>
  );
};

export default KyNangSongBaoLuc;
