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

const KyNangTuHoc = ({ language }) => {
  const [showFolder1, setShowFolder1] = useState(false);

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
        className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-outfit
                   bg-[#1c7c76] px-6 py-4 rounded-2xl shadow-sm inline-block"
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
          <FileText className="text-[#3C9E8F] w-6 h-6" />
          {t[language].pdfTitle}
        </h2>

        <ul className="space-y-4 text-gray-700">

          {/* PDF 1 */}
          <a
            href="https://drive.google.com/file/d/14rvbx4P6vzL1-4q5R8Vr24KUIwNeuDvp/view?usp=sharing"
            target="_blank"
            className="block p-4 rounded-xl border hover:border-[#1c7c76] hover:bg-gray-50 transition cursor-pointer shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#3C9E8F] text-white flex items-center justify-center rounded-lg text-xl">
                📄
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  Sáng tác bài hát bằng AI - Suno
                </p>
                <p className="text-sm text-gray-500">Nhấn để mở PDF</p>
              </div>
            </div>
          </a>

          {/* PDF 2 */}
          <a
            href="https://drive.google.com/file/d/1Eq7ySlDTm36X7mn6qELGaS2ve72rAU2E/view?usp=sharing"
            target="_blank"
            className="block p-4 rounded-xl border hover:border-[#1c7c76] hover:bg-gray-50 transition cursor-pointer shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#3C9E8F] text-white flex items-center justify-center rounded-lg text-xl">
                📄
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  MỘT SỐ TÀI NGUYÊN VỀ AI THAM KHẢO THÊM
                </p>
                <p className="text-sm text-gray-500">Nhấn để mở PDF</p>
              </div>
            </div>
          </a>

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
          <Images className="text-[#3C9E8F] w-6 h-6" />
          Hình ảnh & Video
        </h2>

        {/* ======= HÌNH ẢNH ======= */}
        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-3">
          🖼 Hình ảnh
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {/* Mỗi ảnh là 1 ô (thay link Drive nếu có) */}
          <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center border hover:border-[#1c7c76] transition">
            <span className="text-gray-600">Ảnh 1 (Thay link sau)</span>
          </div>

          <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center border hover:border-[#1c7c76] transition">
            <span className="text-gray-600">Ảnh 2 (Thay link sau)</span>
          </div>
        </div>

        {/* ======= VIDEO ======= */}
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          🎬 Video bài học
        </h3>

        <div className="space-y-4">
          {/* TEMPLATE VIDEO ITEM */}
          {[
            {
              name: "VIDEO CÁCH TÌM TRỌNG TÂM TAM GIÁC",
              link: "https://drive.google.com/file/d/19Q-R-p83n763T9ymvhrcb6YBADEtEMfb/view?usp=sharing"
            },
            {
              name: "GÓC GIỮA HAI MẶT",
              link: "https://drive.google.com/file/d/1kJNGevsvSxtkgzr3GyKrPJc_niX8I414/view?usp=sharing"
            },
            {
              name: "CÁCH VẼ HÌNH LẬP PHƯƠNG",
              link: "https://drive.google.com/file/d/17LxPeTNUUuu7LgmaIaMmS-IUcP4wglDG/view?usp=sharing"
            },
            {
              name: "CÁCH VẼ HÌNH CHÓP ĐỀU",
              link: "https://drive.google.com/file/d/1xzdwhwAnkMlhywd9TCW6JABdBf9qr2ML/view?usp=sharing"
            },
            {
              name: "CÁCH TÌM TOẠ ĐỘ ĐIỂM TRONG Oxyz",
              link: "https://drive.google.com/file/d/12KKBUHMw3PjJ3V1Z0B5te-cvaNRYecds/view?usp=sharing"
            },
            {
              name: "CÁC BƯỚC TÌM GÓC GIỮA ĐƯỜNG VÀ MẶT",
              link: "https://drive.google.com/file/d/1YMAI8Mzl-_N9Z6jkU9QaiO7PeFZq9EuQ/view?usp=sharing"
            }
          ].map((video, index) => (
            <a
              key={index}
              href={video.link}
              target="_blank"
              className="block p-4 bg-gray-50 rounded-xl border hover:border-[#1c7c76] hover:bg-gray-100 transition shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#1c7c76] text-white flex items-center justify-center rounded-lg text-xl">
                  🎬
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {video.name}
                  </h4>
                  <p className="text-sm text-gray-500">Nhấn để mở video</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6">
          {/* ================================
    FOLDER 1 – VIDEO TOÁN THỰC TẾ
   ================================ */}

          <div
            onClick={() => setShowFolder1(!showFolder1)}
            className="flex items-center justify-between p-4 bg-[#e8f6f4] border rounded-xl cursor-pointer hover:border-[#1c7c76] transition mb-3"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              📁 VIDEO TOÁN THỰC TẾ
            </h3>

            <span className="text-[#1c7c76] text-2xl">
              {showFolder1 ? "−" : "+"}
            </span>
          </div>

          {/* DANH SÁCH VIDEO – CHỈ HIỆN KHI MỞ */}
          {showFolder1 && (
            <div className="space-y-4 mb-8 animate__animated animate__fadeIn">
              {[
                {
                  name: "SGK Đường đi máy bay Oxyz",
                  link: "https://drive.google.com/file/d/1Z5rp-6SMILH_5wy53DNqkfzwB2dNiX_I/view?usp=sharing"
                },
                {
                  name: "Lực tác động vào vật (Thực tế)",
                  link: "https://drive.google.com/file/d/1WM_gJQq0sSlMDVp-KvH7AOtY0VCG6ZOA/view?usp=sharing"
                },
                {
                  name: "Định lý Sin trong thực tế",
                  link: "https://drive.google.com/file/d/1hOg7Qzbi1B4Yfauz4w2py46EcSqmlxTE/view?usp=sharing"
                }
              ].map((video, index) => (
                <a
                  key={index}
                  href={video.link}
                  target="_blank"
                  className="block p-4 bg-gray-50 rounded-xl border hover:border-[#1c7c76] hover:bg-gray-100 transition shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#1c7c76] text-white flex items-center justify-center rounded-lg text-xl">
                      🎬
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {video.name}
                      </h4>
                      <p className="text-sm text-gray-500">Nhấn để mở video</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>




      </motion.div>

    </section>
  );
};

export default KyNangTuHoc;
