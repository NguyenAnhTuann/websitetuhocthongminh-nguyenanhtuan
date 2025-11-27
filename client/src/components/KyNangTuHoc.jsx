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


const KyNangTuHoc = ({ language }) => {
  const [openPDF, setOpenPDF] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const [showFolder1, setShowFolder1] = useState(false);
  const [activeTab, setActiveTab] = useState("intro"); // intro | pdf | video


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
                  <p className="text-sm text-gray-500">Nhấn để mở video</p>
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
                setActiveTab("pdf");
                setOpenPDF(true);      // luôn mở menu khi bấm
                setOpenVideo(false);   // tắt menu video khi chọn PDF
                setSelectedFolder(null);
              }}

              className={`p-3 rounded-lg cursor-pointer transition
        ${activeTab === "pdf" ? "bg-[#1c7c76] text-white" : "hover:bg-gray-100"}`}
            >
              Tài liệu PDF
            </li>

            {/* DANH SÁCH FOLDER PDF */}
            {openPDF && activeTab === "pdf" && (
              <ul className="pl-5 space-y-2 text-sm">
                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => setSelectedFolder("pdf_ai")}
                >
                  Tài liệu AI
                </li>
                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => setSelectedFolder("pdf_forest")}
                >
                  Forest – Trồng cây ảo
                </li>
                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => setSelectedFolder("pdf_pomodoro")}
                >
                  Pomodoro
                </li>
                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => setSelectedFolder("pdf_calendar")}
                >
                  Google Calendar
                </li>
              </ul>
            )}

            {/* VIDEO */}
            <li
              onClick={() => {
                setActiveTab("video");
                setOpenVideo(true);
                setOpenPDF(false);
                setSelectedFolder(null);
              }}

              className={`p-3 rounded-lg cursor-pointer transition
        ${activeTab === "video" ? "bg-[#1c7c76] text-white" : "hover:bg-gray-100"}`}
            >
              Video – Hình ảnh
            </li>

            {/* NỘI DUNG HIỆN THEO FOLDER ĐƯỢC CHỌN */}

            {openVideo && activeTab === "video" && (
              <ul className="pl-5 space-y-2 text-sm">
                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => setSelectedFolder("video_math")}
                >
                  Video Giải Toán
                </li>

                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => setSelectedFolder("video_real")}
                >
                  Video Thực Tế
                </li>

                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => setSelectedFolder("video_ai")}
                >
                  Video AI
                </li>
              </ul>
            )}




          </ul>
        </aside>


        {/* MAIN CONTENT BÊN PHẢI */}
        <main className="flex-1 w-full">

          {activeTab === "intro" && (
            <div className="max-w-4xl mx-auto bg-[#f8fffe] border border-[#d8efea] shadow-sm 
rounded-2xl p-8 text-center">

              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1c7c76] mb-3">
                Kỹ năng tự học là gì?
              </h2>

              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                Kỹ năng tự học giúp học sinh – sinh viên chủ động khám phá kiến thức, quản lý thời gian
                hiệu quả, rèn luyện tư duy độc lập và thích ứng với sự thay đổi nhanh chóng của kỷ nguyên số.
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
                    Tổng hợp tài liệu Google Drive giúp rèn luyện tư duy, nắm phương pháp học tập hiện đại.
                  </p>
                </div>

                {/* Item 2 */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                  <div className="w-12 h-12 mx-auto bg-[#A8DCD2] rounded-xl flex items-center justify-center mb-4">
                    <Images className="w-6 h-6 text-[#1c7c76]" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Video – Hình ảnh</h3>
                  <p className="text-sm text-gray-600">
                    Video minh họa, dự án thực tế giúp học sinh tiếp thu dễ dàng và vận dụng vào cuộc sống.
                  </p>
                </div>

                {/* Item 3 */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                  <div className="w-12 h-12 mx-auto bg-[#A8DCD2] rounded-xl flex items-center justify-center mb-4">
                    <MessageCircle className="w-6 h-6 text-[#1c7c76]" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Công cụ hỗ trợ</h3>
                  <p className="text-sm text-gray-600">
                    Kết hợp AI ChatBot và phương pháp Pomodoro – Forest giúp học sinh học hiệu quả hơn.
                  </p>
                </div>

              </div>

              {/* FOOT TEXT */}
              <p className="mt-8 text-sm md:text-base text-gray-600 leading-relaxed">
                Mục <span className="font-semibold text-[#1c7c76]">Kỹ năng tự học</span> được xây dựng nhằm
                hỗ trợ học sinh – sinh viên hình thành thói quen học tập chủ động, linh hoạt và bền vững.
              </p>
            </div>

          )}

          {activeTab === "pdf" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full bg-white border border-gray-200 rounded-2xl p-8 shadow-md mb-12"
            >
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 flex items-center justify-center gap-2">
                <FileText className="text-[#3C9E8F] w-6 h-6" />
                Danh sách tài liệu
              </h2>

              {/* === HIỂN THỊ DANH SÁCH FILE THEO FOLDER === */}

              {selectedFolder === "pdf_ai" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      name: "Sáng tác bài hát bằng AI - Suno",
                      link: "https://drive.google.com/file/d/14rvbx4P6vzL1-4q5R8Vr24KUIwNeuDvp/view?usp=sharing",
                      thumbnail:
                        "https://res.cloudinary.com/duk8odqun/image/upload/v1764069102/Gemini_Generated_Image_txhshdtxhshdtxhs_1_xgnng6.png",
                    },
                    {
                      name: "Một số tài nguyên về AI tham khảo thêm",
                      link: "https://drive.google.com/file/d/1Eq7ySlDTm36X7mn6qELGaS2ve72rAU2E/view?usp=sharing",
                      thumbnail:
                        "https://res.cloudinary.com/duk8odqun/image/upload/v1764069222/sdfsf_qlanon.png",
                    },
                  ].map((pdf, i) => (
                    <a
                      key={i}
                      target="_blank"
                      href={pdf.link}
                      className="block bg-white border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                    >
                      {pdf.thumbnail && (
                        <img className="w-full object-cover" src={pdf.thumbnail} />
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900">{pdf.name}</h3>
                        <p className="text-gray-500 text-sm">Nhấn để mở PDF</p>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {selectedFolder === "pdf_forest" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      name: "Cách dùng Forest",
                      link: "https://drive.google.com/file/d/1TVDHX4HbOfKZJQgSmgnvrwMwWjpZMKpD/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764076070/Gemini_Generated_Image_5xjtyz5xjtyz5xjt_mvasub.png"
                    }
                  ].map((pdf, i) => (
                    <a
                      key={i}
                      target="_blank"
                      href={pdf.link}
                      className="block bg-white border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                    >
                      {pdf.thumbnail && (
                        <img src={pdf.thumbnail} className="w-full object-cover" />
                      )}

                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900">{pdf.name}</h3>
                        <p className="text-gray-500 text-sm">Nhấn để mở PDF</p>
                      </div>
                    </a>
                  ))}
                </div>
              )}


              {selectedFolder === "pdf_pomodoro" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      name: "Pomodoro là gì?",
                      link: "https://drive.google.com/file/d/150MccvFhqCnwzSigYLikSYyGSII64-gn/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764076353/Gemini_Generated_Image_hg1gtohg1gtohg1g_efan9e.png"  // 👈 THÊM DÒNG NÀY
                    },
                    {
                      name: "Top ứng dụng Pomodoro",
                      link: "https://drive.google.com/file/d/1MOSBCLm6Nx4rDoYORNSUKNbUe1UOSf0m/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764076595/Gemini_Generated_Image_631sb2631sb2631s_k8dtuy.png"  // 👈 THÊM DÒNG NÀY
                    }
                  ].map((pdf, i) => (
                    <a key={i} target="_blank" href={pdf.link} className="block bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
                      {pdf.thumbnail && <img src={pdf.thumbnail} className="w-full object-cover" />}

                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900">{pdf.name}</h3>
                        <p className="text-gray-500 text-sm">Nhấn để mở PDF</p>
                      </div>
                    </a>
                  ))}
                </div>
              )}


              {selectedFolder === "pdf_calendar" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      name: "Cách sử dụng Google Calendar",
                      link: "https://drive.google.com/file/d/1PsyqHSNy1ub-wdwcORryCkyIwFtDuXgQ/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764076691/Gemini_Generated_Image_ibafz7ibafz7ibaf_joakci.png"   // 👈 THÊM 1 DÒNG
                    }
                  ].map((pdf, i) => (
                    <a key={i} href={pdf.link} target="_blank" className="block bg-white rounded-xl border shadow-sm transition overflow-hidden">
                      {pdf.thumbnail && <img src={pdf.thumbnail} className="w-full object-cover" />}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{pdf.name}</h3>
                        <p className="text-sm text-gray-500">Nhấn để mở PDF</p>
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


          {activeTab === "video" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full bg-white border border-gray-200 rounded-2xl p-8 shadow-md mb-12"
            >
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 flex items-center justify-center gap-2">
                🎬 Danh sách video
              </h2>

              {/* === HIỂN THỊ VIDEO THEO FOLDER === */}

              {/* VIDEO GIẢI TOÁN */}
              {selectedFolder === "video_math" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      name: "VIDEO CÁCH TÌM TRỌNG TÂM TAM GIÁC",
                      link: "https://drive.google.com/file/d/19Q-R-p83n763T9ymvhrcb6YBADEtEMfb/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764069225/sfsdf_da6qpj.png"
                    },
                    {
                      name: "GÓC GIỮA HAI MẶT",
                      link: "https://drive.google.com/file/d/1kJNGevsvSxtkgzr3GyKrPJc_niX8I414/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764069225/dgfdr_i4iu80.png"
                    },
                    {
                      name: "CÁCH VẼ HÌNH LẬP PHƯƠNG",
                      link: "https://drive.google.com/file/d/17LxPeTNUUuu7LgmaIaMmS-IUcP4wglDG/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764077648/Gemini_Generated_Image_wbqooywbqooywbqo_zqdno3.png"
                    },
                    {
                      name: "CÁCH VẼ HÌNH CHÓP ĐỀU",
                      link: "https://drive.google.com/file/d/1xzdwhwAnkMlhywd9TCW6JABdBf9qr2ML/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764077648/Gemini_Generated_Image_3shffn3shffn3shf_cmnqrq.png"
                    },
                    {
                      name: "CÁCH TÌM TOẠ ĐỘ ĐIỂM TRONG Oxyz",
                      link: "https://drive.google.com/file/d/12KKBUHMw3PjJ3V1Z0B5te-cvaNRYecds/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764077649/Gemini_Generated_Image_nx3c8qnx3c8qnx3c_stdtbp.png"
                    },
                    {
                      name: "CÁC BƯỚC TÌM GÓC GIỮA ĐƯỜNG VÀ MẶT",
                      link: "https://drive.google.com/file/d/1YMAI8Mzl-_N9Z6jkU9QaiO7PeFZq9EuQ/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764077649/Gemini_Generated_Image_dh94sfdh94sfdh94_p38kvw.png"
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
                        <p className="text-sm text-gray-500">Nhấn để mở video</p>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {/* VIDEO TOÁN THỰC TẾ */}
              {selectedFolder === "video_real" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      name: "SGK Đường đi máy bay Oxyz",
                      link: "https://drive.google.com/file/d/1Z5rp-6SMILH_5wy53DNqkfzwB2dNiX_I/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764078414/Gemini_Generated_Image_yr3vcnyr3vcnyr3v_mft2gq.png"
                    },
                    {
                      name: "Lực tác động vào vật",
                      link: "https://drive.google.com/file/d/1WM_gJQq0sSlMDVp-KvH7AOtY0VCG6ZOA/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764078414/Gemini_Generated_Image_ib5i4pib5i4pib5i_l8okpv.png"
                    },
                    {
                      name: "Định lý Sin thực tế",
                      link: "https://drive.google.com/file/d/1hOg7Qzbi1B4Yfauz4w2py46EcSqmlxTE/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764078415/Gemini_Generated_Image_z51do6z51do6z51d_sfpnzg.png"
                    }
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
                        <p className="text-sm text-gray-500">Nhấn để mở video</p>
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
                      name: "1. MV Trường hợp hai cạnh góc vuông",
                      link: "https://drive.google.com/file/d/16tvRxAdPyJiL7SaOOdIXxZCtDuXu7n9a/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764078414/Gemini_Generated_Image_cbwxytcbwxytcbwx_ziub39.png"
                    },
                    {
                      name: "2. MV Trường hợp cạnh góc vuông-góc nhọn kề",
                      link: "https://drive.google.com/file/d/1Jk64p0H5W-hl5oB5tNhFd9An-NdNXq3l/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764078414/Gemini_Generated_Image_8q00x08q00x08q00_bnbibf.png"
                    },
                    {
                      name: "3. Trường hợp bằng nhau cạnh huyền-góc nhọn",
                      link: "https://drive.google.com/file/d/1upjr8zH0BpkbkkK50oLvvFHp8Tpo3uwZ/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764078415/Gemini_Generated_Image_3mxtz93mxtz93mxt_m57ih4.png"
                    },
                    {
                      name: "4. MV Trường hợp cạnh huyền-cạnh góc vuông",
                      link: "https://drive.google.com/file/d/1x5y5xK-M5PxKQKv3KNnHFXUQSQxr6yq4/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764078416/Gemini_Generated_Image_fq6xlyfq6xlyfq6x_ua87e5.png"
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

export default KyNangTuHoc;
