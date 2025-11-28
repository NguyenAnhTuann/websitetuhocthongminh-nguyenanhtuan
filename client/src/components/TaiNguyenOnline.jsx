import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Images,
  MessageCircle
} from "lucide-react";


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


const TaiNguyenOnline = ({ language }) => {
  const [openPDF, setOpenPDF] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const [showFolder1, setShowFolder1] = useState(false);
  const [activeTab, setActiveTab] = useState("intro"); // intro | pdf | video


  const t = {
    vi: {
      title: "TÀI NGUYÊN ONLINE",
      subtitle:
        "Kho học liệu số miễn phí dành cho học sinh – sinh viên: PDF, video, bài giảng, công cụ hỗ trợ và tài nguyên học tập.",

      pdfTitle: "Tài liệu PDF",
      pdf1: "Ebook – Bài giảng – Tài liệu tham khảo",
      pdf2: "Tài nguyên học tập giúp nâng cao kỹ năng và kiến thức",

      mediaTitle: "Video – Hình ảnh – Bài giảng",
      mediaDesc:
        "Tổng hợp video minh họa, bài giảng trực quan giúp việc học trở nên dễ hiểu và sinh động."
    },

    en: {
      title: "ONLINE RESOURCES",
      subtitle:
        "A free digital learning library for students: PDF documents, videos, lectures, tools, and study materials.",

      pdfTitle: "PDF Documents",
      pdf1: "E-books – Lecture notes – Reference materials",
      pdf2: "Learning resources to enhance knowledge and skills",

      mediaTitle: "Videos – Visuals – Lectures",
      mediaDesc:
        "A collection of visual content and lectures to support effective and engaging learning."
    }
  };


  //------------------------------------------------------
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
          <div className="mt-4 space-y-6">
            {pdfs.map((pdf, i) => (
              <a
                key={i}
                href={pdf.link}
                target="_blank"
                className="block bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden"
              >
                {/* Ảnh to nằm trên */}
                {pdf.thumbnail && (
                  <img
                    src={pdf.thumbnail}
                    alt={pdf.name}
                    className="w-full h-full object-cover"
                  />
                )}

                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {pdf.name}
                  </h4>
                  <p className="text-sm text-gray-500">Nhấn để mở PDF</p>
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
          <div className="mt-4 space-y-6">
            {videos.map((v, i) => (
              <a
                key={i}
                href={v.link}
                target="_blank"
                className="block bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden"
              >
                {/* Ảnh to nằm trên */}
                {v.thumbnail && (
                  <img
                    src={v.thumbnail}
                    alt={v.name}
                    className="w-full h-full object-cover"
                  />
                )}

                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {v.name}
                  </h4>
                  <p className="text-sm text-gray-500">Nhấn để mở tài liệu</p>
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
    <section className="min-h-screen w-full px-4 py-20 bg-white max-w-7xl mx-auto">

      {/* ======= TIÊU ĐỀ ======= */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto text-center block
             text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-outfit
             bg-[#1c7c76] px-6 py-4 rounded-2xl shadow-sm"
      >
        {t[language].title}
      </motion.h1>


      <Typewriter text={t[language].subtitle} />


      <div className="mt-10 w-full max-w-7xl mx-auto flex gap-6">

        {/* SIDEBAR Trái */}
        <aside className="w-64 h-fit bg-white border rounded-2xl shadow p-5">
          <ul className="space-y-3">

            {/* GIỚI THIỆU */}
            <li
              onClick={() => {
                setActiveTab("intro");
                setSelectedFolder(null);
              }}
              className={`p-3 rounded-lg cursor-pointer transition
        ${activeTab === "intro" ? "bg-[#1c7c76] text-white" : "hover:bg-gray-100"}`}
            >
              Giới thiệu
            </li>

            {/* PDF */}
            <li
              onClick={() => {
                setActiveTab("violence");
                setSelectedFolder("violence_videos"); // auto load
                setOpenPDF(false);
                setOpenVideo(false);
              }}
              className={`p-3 rounded-lg cursor-pointer transition
${activeTab === "violence" ? "bg-[#1c7c76] text-white" : "hover:bg-gray-100"}`}
            >
              Bạo lực học đường
            </li>



            {/* VIDEO */}
            <li
              onClick={() => {
                setActiveTab("video");
                setOpenVideo(true);
                setOpenPDF(false);
                setSelectedFolder("video_main"); // ✔ load 3 video mặc định
              }}


              className={`p-3 rounded-lg cursor-pointer transition
        ${activeTab === "video" ? "bg-[#1c7c76] text-white" : "hover:bg-gray-100"}`}
            >
              An toàn mạng
            </li>

            {/* NỘI DUNG HIỆN THEO FOLDER ĐƯỢC CHỌN */}

            {openVideo && activeTab === "video" && (
              <ul className="pl-5 space-y-2 text-sm">
                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => setSelectedFolder("video_math")}
                >
                  Lợi ích, rủi ro và giải pháp an toàn trên không gian mạng
                </li>

                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => setSelectedFolder("video_real")}
                >
                  Cẩm nang sử dụng mạng an toàn
                </li>
              </ul>
            )}




          </ul>
        </aside>


        {/* MAIN CONTENT BÊN PHẢI */}
        <main className="flex-1 w-full">

          {activeTab === "intro" && (
            <div className="max-w-4xl mx-auto  bg-[#f8fffe] border border-[#d8efea] shadow-sm 
rounded-2xl p-8 text-center">

              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1c7c76] mb-3">
                Tài nguyên online là gì?
              </h2>

              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                Tài nguyên online cung cấp cho học sinh – sinh viên những tài liệu, video và
                hình ảnh minh họa giúp rèn luyện kỹ năng ứng xử, phòng tránh rủi ro trên
                không gian mạng và xây dựng hành vi văn minh trong cuộc sống.
              </p>

              {/* 3 FEATURE GRID */}
              <div className="grid md:grid-cols-3 gap-6 mt-6">

                {/* Item 1 */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                  <div className="w-12 h-12 mx-auto bg-[#A8DCD2] rounded-xl flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-[#1c7c76]" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Tài liệu PDF</h3>
                  <p className="text-sm text-gray-600">
                    Tổng hợp tài liệu PDF về an toàn mạng, bạo lực học đường và kỹ năng ứng xử trong đời sống.
                  </p>
                </div>

                {/* Item 2 */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                  <div className="w-12 h-12 mx-auto bg-[#A8DCD2] rounded-xl flex items-center justify-center mb-4">
                    <Images className="w-6 h-6 text-[#1c7c76]" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Video – Hình ảnh</h3>
                  <p className="text-sm text-gray-600">
                    Hình ảnh minh họa và video thực tế giúp học sinh dễ dàng nhận diện tình huống và cách xử lý.
                  </p>
                </div>

                {/* Item 3 */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                  <div className="w-12 h-12 mx-auto bg-[#A8DCD2] rounded-xl flex items-center justify-center mb-4">
                    <MessageCircle className="w-6 h-6 text-[#1c7c76]" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Tương tác & hỗ trợ</h3>
                  <p className="text-sm text-gray-600">
                    Công cụ chatbot hỗ trợ giải đáp thắc mắc và hướng dẫn học sinh ứng xử an toàn – văn minh.
                  </p>
                </div>

              </div>

              {/* FOOT TEXT */}
              <p className="mt-8 text-sm md:text-base text-gray-600 leading-relaxed">
                Mục <span className="font-semibold text-[#1c7c76]">Tài nguyên online</span> được
                xây dựng nhằm hỗ trợ học sinh – sinh viên trang bị kiến thức, kỹ năng và thái độ
                cần thiết để bảo vệ bản thân trong học tập và đời sống số.
              </p>

            </div>

          )}





          {activeTab === "video" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full bg-white border border-gray-200 rounded-2xl p-8 shadow-md mb-12"
            >
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 flex items-center justify-center gap-2">
                <FileText className="text-[#3C9E8F] w-6 h-6" />
                Danh sách tài liệu
              </h2>

              {selectedFolder === "video_main" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {[
                    {
                      name: "TIN GIẢ",
                      link: "https://drive.google.com/file/d/1etugj85jn76wEu1B4dmeYnEdGV7MT2EB/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764142491/Gemini_Generated_Image_76ecuj76ecuj76ec_vxenvr.png"
                    },
                    {
                      name: "NHẬN ĐƯỢC TIN NHẮN TRÚNG THƯỞNG",
                      link: "https://drive.google.com/file/d/1pdJgMQvHE91Lm8J-yluWbelMHLhPnYbw/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764142480/Gemini_Generated_Image_xtz6arxtz6arxtz6_sloi54.png"
                    },
                    {
                      name: "LỪA NẠP TIỀN, MẤT TÀI KHOẢN GAME",
                      link: "https://drive.google.com/file/d/1cb5GryPeOGqXGL45x19K2p4ivSdGc1Ep/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764142477/Gemini_Generated_Image_bqv3dgbqv3dgbqv3_vk86wv.png"
                    },
                    {
                      name: "LỘ THÔNG TIN CÁ NHÂN, VỊ TRÍ, ẢNH",
                      link: "https://drive.google.com/file/d/1t2hTPdcdA6KrI3v9a5qhw53nQFDm75cG/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764142473/Gemini_Generated_Image_x846ycx846ycx846_btfsq0.png"
                    },
                    {
                      name: "GÀI BẪY TÌNH, ĐE DỌA ĐĂNG ẢNH ĐỂ TỐNG TIỀN",
                      link: "https://drive.google.com/file/d/1YRXKqPMnQRravqlY8OcIMS8IMr3QK_oz/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764142467/Gemini_Generated_Image_etklp2etklp2etkl_ivqknn.png"
                    },
                    {
                      name: "ĐĂNG HÀNH VI BẠO LỰC LÊN MẠNG ĐỂ CÂU LIKE",
                      link: "https://drive.google.com/file/d/1lnk-MfznE3VoCgdeweMpvtPrUi8oiZXT/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764142481/Gemini_Generated_Image_tlg041tlg041tlg0_bzbjyl.png"
                    },
                    {
                      name: "ĐĂNG HÀNH VI BẠO LỰC ĐỂ CÂU LIKE",
                      link: "https://drive.google.com/file/d/1lnk-MfznE3VoCgdeweMpvtPrUi8oiZXT/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764142471/Gemini_Generated_Image_6ng6bt6ng6bt6ng6_i8ekfj.png"
                    }

                  ].map((v, i) => (
                    <a
                      key={i}
                      href={v.link}
                      target="_blank"
                      className="block bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden"
                    >
                      {v.thumbnail && (
                        <img src={v.thumbnail} className="w-full object-cover" />
                      )}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900">{v.name}</h3>
                        <p className="text-sm text-gray-500">Nhấn để mở vieo</p>
                      </div>
                    </a>
                  ))}

                </div>
              )}

              {selectedFolder === "video_math" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      name: "LỢI ÍCH, RỦI RO VÀ GIẢI PHÁP AN TOÀN TRÊN KHÔNG GIAN MẠNG",
                      link: "https://drive.google.com/file/d/1z2P3QBo0GXelf2UqX_hXtGzGUNC7yGvB/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764142473/Gemini_Generated_Image_58ragp58ragp58ra_jfd7t4.png"
                    },
                  
                  ].map((v, i) => (
                    <a
                      key={i}
                      href={v.link}
                      target="_blank"
                      className="block bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden"
                    >
                      {v.thumbnail && (
                        <img src={v.thumbnail} className="w-full object-cover" />
                      )}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900">{v.name}</h3>
                        <p className="text-sm text-gray-500">Nhấn để tài liệu</p>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {selectedFolder === "video_real" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      name: "CHIA SẺ VỀ TÌNH HUỐNG MẤT KIỂM SOÁT AN TOÀN TRÊN KHÔNG GIAN MẠNG",
                      link: "https://drive.google.com/file/d/1Zbet2-wOLsg9NKc43MeQbksqnjMQ3FZm/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764142475/Gemini_Generated_Image_kjwz2pkjwz2pkjwz_jv8n7j.png"
                    },
                  ].map((v, i) => (
                    <a
                      key={i}
                      href={v.link}
                      target="_blank"
                      className="block bg-white border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                    >
                      {v.thumbnail && (
                        <img src={v.thumbnail} className="w-full object-cover" />
                      )}

                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900">{v.name}</h3>
                        <p className="text-sm text-gray-500">Nhấn để mở tài liệu</p>
                      </div>
                    </a>
                  ))}
                </div>
              )}


              {/* VIDEO AI */}
              {selectedFolder === "video_ai" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      name: "Top 13 Các Công Ty Startup Việt Nam Hứa Hẹn Thành Công Nhất",
                      link: "https://drive.google.com/file/d/1clocMDzOBCMyfM1MGlOPb50EC9Xh_zGm/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764137144/Gemini_Generated_Image_t2mdozt2mdozt2md_zq5xjj.png"
                    },
                    {
                      name: "Thích Kinh Doanh Nên Học Ngành Gì",
                      link: "https://drive.google.com/file/d/1JCoXTpi470cfdHChNNxOGwSNtzhhYAFP/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764137139/Gemini_Generated_Image_27mio027mio027mi_g78lsa.png"
                    },
                    {
                      name: "Nhân Viên Xuất Nhập Khẩu Là Gì",
                      link: "https://drive.google.com/file/d/1JaT93jUBSjFYf0kJWydX6bkOiHdz2pkR/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764137149/Gemini_Generated_Image_afu6ycafu6ycafu6_qcqdsu.png"
                    },
                    {
                      name: "Nhân Viên Vật Tư Làm Công Việc Gì",
                      link: "https://drive.google.com/file/d/19O-geMkBKa1hToUhW43CGcTT-0u5HAFt/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764137141/Gemini_Generated_Image_ugzo43ugzo43ugzo_qxyqus.png"
                    },
                    {
                      name: "Nhân Viên Văn Phòng Là Gì",
                      link: "https://drive.google.com/file/d/1optU3j3ctt5SXFA2CD6nNFXCiA2jnOFq/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764137139/Gemini_Generated_Image_d4as44d4as44d4as_fd9dtv.png"
                    },
                    {
                      name: "Nhân Viên Tư Vấn Tuyển Sinh Là Làm Gì",
                      link: "https://drive.google.com/file/d/1I7EMrdlhPV5PsclU396IvwYo3s6jr7CZ/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764137134/Gemini_Generated_Image_f8c4yff8c4yff8c4_m4jdwi.png"
                    },
                    {
                      name: "Nhân Viên Sale Tour Là Gì Và Kỹ Năng Sale Tour Hiệu Quả 2022",
                      link: "https://drive.google.com/file/d/1CTalu4x9C877N1aRtzLPufJr6w6QGnrd/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764137133/Gemini_Generated_Image_qjq5lrqjq5lrqjq5_qifyjh.png"
                    },
                    {
                      name: "Ngành Kỹ Sư Nông Nghiệp Làm Gì",
                      link: "https://drive.google.com/file/d/1Ks3DbUSG4xLJIlKKlaEa5eQpew3A1FwG/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764137135/Gemini_Generated_Image_tnanq7tnanq7tnan_dnbbrq.png"
                    },
                    {
                      name: "Kỹ Sư Môi Trường Là Gì Và Làm Gì",
                      link: "https://drive.google.com/file/d/1Ks3DbUSG4xLJIlKKlaEa5eQpew3A1FwG/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764137141/Gemini_Generated_Image_fjccxxfjccxxfjcc_xvddbs.png"
                    },
                    {
                      name: "Định Hướng Nghề Nghiệp Cho Tương Lai Không Khó Như Bạn Nghĩ",
                      link: "https://drive.google.com/file/d/1-yrI4DjrU3-sy8ZNpKqyl9IBTV3Y6C2m/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764137156/Gemini_Generated_Image_6c2ztb6c2ztb6c2z_gcr9nd.png"
                    },
                    {
                      name: "Đâu Là Điểm Khác Nhau Giữa Học Tập & Làm Việc",
                      link: "https://drive.google.com/file/d/18hI4yHKctk6eI8ceYBaFoedpMtw6Ddoo/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764137154/Gemini_Generated_Image_ysjqz6ysjqz6ysjq_m1iyk1.png"
                    },
                    {
                      name: "Chuyên Viên Khác Nhân Viên Như Thế Nào",
                      link: "https://drive.google.com/file/d/196z_Y1kemd5s2gWF8QC4-2PeyqxsTWzL/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764137152/Gemini_Generated_Image_ys9b8sys9b8sys9b_tzs8w1.png"
                    },
                    {
                      name: "Các Công Việc Làm Thêm Cho Sinh Viên Giúp Cải Thiện Tài Chính",
                      link: "https://drive.google.com/file/d/1N-WvUnEVOxFsQt5Ka8AEt8K7T13ZPiID/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764137155/Gemini_Generated_Image_4mzn5l4mzn5l4mzn_ugjgha.png"
                    }

                  ].map((v, i) => (
                    <a
                      key={i}
                      href={v.link}
                      target="_blank"
                      className="block bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden"
                    >
                      {v.thumbnail && (
                        <img src={v.thumbnail} className="w-full object-cover" />
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900">{v.name}</h3>
                        <p className="text-sm text-gray-500">Nhấn để mở video</p>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {/* CHƯA CHỌN FOLDER */}
              {!selectedFolder && (
                <p className="text-center text-gray-500">Hãy chọn thư mục bên trái.</p>
              )}
            </motion.div>
          )}


        </main>
      </div>


    </section>
  );
};

export default TaiNguyenOnline;
