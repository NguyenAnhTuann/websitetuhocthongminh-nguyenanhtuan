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


  //------------------------------------------------------
  const ImageFolder = ({ title, images }) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="mt-8">
        {/* Folder header */}
        <div
          onClick={() => setOpen(!open)}
          className="p-4 rounded-xl bg-[#f3fafc] border flex justify-between items-center cursor-pointer hover:bg-[#e8f5f7] transition"
        >
          <span className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            📁 {title}
          </span>
          <span className="text-xl text-gray-700">{open ? "−" : "+"}</span>
        </div>

        {/* Folder content */}
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

  //------------------------------------------------------

  //------------------------------------------------------
  const PdfFolder = ({ title, pdfs }) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="mt-8">
        {/* Folder header */}
        <div
          onClick={() => setOpen(!open)}
          className="p-4 rounded-xl bg-[#f3fafc] border flex justify-between items-center cursor-pointer hover:bg-[#e8f5f7] transition"
        >
          <span className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            📁 {title}
          </span>
          <span className="text-xl text-gray-700">{open ? "−" : "+"}</span>
        </div>

        {/* Folder content */}
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

  //------------------------------------------------------

  //------------------------------------------------------
  const VideoFolder = ({ title, videos }) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="mt-8">
        {/* Folder header */}
        <div
          onClick={() => setOpen(!open)}
          className="p-4 rounded-xl bg-[#e8f8f6] border flex justify-between items-center cursor-pointer hover:bg-[#dff3f1] transition"
        >
          <span className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            📁 {title}
          </span>
          <span className="text-xl text-gray-700">{open ? "−" : "+"}</span>
        </div>

        {/* Folder content */}
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
  //-----------------------------------------------------------

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
          Tài liệu PDF
        </h2>

        {/* Folder 1 */}
        <PdfFolder
          title="TÀI LIỆU AI"
          pdfs={[
            {
              name: "Sáng tác bài hát bằng AI - Suno",
              link: "https://drive.google.com/file/d/14rvbx4P6vzL1-4q5R8Vr24KUIwNeuDvp/view?usp=sharing"
            },
            {
              name: "Một số tài nguyên về AI tham khảo thêm",
              link: "https://drive.google.com/file/d/1Eq7ySlDTm36X7mn6qELGaS2ve72rAU2E/view?usp=sharing"
            }
          ]}
        />
        

        {/* Folder 2 — bạn có thể thêm thoải mái */}
        <PdfFolder
          title="ỨNG DỤNG FOREST TRỒNG CÂY ẢO GIÚP TẬP TRUNG VÀ HÌNH THÀNH THÓI QUEN TỐT"
          pdfs={[
            { name: "Cách để Sử dụng ứng dụng năng suất Forest", link: "https://drive.google.com/file/d/1TVDHX4HbOfKZJQgSmgnvrwMwWjpZMKpD/view?usp=sharing" }
          ]}
        />

        <PdfFolder
          title="PHƯƠNG PHÁP POMODORO QUẢN LÝ THỜI GIAN VÀ CẢI THIỆN SỰ TẬP TRUNG"
          pdfs={[
            { name: "Pomodoro là gì?", link: "https://drive.google.com/file/d/150MccvFhqCnwzSigYLikSYyGSII64-gn/view?usp=sharing" },
            { name: "12 Pomodoro App quản lý thời gian tốt nhất cho điện thoại", link: "https://drive.google.com/file/d/1MOSBCLm6Nx4rDoYORNSUKNbUe1UOSf0m/view?usp=sharing" }
          ]}
        />

                <PdfFolder
          title="LẬP KẾ HOẠCH HỌC TẬP VỚI ỨNG DỤNG GOOGLE CALENDAR"
          pdfs={[
            { name: "Cách sử dụng Google Calendar", link: "https://drive.google.com/file/d/1PsyqHSNy1ub-wdwcORryCkyIwFtDuXgQ/view?usp=sharing" }
          ]}
        />

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
        <div className="mt-6">
          {/* ======= HÌNH ẢNH ======= */}
          <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-3">
            🖼 Hình ảnh
          </h3>
          {/* Folder Ảnh số 1 */}
          <ImageFolder
            title="ẢNH HOẠT ĐỘNG"
            images={[
              { name: "Ảnh 1", link: "#" },
              { name: "Ảnh 2", link: "#" }
            ]}
          />

          {/* Folder Ảnh số 2 */}
          <ImageFolder
            title="ẢNH TÀI LIỆU – MINH HỌA"
            images={[
              { name: "Ảnh minh họa 1", link: "#" },
              { name: "Ảnh minh họa 2", link: "#" }
            ]}
          />


        </div>


        <div className="mt-6">
          {/* ======= VIDEO ======= */}
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            🎬 Video bài học
          </h3>


          <VideoFolder
            title="VIDEO GIẢI TOÁN"
            videos={[
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
            ]}

          />


          <VideoFolder
            title="VIDEO TOÁN THỰC TẾ"
            videos={[
              {
                name: "SGK Đường đi máy bay Oxyz",
                link: "https://drive.google.com/file/d/1Z5rp-6SMILH_5wy53DNqkfzwB2dNiX_I/view?usp=sharing"
              },
              {
                name: "Lực tác động vào vật",
                link: "https://drive.google.com/file/d/1WM_gJQq0sSlMDVp-KvH7AOtY0VCG6ZOA/view?usp=sharing"
              },
              {
                name: "Định lý Sin thực tế",
                link: "https://drive.google.com/file/d/1hOg7Qzbi1B4Yfauz4w2py46EcSqmlxTE/view?usp=sharing"
              }
            ]}

          />

          <VideoFolder
            title="SÁNG TÁC NHẠC BẰNG AI"
            videos={[
              {
                name: "1. MV Trường hợp hai cạnh góc vuông",
                link: "https://drive.google.com/file/d/16tvRxAdPyJiL7SaOOdIXxZCtDuXu7n9a/view?usp=sharing"
              },
              {
                name: "2. MV Trường hơp cạnh góc vuông-góc nhọn kề",
                link: "https://drive.google.com/file/d/1Jk64p0H5W-hl5oB5tNhFd9An-NdNXq3l/view?usp=sharing"
              },
              {
                name: "3. Trường hợp bằng nhau cạnh huyền-góc nhọn",
                link: "https://drive.google.com/file/d/1upjr8zH0BpkbkkK50oLvvFHp8Tpo3uwZ/view?usp=sharing"
              },
              {
                name: "4. MV Trường hợp cạnh huyền-cạnh góc vuông",
                link: "https://drive.google.com/file/d/1x5y5xK-M5PxKQKv3KNnHFXUQSQxr6yq4/view?usp=sharing"
              }
            ]}

          />


        </div>




      </motion.div>

    </section>
  );
};

export default KyNangTuHoc;
