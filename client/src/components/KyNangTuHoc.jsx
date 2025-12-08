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
  const [activeTab, setActiveTab] = useState("intro");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);



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
    <section className="min-h-screen w-full px-4 py-20 bg-white max-w-7xl mx-auto">

      {/* --- TIÊU ĐỀ CHÍNH --- */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 z-10 relative"
      >
        <h1 className="mt-6 md:mt-10 mx-auto text-center block text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-outfit bg-[#1c7c76] px-6 py-4 rounded-2xl shadow-sm">
          KỸ NĂNG TỰ HỌC
        </h1>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto text-lg">
          Nâng cao tư duy – Rèn luyện tinh thần tự chủ – Phát triển bản thân trong Kỷ nguyên số.
        </p>
      </motion.div>


      {/* <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10 z-10 relative"
            >
              <h1 className="mt-6 md:mt-10 mx-auto text-center block text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-outfit bg-[#1c7c76] px-6 py-4 rounded-2xl shadow-sm">
                TRỢ LÍ HỌC TẬP AI CHATBOT
              </h1>
              <p className="text-gray-500 mt-2 max-w-2xl mx-auto text-lg">
                Chọn môn học bạn cần hỗ trợ. Hệ thống AI sẽ giải đáp thắc mắc,
                hướng dẫn giải bài tập và ôn thi 24/7.
              </p>
            </motion.div>
             */}

      {/* --- PHỤ ĐỀ (SUBTITLE) --- */}
      {/* <Typewriter text={t[language].subtitle} /> */}


      <div className="mt-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:items-start">


        {/* NÚT MỞ SIDEBAR MOBILE */}
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="md:hidden w-full px-4 py-3 bg-[#1c7c76] text-white font-semibold rounded-xl shadow-sm"
        >
          ☰ Danh mục nội dung
        </button>

        {/* SIDEBAR Trái */}
        <motion.aside
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`
    w-full md:w-64 bg-white border rounded-2xl shadow p-5
    transition-all duration-300 
    ${mobileSidebarOpen ? "block" : "hidden md:block "}
  `}
        >


          <ul className="space-y-3">

            {/* GIỚI THIỆU */}
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                setActiveTab("intro");
                setSelectedFolder(null);
                setMobileSidebarOpen(false);
              }}

              className={`p-3 rounded-lg cursor-pointer transition
        ${activeTab === "intro" ? "bg-[#1c7c76] text-white" : "hover:bg-gray-100"}`}
            >
              Giới thiệu
            </motion.li>


            {/* VIDEO */}
            <li
              onClick={() => {
                setActiveTab("video");
                setOpenVideo(true);
                setOpenPDF(false);
                setSelectedFolder(null);
                // setMobileSidebarOpen(false);
              }}

              className={`p-3 rounded-lg cursor-pointer transition
        ${activeTab === "video" ? "bg-[#1c7c76] text-white" : "hover:bg-gray-100"}`}
            >
              Video
            </li>

            {/* NỘI DUNG HIỆN THEO FOLDER ĐƯỢC CHỌN */}

            {openVideo && activeTab === "video" && (
              <ul className="pl-5 space-y-2 text-sm">
                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => {
                    setSelectedFolder("video_math")
                    setMobileSidebarOpen(false);
                  }}

                >
                  Video giải toán
                </li>

                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => {
                    setSelectedFolder("video_real")
                    setMobileSidebarOpen(false);
                  }}
                >
                  Video Toán thực tế
                </li>

                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => {
                    setSelectedFolder("video_ai")
                    setMobileSidebarOpen(false);
                  }}
                >
                  Sáng tác nhạc bằng AI
                </li>


              </ul>
            )}



            {/* ẢNH */}
            <li
              onClick={() => {
                setActiveTab("hinhanh");
                setOpenVideo(false);
                setOpenPDF(false);
                setSelectedFolder(null);
                // setMobileSidebarOpen(false);
              }}
              className={`p-3 rounded-lg cursor-pointer transition
${activeTab === "hinhanh" ? "bg-[#1c7c76] text-white" : "hover:bg-gray-100"}`}
            >
              Hình ảnh
            </li>


            {/* NỘI DUNG HIỆN THEO FOLDER ĐƯỢC CHỌN */}

            {activeTab === "hinhanh" && (
              <ul className="pl-5 space-y-2 text-sm">
                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => {
                    setSelectedFolder("anh1")
                    setMobileSidebarOpen(false);
                  }}
                >
                  Sơ đồ tư duy toán lớp 10
                </li>
                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => {
                    setSelectedFolder("anh2")
                    setMobileSidebarOpen(false);
                  }}
                >
                  Sơ đồ tư duy toán lớp 11
                </li>
                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => {
                    setSelectedFolder("anh3")
                    setMobileSidebarOpen(false);
                  }}
                >
                  Sơ đồ tư duy toán lớp 12
                </li>
                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => {
                    setSelectedFolder("anh4")
                    setMobileSidebarOpen(false);
                  }}
                >
                  Kiến thức thú vị
                </li>
              </ul>
            )}


            {/* PDF */}
            <li
              onClick={() => {
                setActiveTab("pdf");
                setOpenPDF(true);
                setOpenVideo(false);
                setSelectedFolder(null);
                // setMobileSidebarOpen(false); 
              }}

              className={`p-3 rounded-lg cursor-pointer transition
        ${activeTab === "pdf" ? "bg-[#1c7c76] text-white" : "hover:bg-gray-100"}`}
            >
              Tài liệu tham khảo PDF
            </li>

            {/* DANH SÁCH FOLDER PDF */}
            {openPDF && activeTab === "pdf" && (
              <ul className="pl-5 space-y-2 text-sm">
                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => {
                    setSelectedFolder("pdf_ai")
                    setMobileSidebarOpen(false);
                  }}
                >
                  Tài liệu AI
                </li>
                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => {
                    setSelectedFolder("pdf_forest")
                    setMobileSidebarOpen(false);
                  }}
                >
                  Forest – Trồng cây ảo
                </li>
                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => {
                    setSelectedFolder("pdf_pomodoro")
                    setMobileSidebarOpen(false);
                  }}
                >
                  Pomodoro
                </li>
                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => {
                    setSelectedFolder("pdf_calendar")
                    setMobileSidebarOpen(false);
                  }}
                >
                  Google Calendar
                </li>
              </ul>
            )}


            {/* Khám phá kiến thức */}
            <li
              onClick={() => {
                setActiveTab("khampha");
                setOpenPDF(true);
                setOpenVideo(false);
                setSelectedFolder(null);
                // setMobileSidebarOpen(false); 
              }}

              className={`p-3 rounded-lg cursor-pointer transition
        ${activeTab === "khampha" ? "bg-[#1c7c76] text-white" : "hover:bg-gray-100"}`}
            >
              Khám phá kiến thức
            </li>

            {/* DANH SÁCH FOLDER PDF */}
            {openPDF && activeTab === "khampha" && (
              <ul className="pl-5 space-y-2 text-sm">
                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => {
                    setSelectedFolder("khampha1")
                    setMobileSidebarOpen(false);
                  }}
                >
                  Link Tiktok
                </li>
                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => {
                    setSelectedFolder("khampha3")
                    setMobileSidebarOpen(false);
                  }}
                >
                  Ielts-fighter
                </li>

                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => {
                    setSelectedFolder("khampha2")
                    setMobileSidebarOpen(false);
                  }}
                >
                  Geogebra
                </li>

                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => {
                    setSelectedFolder("khampha4")
                    setMobileSidebarOpen(false);
                  }}
                >
                  Moon VN
                </li>
              </ul>
            )}


          </ul>
        </motion.aside>


        {/* MAIN CONTENT BÊN PHẢI */}
        <main className="flex-1 w-full">

          {activeTab === "intro" && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto bg-[#f8fffe] border border-[#d8efea] shadow-sm 
  rounded-2xl p-8 text-center"
            >


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
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                >

                  <div className="w-12 h-12 mx-auto bg-[#A8DCD2] rounded-xl flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-[#1c7c76]" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Tài liệu PDF</h3>
                  <p className="text-sm text-gray-600">
                    Tổng hợp tài liệu Google Drive giúp rèn luyện tư duy, nắm phương pháp học tập hiện đại.
                  </p>
                </motion.div>

                {/* Item 2 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                >

                  <div className="w-12 h-12 mx-auto bg-[#A8DCD2] rounded-xl flex items-center justify-center mb-4">
                    <Images className="w-6 h-6 text-[#1c7c76]" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Video – Hình ảnh</h3>
                  <p className="text-sm text-gray-600">
                    Video minh họa, dự án thực tế giúp học sinh tiếp thu dễ dàng và vận dụng vào cuộc sống.
                  </p>
                </motion.div>

                {/* Item 3 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                >

                  <div className="w-12 h-12 mx-auto bg-[#A8DCD2] rounded-xl flex items-center justify-center mb-4">
                    <MessageCircle className="w-6 h-6 text-[#1c7c76]" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Công cụ hỗ trợ</h3>
                  <p className="text-sm text-gray-600">
                    Kết hợp AI ChatBot và phương pháp Pomodoro – Forest giúp học sinh học hiệu quả hơn.
                  </p>
                </motion.div>

              </div>

              {/* FOOT TEXT */}
              <p className="mt-8 text-sm md:text-base text-gray-600 leading-relaxed">
                Mục <span className="font-semibold text-[#1c7c76]">Kỹ năng tự học</span> được xây dựng nhằm
                hỗ trợ học sinh – sinh viên hình thành thói quen học tập chủ động, linh hoạt và bền vững.
              </p>
            </motion.div>

          )}

          {activeTab === "pdf" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full bg-white border border-gray-200 rounded-2xl p-8 shadow-md mb-12"
            >
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 flex items-center justify-center gap-2">
                📄 Danh sách tài liệu
              </h2>

              {/* === HIỂN THỊ DANH SÁCH FILE THEO FOLDER === */}

              {selectedFolder === "pdf_ai" && (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
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
                        <motion.img
                          src={pdf.thumbnail}
                          className="w-full object-cover"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}

                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900">{pdf.name}</h3>
                        <p className="text-gray-500 text-sm">Nhấn để mở PDF</p>
                      </div>
                    </a>
                  ))}
                </motion.div>
              )}

              {selectedFolder === "pdf_forest" && (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
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
                        <motion.img
                          src={pdf.thumbnail}
                          className="w-full object-cover"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}

                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900">{pdf.name}</h3>
                        <p className="text-gray-500 text-sm">Nhấn để mở PDF</p>
                      </div>
                    </a>
                  ))}
                </motion.div>
              )}


              {selectedFolder === "pdf_pomodoro" && (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
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
                      {pdf.thumbnail && <motion.img
                        src={pdf.thumbnail}
                        className="w-full object-cover"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      />}

                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900">{pdf.name}</h3>
                        <p className="text-gray-500 text-sm">Nhấn để mở PDF</p>
                      </div>
                    </a>
                  ))}
                </motion.div>
              )}


              {selectedFolder === "pdf_calendar" && (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {[
                    {
                      name: "Cách sử dụng Google Calendar",
                      link: "https://drive.google.com/file/d/1PsyqHSNy1ub-wdwcORryCkyIwFtDuXgQ/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764076691/Gemini_Generated_Image_ibafz7ibafz7ibaf_joakci.png"   // 👈 THÊM 1 DÒNG
                    }
                  ].map((pdf, i) => (
                    <a key={i} href={pdf.link} target="_blank" className="block bg-white rounded-xl border shadow-sm transition overflow-hidden">
                      {pdf.thumbnail && <motion.img
                        src={pdf.thumbnail}
                        className="w-full object-cover"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      />}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{pdf.name}</h3>
                        <p className="text-sm text-gray-500">Nhấn để mở PDF</p>
                      </div>
                    </a>
                  ))}
                </motion.div>
              )}


              {/* CHƯA CHỌN FOLDER */}
              {!selectedFolder && (
                <p className="text-center text-gray-500">Hãy chọn file.</p>
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
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
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
                    <motion.a
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 }
                      }}
                      key={i}
                      href={v.link}
                      target="_blank"
                      className="block bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden"
                    >
                      {v.thumbnail && (
                        <motion.img
                          src={v.thumbnail}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      )}

                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900">{v.name}</h3>
                        <p className="text-sm text-gray-500">Nhấn để mở video</p>
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              )}

              {/* VIDEO TOÁN THỰC TẾ */}
              {selectedFolder === "video_real" && (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {[
                    {
                      name: "SGK ĐƯỜNG ĐI MÁY BAY Oxyz",
                      link: "https://drive.google.com/file/d/1Z5rp-6SMILH_5wy53DNqkfzwB2dNiX_I/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764078414/Gemini_Generated_Image_yr3vcnyr3vcnyr3v_mft2gq.png"
                    },
                    {
                      name: "LỰC TÁC ĐỘNG VẬT LÝ",
                      link: "https://drive.google.com/file/d/1WM_gJQq0sSlMDVp-KvH7AOtY0VCG6ZOA/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764078414/Gemini_Generated_Image_ib5i4pib5i4pib5i_l8okpv.png"
                    },
                    {
                      name: "ĐỊNH LÝ SIN THỰC TẾ",
                      link: "https://drive.google.com/file/d/1hOg7Qzbi1B4Yfauz4w2py46EcSqmlxTE/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764078415/Gemini_Generated_Image_z51do6z51do6z51d_sfpnzg.png"
                    },
                    {
                      name: "TIẾP CẬN CẤP SỐ CỘNG",
                      link: "https://drive.google.com/file/d/1LSZQ40WcWMf_FHJbtKjosgU2ZXVC42uv/view?usp=sharing",
                      thumbnail: ""
                    },
                    {
                      name: "SỰ CHUYỂN HÓA CỦA NĂNG LƯỢNG",
                      link: "https://drive.google.com/file/d/1KZjhkfSkkKi8w4ibSyD1Z5M6ayTEJm80/view?usp=sharing",
                      thumbnail: ""
                    },
                    {
                      name: "PHÉP CHIẾU SONG SONG",
                      link: "https://drive.google.com/file/d/1-GsSI2ORdJnsUgwA-2q4e7SgF-e9gyLZ/view?usp=sharing",
                      thumbnail: ""
                    },
                    {
                      name: "ĐO HAI ĐĂNG ĐỊNH LÝ SIN",
                      link: "https://drive.google.com/file/d/1ITNzeJcDk4WW6QuFPG07W7C-vYYtBbjC/view?usp=sharing",
                      thumbnail: ""
                    },
                    {
                      name: "C2 VECTO & HỆ TỌA ĐỘ 3D",
                      link: "https://drive.google.com/file/d/1h4jDqsdtAz6oeUYytvhehAec1fgE-nAb/view?usp=sharing",
                      thumbnail: ""
                    }
                  ].map((v, i) => (
                    <a
                      key={i}
                      href={v.link}
                      target="_blank"
                      className="block bg-white border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                    >
                      {v.thumbnail && (
                        <motion.img
                          src={v.thumbnail}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      )}


                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900">{v.name}</h3>
                        <p className="text-sm text-gray-500">Nhấn để mở video</p>
                      </div>
                    </a>
                  ))}
                </motion.div>
              )}


              {/* VIDEO AI */}
              {selectedFolder === "video_ai" && (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
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
                    <motion.a
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 }
                      }}
                      key={i}
                      href={v.link}
                      target="_blank"
                      className="block bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden"
                    >
                      {v.thumbnail && (
                        <motion.img
                          src={v.thumbnail}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      )}

                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900">{v.name}</h3>
                        <p className="text-sm text-gray-500">Nhấn để mở video</p>
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              )}


              {/* CHƯA CHỌN FOLDER */}
              {!selectedFolder && (
                <p className="text-center text-gray-500">Hãy chọn tài liệu.</p>
              )}


            </motion.div>
          )}


          {activeTab === "hinhanh" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full bg-white border border-gray-200 rounded-2xl p-8 shadow-md mb-12"
            >
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
                📷 Danh sách hình ảnh
              </h2>
              {/* CHƯA CHỌN FOLDER */}
              {!selectedFolder && (
                <p className="text-center text-gray-500">Hãy chọn tài liệu.</p>
              )}

              {selectedFolder === "anh1" && (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {[
                    {
                      name: "VECTO VÀ CÁC PHÉP TOÁN VECTO",
                      link: "https://drive.google.com/file/d/1eINt8AeeoPjS_LzZSLOIHgjOgx_Mq0um/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png"
                    },
                    {
                      name: "TỶ SỐ LƯỢNG GIÁC CỦA GÓC NHỌN",
                      link: "https://drive.google.com/file/d/1PwbM7WDA40FOh1eA4USWPNqlJCggfhfv/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png"
                    },
                    {
                      name: "HÌNH BÌNH HÀNH",
                      link: "https://drive.google.com/file/d/1e62Dq_EwFAYWOd0yX79D4_renbo8KjxU/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png"
                    },
                    {
                      name: "HỆ THỨC LƯỢNG TRONG TAM GIÁC",
                      link: "https://drive.google.com/file/d/1pZXfiw4jvLdpyXu6Fbf08uakzc2-0nOe/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png"
                    },
                    {
                      name: "HỆ THỨC LƯỢNG TRONG TAM GIÁC VUÔNG",
                      link: "https://drive.google.com/file/d/1oxE-cYc-e_2k-lnVlIJ39T4CXFjqXM4t/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png"
                    },
                    {
                      name: "HÀM SỐ BẬC HAI",
                      link: "https://drive.google.com/file/d/1MLkeSDTLhr8SUH62H3gEWybeGinzOA98/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png"
                    }

                  ].map((v, i) => (
                    <motion.a
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 }
                      }}
                      key={i}
                      href={v.link}
                      target="_blank"
                      className="block bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden"
                    >
                      {v.thumbnail && (
                        <motion.img
                          src={v.thumbnail}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      )}

                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900">{v.name}</h3>
                        <p className="text-sm text-gray-500">Nhấn để mở hình ảnh</p>
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              )}


              {selectedFolder === "anh2" && (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {[

                    { name: "XÁC SUẤT CÓ ĐIỀU KIỆN", link: "https://drive.google.com/file/d/1RLWevvrLzLeNpfyGK6aw-Vrk1GvWJ_wH/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "TỨ PHÂN VỊ CỦA MẪU SỐ LIỆU GHÉP NHÓM", link: "https://drive.google.com/file/d/1GYLt0PLR678k77BvNjpMYoQDxfcXmfcn/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "TỔ HỢP, CHỈNH HỢP", link: "https://drive.google.com/file/d/1p9w-DPplgWxRYwkhvTuxgGgtG6g8-JvV/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "QUAN HỆ SONG SONG TRONG KHÔNG GIAN", link: "https://drive.google.com/file/d/1xDuYUwnxoYQcQfRJAi42g-pwrNwLfPY0/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "PHÉP CHIẾU SONG SONG", link: "https://drive.google.com/file/d/1Q6_O3GYWllZX_Kc8_p9jBwW6_lpbZswu/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "HAI MẶT PHẲNG SONG SONG", link: "https://drive.google.com/file/d/10pQfwANGsLyaYEourzW9eMEPxrojoxt0/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "HAI ĐƯỜNG THẲNG SONG SONG", link: "https://drive.google.com/file/d/1xnjxf3BOANdnZVfeW8JKzoWD5TJAW85m/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "ĐƯỜNG THẲNG SONG SONG MẶT PHẲNG", link: "https://drive.google.com/file/d/1xnjxf3BOANdnZVfeW8JKzoWD5TJAW85m/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "ĐƯỜNG THẲNG & MẶT PHẲNG TRONG KHÔNG GIAN", link: "https://drive.google.com/file/d/1xnjxf3BOANdnZVfeW8JKzoWD5TJAW85m/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "DÃY SỐ, CẤP SỐ CỘNG, CẤP SỐ NHÂN", link: "https://drive.google.com/file/d/1oLex-4zObb1Zo8UozilOhWXHxvyG07RO/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "CÔNG THỨC LƯỢNG GIÁC", link: "https://drive.google.com/file/d/1D0neS4QFPJVF3mOISfZkYsrtil0ay-4E/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "CẤP SỐ NHÂN", link: "https://drive.google.com/file/d/1BTc7ik4jma7DbhyHG7EC0C6sDXLS0z68/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "CẤP SỐ CỘNG", link: "https://drive.google.com/file/d/1kHY8QLL_ccD4RWwcbFyNzDP-Q79NBv5P/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "CÁC SỐ ĐẶC TRƯNG CỦA MẪU SỐ LIỆU GHÉP NHÓM", link: "", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" }


                  ].map((v, i) => (
                    <motion.a
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 }
                      }}
                      key={i}
                      href={v.link}
                      target="_blank"
                      className="block bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden"
                    >
                      {v.thumbnail && (
                        <motion.img
                          src={v.thumbnail}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      )}

                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900">{v.name}</h3>
                        <p className="text-sm text-gray-500">Nhấn để mở hình ảnh</p>
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              )}



              {selectedFolder === "anh3" && (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {[

                    { name: "XÁC SUẤT CÓ ĐIỀU KIỆN & CÔNG THỨC BAYES", link: "https://drive.google.com/file/d/1y9Dg2yNJemDruT6XaeazgPgdiQuCrm7C/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "ỨNG DỤNG HÌNH HỌC CỦA TÍCH PHÂN", link: "https://drive.google.com/file/d/1aUyevn6V9f_ia3vNCBTrwZir_w15LCbe/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "TỔNG HỢP CÔNG THỨC THỂ TÍCH CÁC KHỐI HÌNH KHÔNG GIAN", link: "https://drive.google.com/file/d/17GVGKgBEw_wXbBBg_OO15-uJus7NBTp8/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "HỆ TỌA ĐỘ Oxyz", link: "https://drive.google.com/file/d/1QPQZrWQpQVUIWuahSd_EjpI-m-FW6XoY/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "GIÁ TRỊ LỚN NHẤT, GIÁ TRỊ NHỎ NHẤT CỦA HÀM SỐ", link: "https://drive.google.com/file/d/1W_ZMjwRkxbn6AXGcxmzDPf8QH0kIVSIR/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "ĐỊNH NGHĨA & TÍNH CHẤT TÍCH PHÂN", link: "https://drive.google.com/file/d/17aoWP3IxqkOj64gAvYlEs_TVh9MD4Lby/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "CÔNG THỨC TỌA ĐỘ VECTO TRONG KHÔNG GIAN", link: "https://drive.google.com/file/d/1dIgjdWk-FdA7fqfGtBHcpVJZOQ5rNiaz/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "CÔNG THỨC NGUYÊN HÀM", link: "https://drive.google.com/file/d/1w2QKuZ_d70GdegA-jyFJLdQiueXCyyxd/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "CÔNG THỨC KHỐI TRỤ", link: "https://drive.google.com/file/d/1cLigbFQze1S2nFT23L86IjBy-Pi5aD27/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "CÔNG THỨC KHỐI NÓN", link: "https://drive.google.com/file/d/1E6ABraZc5XPvE2M90okVQrtgT21p-Og_/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "CÁC PHÉP TOÁN VECTO TRONG KHÔNG GIAN", link: "https://drive.google.com/file/d/177d2hy_s57pONHrgPzF8hmElpBewrQHE/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "CÁC BƯỚC VẼ ĐỒ THỊ HÀM SỐ", link: "https://drive.google.com/file/d/1qV67mUE7XvgcJtVe0QQHMHbHPfW_EHhX/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "6 BƯỚC VẼ ĐỒ THỊ HÀM SỐ", link: "https://drive.google.com/file/d/1qV67mUE7XvgcJtVe0QQHMHbHPfW_EHhX/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" }



                  ].map((v, i) => (
                    <motion.a
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 }
                      }}
                      key={i}
                      href={v.link}
                      target="_blank"
                      className="block bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden"
                    >
                      {v.thumbnail && (
                        <motion.img
                          src={v.thumbnail}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      )}

                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900">{v.name}</h3>
                        <p className="text-sm text-gray-500">Nhấn để mở hình ảnh</p>
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              )}



              {selectedFolder === "anh4" && (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {[

                    { name: "VẺ ĐẸP ĐỐI XỨNG TRONG CUỘC SỐNG", link: "https://drive.google.com/file/d/1pPJ8WjXcHN2oL8O3t6bk8g6BxKuxnK52/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "THẾ GIỚI VUI NHỘN CỦA VECTO", link: "https://drive.google.com/file/d/1nuvdWOCoPAVZLP6pAexzOosO4WUQe5EZ/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "SỐ NGUYÊN", link: "https://drive.google.com/file/d/1sZJII7HTNPOirB_UDAMn_xId3VXgeQcB/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "SỐ NGUYÊN ÂM", link: "https://drive.google.com/file/d/1cHcxh0SCzMbN6dQpJZFZLELB0i9OwJtG/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "PYTAGO – NHÀ TOÁN HỌC", link: "https://drive.google.com/file/d/1cHcxh0SCzMbN6dQpJZFZLELB0i9OwJtG/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "HÌNH HỌC PHẲNG", link: "https://drive.google.com/file/d/1oJ85JQlRbQWFDc17w85FG2q7kOrpIxcJ/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" },
                    { name: "CASIO CHƯƠNG HÀM SỐ", link: "https://drive.google.com/file/d/1s3DKoT1whqjBBWZ8jx-U7hT3CQsrOe_D/view?usp=sharing", thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764367696/Gemini_Generated_Image_gcd5hcgcd5hcgcd5_x7wuy6.png" }



                  ].map((v, i) => (
                    <motion.a
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 }
                      }}
                      key={i}
                      href={v.link}
                      target="_blank"
                      className="block bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden"
                    >
                      {v.thumbnail && (
                        <motion.img
                          src={v.thumbnail}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      )}

                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900">{v.name}</h3>
                        <p className="text-sm text-gray-500">Nhấn để mở hình ảnh</p>
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}




          {activeTab === "khampha" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full bg-white border border-gray-200 rounded-2xl p-8 shadow-md mb-12"
            >
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 flex items-center justify-center gap-2">
                📄 Danh sách tư liệu khám phá
              </h2>

              {/* === HIỂN THỊ DANH SÁCH FILE THEO FOLDER === */}

              {selectedFolder === "khampha1" && (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {[
                    {
                      name: "HỌC VỚI CẢ HÌNH",
                      link: "https://www.tiktok.com/@hocvoicahinh?_r=1&_t=ZS-91hDcRNlE17",
                      thumbnail:
                        "https://res.cloudinary.com/duk8odqun/image/upload/v1764476697/Gemini_Generated_Image_1qi0q61qi0q61qi0_aklmnp.png",
                    },
                  ].map((pdf, i) => (
                    <a
                      key={i}
                      target="_blank"
                      href={pdf.link}
                      className="block bg-white border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                    >
                      {pdf.thumbnail && (
                        <motion.img
                          src={pdf.thumbnail}
                          className="w-full object-cover"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}

                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900">{pdf.name}</h3>
                        <p className="text-gray-500 text-sm">Nhấn để mở PDF</p>
                      </div>
                    </a>
                  ))}
                </motion.div>
              )}

              {selectedFolder === "khampha2" && (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {[
                    {
                      name: "GEOGABRA",
                      link: "https://geogebra.be/",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764476697/Gemini_Generated_Image_eniexgeniexgenie_q0fhnt.png"
                    }
                  ].map((pdf, i) => (
                    <a
                      key={i}
                      target="_blank"
                      href={pdf.link}
                      className="block bg-white border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                    >
                      {pdf.thumbnail && (
                        <motion.img
                          src={pdf.thumbnail}
                          className="w-full object-cover"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}

                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900">{pdf.name}</h3>
                        <p className="text-gray-500 text-sm">Nhấn để mở tư liệu</p>
                      </div>
                    </a>
                  ))}
                </motion.div>
              )}

              {selectedFolder === "khampha3" && (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {[
                    {
                      name: "IELTS-FIGHTER",
                      link: "https://ielts-fighter.com/",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765167232/Gemini_Generated_Image_3mv8733mv8733mv8_w77lno.png"
                    }
                  ].map((pdf, i) => (
                    <a
                      key={i}
                      target="_blank"
                      href={pdf.link}
                      className="block bg-white border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                    >
                      {pdf.thumbnail && (
                        <motion.img
                          src={pdf.thumbnail}
                          className="w-full object-cover"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}

                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900">{pdf.name}</h3>
                        <p className="text-gray-500 text-sm">Nhấn để mở tư liệu</p>
                      </div>
                    </a>
                  ))}
                </motion.div>
              )}

              {selectedFolder === "khampha4" && (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {[
                    {
                      name: "MOON VN",
                      link: "https://moon.vn/",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1765167234/Gemini_Generated_Image_bpd2ozbpd2ozbpd2_no4yj0.png"
                    }
                  ].map((pdf, i) => (
                    <a
                      key={i}
                      target="_blank"
                      href={pdf.link}
                      className="block bg-white border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                    >
                      {pdf.thumbnail && (
                        <motion.img
                          src={pdf.thumbnail}
                          className="w-full object-cover"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}

                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900">{pdf.name}</h3>
                        <p className="text-gray-500 text-sm">Nhấn để mở tư liệu</p>
                      </div>
                    </a>
                  ))}
                </motion.div>
              )}


              {/* CHƯA CHỌN FOLDER */}
              {!selectedFolder && (
                <p className="text-center text-gray-500">Hãy chọn tài liệu.</p>
              )}

            </motion.div>
          )}




        </main>
      </div >


    </section >
  );
};

export default KyNangTuHoc;
