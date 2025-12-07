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


const ThucHanh = ({ language = "vi" }) => {
  const [openPDF, setOpenPDF] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const [showFolder1, setShowFolder1] = useState(false);
  const [activeTab, setActiveTab] = useState("intro");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);



  const t = {
    vi: {
      title: "THỰC HÀNH KỸ NĂNG",
      subtitle:
        "Luyện tập qua tình huống thực tế – rèn tư duy xử lý – ứng phó an toàn trong đời sống và không gian mạng.",

      pdfTitle: "Bài tập – Tài liệu thực hành",
      pdf1: "Tình huống mô phỏng và câu hỏi luyện tập",
      pdf2: "Bài tập tình huống giúp phát triển kỹ năng ứng xử và giải quyết vấn đề",

      mediaTitle: "Video – Tình huống minh họa",
      mediaDesc:
        "Video thực tế giúp học sinh nhận biết tình huống, phân tích và chọn cách xử lý phù hợp."
    },

    en: {
      title: "SKILL PRACTICE",
      subtitle:
        "Train through real-world scenarios – improve decision-making – respond safely in daily life and online environments.",

      pdfTitle: "Practice Worksheets",
      pdf1: "Simulated scenarios and practice questions",
      pdf2: "Exercises to enhance communication and problem-solving skills",

      mediaTitle: "Videos – Illustrated Situations",
      mediaDesc:
        "Real-life videos that help students recognize situations and choose the right response."
    }
  };



  //-----------------------------------------------------------

  return (
    <section className="w-full px-4 py-20 bg-white max-w-7xl mx-auto">

      {/* ======= TIÊU ĐỀ ======= */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-6 md:mt-10 mx-auto text-center block
         text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-outfit
         bg-[#1c7c76] px-6 py-4 rounded-2xl shadow-sm"
      >
        {t[language].title}
      </motion.h1>

      <Typewriter text={t[language].subtitle} />



      <div className="mt-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:items-start">


        {/* MOBILE SIDEBAR BUTTON */}
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="md:hidden w-full px-4 py-3 bg-[#1c7c76] text-white font-semibold rounded-xl shadow-sm"
        >
          ☰ Danh mục nội dung
        </button>


        {/* SIDEBAR Trái */}
        <aside
          className={`
    w-full md:w-64 bg-white border rounded-2xl shadow p-5
    transition-all duration-300
    ${mobileSidebarOpen ? "block" : "hidden md:block"}
  `}
        >

          <ul className="space-y-3">


            {/* GIỚI THIỆU */}
            <li
              onClick={() => {
                setActiveTab("intro");
                setSelectedFolder(null);
                setMobileSidebarOpen(false);
                setMobileSidebarOpen(false);
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
                setMobileSidebarOpen(false);
              }}
              className={`p-3 rounded-lg cursor-pointer transition
${activeTab === "violence" ? "bg-[#1c7c76] text-white" : "hover:bg-gray-100"}`}
            >
              Tương tác kỹ năng
            </li>




            {/* VIDEO */}
            <li
              onClick={() => {
                setActiveTab("video");
                setOpenVideo(true);
                setOpenPDF(false);
                setSelectedFolder("video_main");
                // setMobileSidebarOpen(false);
              }}


              className={`p-3 rounded-lg cursor-pointer transition
        ${activeTab === "video" ? "bg-[#1c7c76] text-white" : "hover:bg-gray-100"}`}
            >
              Tương tác bài tập
            </li>

            {openVideo && activeTab === "video" && (
              <ul className="pl-5 space-y-2 text-sm">
                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => {
                    setSelectedFolder("math_10")
                    setMobileSidebarOpen(false);
                  }}
                >
                  Toán 10
                </li>

                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => {
                    setSelectedFolder("math_11")
                    setMobileSidebarOpen(false);
                  }}
                >
                  Toán 11
                </li>
                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => {
                    setSelectedFolder("math_12")
                    setMobileSidebarOpen(false);
                  }}
                >
                  Toán 12
                </li>


              </ul>
            )}

            {/* MÔ PHỎNG – MENU LỚN */}
            <li
              onClick={() => {
                setActiveTab("simulation");
                setSelectedFolder("simulation_links");
                setOpenPDF(false);
                setOpenVideo(false);
                // setMobileSidebarOpen(false);
              }}
              className={`p-3 rounded-lg cursor-pointer transition
${activeTab === "simulation" ? "bg-[#1c7c76] text-white" : "hover:bg-gray-100"}`}
            >
              Mô phỏng
            </li>

          </ul>
        </aside>


        {/* MAIN CONTENT BÊN PHẢI */}
        <main className="flex-1 w-full">

          {activeTab === "intro" && (
            <div className="max-w-4xl mx-auto  bg-[#f8fffe] border border-[#d8efea] shadow-sm 
rounded-2xl p-8 text-center">

              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1c7c76] mb-3">
                Thực hành kỹ năng là gì?
              </h2>

              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                Thực hành kỹ năng giúp học sinh – sinh viên luyện tập qua các tình huống mô phỏng,
                rèn tư duy xử lý, biết cách ứng phó an toàn trong đời sống và trên không gian mạng.
                Đây là bước quan trọng để biến kiến thức thành kỹ năng thật.
              </p>

              {/* 3 FEATURE GRID */}
              <div className="grid md:grid-cols-3 gap-6 mt-6">

                {/* Item 1 */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                  <div className="w-12 h-12 mx-auto bg-[#A8DCD2] rounded-xl flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-[#1c7c76]" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Bài tập – Tình huống PDF</h3>
                  <p className="text-sm text-gray-600">
                    Bộ tài liệu gồm các tình huống thực tế, yêu cầu học sinh phân tích và lựa chọn cách xử lý phù hợp.
                  </p>
                </div>

                {/* Item 2 */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                  <div className="w-12 h-12 mx-auto bg-[#A8DCD2] rounded-xl flex items-center justify-center mb-4">
                    <Images className="w-6 h-6 text-[#1c7c76]" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Video tình huống</h3>
                  <p className="text-sm text-gray-600">
                    Các video mô phỏng và tình huống thực tế giúp học sinh quan sát, nhận diện vấn đề và rèn kỹ năng phản ứng.
                  </p>
                </div>

                {/* Item 3 */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                  <div className="w-12 h-12 mx-auto bg-[#A8DCD2] rounded-xl flex items-center justify-center mb-4">
                    <MessageCircle className="w-6 h-6 text-[#1c7c76]" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Thực hành & tương tác</h3>
                  <p className="text-sm text-gray-600">
                    Học sinh có thể trao đổi, đặt câu hỏi và luyện tập cách xử lý với chatbot hỗ trợ và các bài thực hành mở rộng.
                  </p>
                </div>

              </div>

              {/* FOOT TEXT */}
              <p className="mt-8 text-sm md:text-base text-gray-600 leading-relaxed">
                Mục <span className="font-semibold text-[#1c7c76]">Thực hành kỹ năng</span> giúp học sinh – sinh viên
                biến kiến thức thành kỹ năng thực tế thông qua luyện tập liên tục và có hướng dẫn.
              </p>
            </div>
          )}


          {activeTab === "violence" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full bg-white border border-gray-200 rounded-2xl p-8 shadow-md mb-12"
            >
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 flex items-center justify-center gap-2">
                <FileText className="text-[#3C9E8F] w-6 h-6" />
                Danh sách bài tập
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {[
                  {
                    name: "Kỹ năng an toàn mạng – Công nghệ",
                    link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-an-to-n-m-ng-l-p-10",
                    thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764143867/Gemini_Generated_Image_3vjfra3vjfra3vjf_f9epvh.png"
                  },
                  {
                    name: "Phòng chống thiên tai",
                    link: "https://nguyenthanhthan.my.canva.site/quiz-ph-ng-ch-ng-thi-n-tai",
                    thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764143866/Gemini_Generated_Image_ila2twila2twila2_vraszx.png"
                  },
                  {
                    name: "Kỹ năng cá nhân",
                    link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-k-n-ng-c-nh-n",
                    thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764143871/Gemini_Generated_Image_w37txew37txew37t_w8gses.png"
                  },
                  {
                    name: "Kỹ năng giao tiếp – xã hội",
                    link: "https://nguyenthanhthan.my.canva.site/quiz-k-n-ng-giao-ti-p-x-h-i",
                    thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764143866/Gemini_Generated_Image_9bb4qi9bb4qi9bb4_xpmq7v.png"
                  },
                  {
                    name: "Kỹ năng an toàn – Sức khỏe",
                    link: "https://nguyenthanhthan.my.canva.site/b-i-ki-m-tra-an-to-n-s-c-kh-e",
                    thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764143870/Gemini_Generated_Image_4raqgn4raqgn4raq_zgjhwe.png"
                  },
                  {
                    name: "Kỹ năng định hướng và tư duy",
                    link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-k-n-ng-n-ng",
                    thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764143865/Gemini_Generated_Image_4jjqsc4jjqsc4jjq_f5dgsm.png"
                  }

                ].map((v, i) => (
                  <a
                    key={i}
                    href={v.link}
                    target="_blank"
                    className="block bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden"
                  >
                    {v.thumbnail && <img src={v.thumbnail} className="w-full object-cover" />}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900">{v.name}</h3>
                      <p className="text-sm text-gray-500">Nhấn để xem video</p>
                    </div>
                  </a>
                ))}

              </div>
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
                <FileText className="text-[#3C9E8F] w-6 h-6" />
                Danh sách bài tập

              </h2>

              {selectedFolder === "video_main" && (
                <p className="text-center text-gray-500 text-lg mt-4">
                  Hãy chọn bài tập.
                </p>
              )}



              {selectedFolder === "math_10" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      name: "Giải phương trình bậc hai - Lớp 10",
                      link: "https://nguyenthanhthan.my.canva.site/gi-i-ph-ng-tr-nh-b-c-hai",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Bài tập trắc nghiệm mệnh đề - Lớp 10",
                      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-tr-c-nghi-m-m-nh",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Trắc nghiệm toán lớp 10 - Tập hợp - Lớp 10",
                      link: "https://nguyenthanhthan.my.canva.site/tr-c-nghi-m-to-n-l-p-10-t-p-h-p",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Các phép toán trên tập hợp - Lớp 10",
                      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-to-n-l-p-10",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Mệnh đề và tập hợp - Lớp 10",
                      link: "https://nguyenthanhthan.my.canva.site/btrfj6548pzbsqqy",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Bất phương trình bậc nhất hai ẩn - Lớp 10",
                      link: "https://nguyenthanhthan.my.canva.site/btrfxg29jzj1k4ka",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Hệ bất phương trình bậc nhất hai ẩn - Lớp 10",
                      link: "https://nguyenthanhthan.my.canva.site/btrg7rw07zjshcpy",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },

                    {
                      name: "Bất phương trình và Hệ bất phương trình bậc nhất hai ẩn - Lớp 10",
                      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-tr-c-nghi-m-to-n-l-p-10",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Hàm số và đồ thị - Lớp 10",
                      link: "https://nguyenthanhthan.my.canva.site/btrh3zahbgta381h",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Hàm số bậc hai - Lớp 10",
                      link: "https://nguyenthanhthan.my.canva.site/tr-c-nghi-m-h-m-s-b-c-hai",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Đồ thị và hàm số - Lớp 10",
                      link: "https://nguyenthanhthan.my.canva.site/btrhhq70c6wjvw71",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Số gần đúng và sai số - Lớp 10",
                      link: "https://nguyenthanhthan.my.canva.site/btrkgb2rcy16jb7h",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },

                    {
                      name: "Tích vô hướng của hai véc-tơ - Lớp 10",
                      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-tr-c-nghi-m-to-n-10",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Tích của một số với một véc-tơ - Lớp 10",
                      link: "https://nguyenthanhthan.my.canva.site/btrjw3h2kvsjyttz",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Tổng và hiệu của hai véc-tơ - Lớp 10",
                      link: "https://nguyenthanhthan.my.canva.site/btrjp36yy81f22vh",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Véc-tơ - Lớp 10",
                      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-tr-c-nghi-m-vecto",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Tam giác - Lớp 10",
                      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-gi-i-tam-gi-c",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Cosin và Sin - Lớp 10",
                      link: "https://nguyenthanhthan.my.canva.site/btrhwpsz34k9qsxh",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Giá trị lượng giác của một góc từ 0° đến 180° - Lớp 10",
                      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-gi-tr-l-ng-gi-c",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
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

              {selectedFolder === "math_11" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      name: "Trung vị và Tứ phân vị của mẫu số liệu ghép nhóm - Lớp 11",
                      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-tr-c-nghi-m-to-n-h-c",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Số Trung Bình & Mốt - Mẫu Số Liệu Ghép Nhóm - Lớp 11",
                      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-to-n-th-ng-k",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Phương trình lượng giác cơ bản - Lớp 11",
                      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-l-ng-gi-c-l-p-11",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Hàm Số Lượng Giác - Lớp 11",
                      link: "https://nguyenthanhthan.my.canva.site/quiz-h-m-s-l-ng-gi-c",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "CÔNG THỨC LƯỢNG GIÁC - Lớp 11",
                      link: "https://nguyenthanhthan.my.canva.site/tr-c-nghi-m-l-ng-gi-c",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Giá Trị Lượng Giác - Lớp 11",
                      link: "https://nguyenthanhthan.my.canva.site/b-i-quiz-gi-tr-l-ng-gi-c",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Góc Lượng Giác - Lớp 11",
                      link: "https://nguyenthanhthan.my.canva.site/b-i-ki-m-tra-g-c-l-ng-gi-c",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
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
                        <p className="text-sm text-gray-500">Nhấn để mở tài liệu</p>
                      </div>
                    </a>
                  ))}
                </div>
              )}


              {selectedFolder === "math_12" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      name: "Tính đơn điệu và cực trị của hàm số - Lớp 12",
                      link: "https://nguyenthanhthan.my.canva.site/b-i-ki-m-tra-to-n-l-p-12",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Giá Trị Lớn Nhất, Giá Trị Nhỏ Nhất Của Hàm Số - Lớp 12",
                      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-tr-c-nghi-m-to-n-12",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Đường Tiệm Cận của Đồ Thị Hàm Số - Lớp 12",
                      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-to-n-ng-ti-m-c-n",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Khảo sát và vẽ đồ thị hàm số cơ bản - Lớp 12",
                      link: "https://nguyenthanhthan.my.canva.site/tr-c-nghi-m-to-n-l-p-12",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Vecto và Các phép toán trên vecto - Lớp 12",
                      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-tr-c-nghi-m-to-n",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Tọa độ của vectơ trong không gian - Lớp 12",
                      link: "https://nguyenthanhthan.my.canva.site/bv38q85w5z8qy4ts",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Tổng hợp - Lớp 12",
                      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-to-n-h-c-tr-c-nghi-m",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Khoảng biến thiên và khoảng tứ phân vị - Lớp 12",
                      link: "https://nguyenthanhthan.my.canva.site/b-i-t-p-to-n-l-p-12",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
                    },
                    {
                      name: "Phương Sai và Độ Lệch Chuẩn của Mẫu Số Liệu Ghép Nhóm - Lớp 12",
                      link: "https://nguyenthanhthan.my.canva.site/quiz-to-n-h-c-l-p-12",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234477/Gemini_Generated_Image_j2p1fsj2p1fsj2p1_ui2dit.png"
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
                        <p className="text-sm text-gray-500">Nhấn để mở tài liệu</p>
                      </div>
                    </a>
                  ))}

                </div>
              )}
            </motion.div>
          )}


          {activeTab === "simulation" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full bg-white border border-gray-200 rounded-2xl p-8 shadow-md mb-12"
            >
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 flex items-center justify-center gap-2">
                <FileText className="text-[#3C9E8F] w-6 h-6" />
                Danh sách mô phỏng
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {[
                  {
                    name: "Quy hoạch tuyến tính (BPT bậc nhất 2 ẩn)",
                    link: "https://chatgpt.com/canvas/shared/68e9fe0251dc81918d64619b92e1da1b",
                    thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234818/Gemini_Generated_Image_3nxl043nxl043nxl_f4j6lu.png"
                  },
                  {
                    name: "Hàm Số Bậc Hai",
                    link: "https://chatgpt.com/canvas/shared/68fd811a91c881918c7b182c8698f1fd",
                    thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234818/Gemini_Generated_Image_3nxl043nxl043nxl_f4j6lu.png"
                  },
                  {
                    name: "Hàm Số Bậc Bậc Ba",
                    link: "https://chatgpt.com/canvas/shared/68ff8e127bb88191ac2262c3d9d1b26d",
                    thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234818/Gemini_Generated_Image_3nxl043nxl043nxl_f4j6lu.png"
                  },
                  {
                    name: "Quy Hoạch Tuyến Tính",
                    link: "https://chatgpt.com/canvas/shared/68ffa2452ac48191892c7f0efec6977b",
                    thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234818/Gemini_Generated_Image_3nxl043nxl043nxl_f4j6lu.png"
                  },
                  {
                    name: "Hệ số a, b, c",
                    link: "https://chatgpt.com/canvas/shared/6902f506befc81918bb0d805f6778e09",
                    thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234818/Gemini_Generated_Image_3nxl043nxl043nxl_f4j6lu.png"
                  },
                  {
                    name: "Dây neo thuyền & định lí Py-ta-go",
                    link: "https://chatgpt.com/canvas/shared/6900de158f448191b192cb92de6d3056",
                    thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764234818/Gemini_Generated_Image_3nxl043nxl043nxl_f4j6lu.png"
                  }
                ].map((v, i) => (
                  <a
                    key={i}
                    href={v.link}
                    target="_blank"
                    className="block bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden"
                  >
                    {v.thumbnail && <img src={v.thumbnail} className="w-full object-cover" />}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900">{v.name}</h3>
                      <p className="text-sm text-gray-500">Nhấn để xem mô phỏng</p>
                    </div>
                  </a>
                ))}

              </div>


            </motion.div>
          )}
        </main>
      </div>


    </section >
  );
};

export default ThucHanh;
