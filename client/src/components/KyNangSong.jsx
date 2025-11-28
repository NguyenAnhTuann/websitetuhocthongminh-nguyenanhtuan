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


const KyNangSong = ({ language }) => {
  const [openPDF, setOpenPDF] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const [showFolder1, setShowFolder1] = useState(false);
  const [activeTab, setActiveTab] = useState("intro"); // intro | pdf | video


  const t = {
    vi: {
      title: "KỸ NĂNG SỐNG",
      subtitle:
        "Rèn luyện ứng xử – Ứng phó an toàn – Xây dựng nhân cách văn minh.",
      pdfTitle: "Tài liệu PDF",
      pdf1: "Tình huống mất kiểm soát trên không gian mạng (An toàn mạng)",
      pdf2: "Biện pháp xử lý bạo lực học đường",
      mediaTitle: "Video – Hình ảnh – Minh họa",
      mediaDesc: "Video thực tế giúp học sinh dễ hiểu và biết cách ứng xử."
    },

    en: {
      title: "LIFE SKILLS",
      subtitle:
        "Build communication – Stay safe – Grow with positive behaviors.",
      pdfTitle: "PDF Resources",
      pdf1: "Online behavior and cyber safety scenarios",
      pdf2: "Solutions for preventing school violence",
      mediaTitle: "Videos – Images – Illustrations",
      mediaDesc: "Real-life videos to help students understand and react properly."
    }
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
                setActiveTab("video");
                setSelectedFolder("video_home");
                setOpenPDF(false);
                setOpenVideo(true);
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
                  onClick={() => setSelectedFolder("baoluc")}
                >
                  Bạo lực học đường là gì?
                </li>
                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => setSelectedFolder("video_violence")}
                >
                  Kỹ năng xử lý bạo lực học đường
                </li>
                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => setSelectedFolder("video_main")}
                >
                  Kỹ năng khác
                </li>




              </ul>
            )}


            {/* PDF */}
            <li
              onClick={() => {
                setActiveTab("pdf");
                setOpenVideo(false);
                setOpenPDF(true);
                setSelectedFolder("pdf_home");
              }}



              className={`p-3 rounded-lg cursor-pointer transition
        ${activeTab === "pdf" ? "bg-[#1c7c76] text-white" : "hover:bg-gray-100"}`}
            >
              Tài liệu tham khảo PDF
            </li>

            {/* NỘI DUNG HIỆN THEO FOLDER ĐƯỢC CHỌN */}

            {openPDF && activeTab === "pdf" && (

              <ul className="pl-5 space-y-2 text-sm">
                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => setSelectedFolder("pdf_math")}
                >
                  Phát triển bản thân: Kỹ năng cứng & mềm
                </li>

                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => setSelectedFolder("pdf_real")}
                >
                  Kỹ năng ứng phó với tình huống khẩn cấp
                </li>

                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => setSelectedFolder("pdf_ai")}
                >
                  Định hướng nghề nghiệp
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
                Kỹ năng sống là gì?
              </h2>

              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                Kỹ năng sống giúp học sinh – sinh viên biết cách ứng xử phù hợp,
                bảo vệ bản thân, giao tiếp hiệu quả và xử lý tình huống an toàn
                trong học tập và cuộc sống hằng ngày.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-6">

                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                  <div className="w-12 h-12 mx-auto bg-[#A8DCD2] rounded-xl flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-[#1c7c76]" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Tài liệu hướng dẫn</h3>
                  <p className="text-sm text-gray-600">
                    Các tài liệu PDF về phòng tránh bạo lực, kiểm soát cảm xúc,
                    xử lý mâu thuẫn và bảo vệ an toàn cá nhân.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                  <div className="w-12 h-12 mx-auto bg-[#A8DCD2] rounded-xl flex items-center justify-center mb-4">
                    <Images className="w-6 h-6 text-[#1c7c76]" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Video – Minh họa</h3>
                  <p className="text-sm text-gray-600">
                    Video mô phỏng các tình huống thực tế giúp học sinh dễ hiểu và
                    biết cách phản ứng đúng đắn.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                  <div className="w-12 h-12 mx-auto bg-[#A8DCD2] rounded-xl flex items-center justify-center mb-4">
                    <MessageCircle className="w-6 h-6 text-[#1c7c76]" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Kỹ năng ứng xử</h3>
                  <p className="text-sm text-gray-600">
                    Hướng dẫn giao tiếp, từ chối, tìm kiếm hỗ trợ và giải quyết vấn đề
                    một cách văn minh và an toàn.
                  </p>
                </div>
              </div>

              <p className="mt-8 text-sm md:text-base text-gray-600 leading-relaxed">
                Mục <span className="font-semibold text-[#1c7c76]">Kỹ năng sống </span>
                được xây dựng nhằm giúp học sinh – sinh viên phát triển hành vi tích cực,
                rèn luyện nhân cách và biết cách bảo vệ bản thân trong mọi hoàn cảnh.
              </p>

            </div>

          )}

          {selectedFolder === "video_home" && (
            <div className="w-full bg-white border rounded-2xl p-10 text-center shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
                🎬 Danh sách video
              </h2>
              <p className="text-gray-500">Hãy chọn thư mục bên trái.</p>
            </div>
          )}


          {selectedFolder === "pdf_home" && (
            <div className="w-full bg-white border rounded-2xl p-10 text-center shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
                📄 Tài liệu tham khảo PDF
              </h2>

              <p className="text-gray-500 text-base">
                Hãy chọn thư mục bên trái
              </p>
            </div>
          )}


          {selectedFolder === "baoluc" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full bg-white border border-gray-200 rounded-2xl p-8 shadow-md mb-12"
            >
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 flex items-center justify-center gap-2">
                🎬 Danh sách video
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {[
                  {
                    name: "Tung tin xấu, bóc phốt bạn",
                    link: "https://drive.google.com/file/d/1NU33RLcj4gzv51RiYJVzphrFtN5Xwf8k/view?usp=sharing",
                    thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764142505/Gemini_Generated_Image_70cipi70cipi70ci_hrxepw.png"
                  },
                  {
                    name: "Tạo nhóm nói xấu, cô lập bạn",
                    link: "https://drive.google.com/file/d/1e9v8zObtOKPavgyy87iD0hf4wqSa6DXb/view?usp=sharing",
                    thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764142494/Gemini_Generated_Image_7q8jhy7q8jhy7q8j_yhlrgp.png"
                  },
                  {
                    name: "Nhận diện 5 dạng bạo lực học đường",
                    link: "https://drive.google.com/file/d/1Z0HT4PRanI5mnfxalgf3Nb-jCZar8fXK/view?usp=sharing",
                    thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764142494/Gemini_Generated_Image_duksaaduksaaduks_oukx51.png"
                  },
                  {
                    name: "Nghe được nhóm bạn chuẩn bị đánh nhau",
                    link: "https://drive.google.com/file/d/19lSY9esepnWfd1HfS0BOnbj0-ttXwcuT/view?usp=sharing",
                    thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764142498/Gemini_Generated_Image_tg37uvtg37uvtg37_z1fr6o.png"
                  },
                  {
                    name: "Đặt biệt danh nói xấu, đe dọa người khác",
                    link: "https://drive.google.com/file/d/1D5S0Y1CgSPiHPDUDB9Ctlhw0xkfbcFJk/view?usp=sharing",
                    thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764142492/Gemini_Generated_Image_204ti2204ti2204t_myecy4.png"
                  },
                  {
                    name: "Bạo lực học đường – Nhận biết & phòng tránh",
                    link: "https://drive.google.com/file/d/175D78VNdOvxHOrn2FaEniqmtgus4cKhb/view?usp=sharing",
                    thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764142493/Gemini_Generated_Image_o6lxsso6lxsso6lx_qgshk7.png"
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


          {selectedFolder === "video_violence" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full bg-white border border-gray-200 rounded-2xl p-8 shadow-md mb-12"
            >
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 flex items-center justify-center gap-2">
                🎬 Danh sách video
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: "KỸ NĂNG TỪ CHỐI, TRÁNH XA TÌNH HUỐNG NGUY HIỂM",
                    link: "https://drive.google.com/file/d/1fkkg94XNAHahGgsK7ymsQhPTvAwkZK7I/view?usp=sharing",
                    thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764082010/Gemini_Generated_Image_78xovc78xovc78xo_cvybud.png"
                  },
                  {
                    name: "KỸ NĂNG KIỂM SOÁT CẢM XÚC",
                    link: "https://drive.google.com/file/d/1JT0BSyXzjHjDXv6E4xRYi18TM9g87WLq/view?usp=sharing",
                    thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764082010/Gemini_Generated_Image_45642h45642h4564_kxxnnv.png"
                  },
                  {
                    name: "KỸ NĂNG GIAO TIẾP KHÔNG BẠO LỰC",
                    link: "https://drive.google.com/file/d/1k2JWBqCT8XMKFUw26SegJoRo4crbEWIT/view?usp=sharing",
                    thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764082010/Gemini_Generated_Image_l2cg67l2cg67l2cg_i1g6ik.png"
                  },
                  {
                    name: "KỸ NĂNG BÁO CÁO, TÌM KIẾM TRỢ GIÚP",
                    link: "https://drive.google.com/file/d/14Gzuy34jesQ-4Kr5ClxOjJ6gEzks_xlh/view?usp=sharing",
                    thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764082011/Gemini_Generated_Image_fnwqaofnwqaofnwq_juna1p.png"
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
                      <p className="text-sm text-gray-500">Nhấn để xem video</p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          )}




          {selectedFolder === "video_main" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full bg-white border border-gray-200 rounded-2xl p-8 shadow-md mb-12"
            >
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 flex items-center justify-center gap-2">
                🎬 Danh sách video
              </h2>

              {selectedFolder === "video_main" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {[
                    {
                      name: "KỸ NĂNG SỐNG SỐNG CÓ KỶ LUẬT",
                      link: "https://drive.google.com/file/d/1uo8Hk2B7qcFuaHMmyXiwFS_6GCDXvBxG/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764135937/Gemini_Generated_Image_vt08xmvt08xmvt08_ptpkcb.png"
                    },
                    {
                      name: "KỸ NĂNG PHÒNG CHỐNG MA TÚY TRONG TRƯỜNG HỌC",
                      link: "https://drive.google.com/file/d/1f1sSR896SHD7KS2NjK6x0m40F8HgEkJ7/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764135939/Gemini_Generated_Image_2ot0zo2ot0zo2ot0_w8w4o5.png"
                    },
                    {
                      name: "KỸ NĂNG ĐỊNH HƯỚNG NGHỀ NGHIỆP",
                      link: "https://drive.google.com/file/d/1Lj2xvuy7OeQdJsgaVRlQ2Yz9nQFln6Xw/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764135936/Gemini_Generated_Image_f6fbyyf6fbyyf6fb_ddsfpe.png"
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
                        <p className="text-sm text-gray-500">Nhấn để mở tài liệu</p>
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


          {activeTab === "pdf" && selectedFolder !== "pdf_home" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full bg-white border border-gray-200 rounded-2xl p-8 shadow-md mb-12"
            >
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 flex items-center justify-center gap-2">
                📄 Danh sách tài liệu
              </h2>



              {selectedFolder === "pdf_math" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      name: "Khái Niệm Kỹ Năng Là Gì",
                      link: "https://drive.google.com/file/d/1xL7vlGUbLVL-fN3pOv22_beeXJKHiOYS/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764135934/Gemini_Generated_Image_w6r07ow6r07ow6r0_q9dhfq.png"
                    },
                    {
                      name: "Top 10 Điều Thú Vị Về Tính Cách ISFJ Trong Trắc Nghiệm MBTI",
                      link: "https://drive.google.com/file/d/1Q3Zouk2z67l4ds_7VGqO5rQ819K4Tq1J/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764135937/Gemini_Generated_Image_3x9w343x9w343x9w_fi5duz.png"
                    },
                    {
                      name: "Tính Cách ISTP Là Gì",
                      link: "https://drive.google.com/file/d/1PlCjlrtvVw-mNx7OZqUQVq5R3sYqPfcn/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764135936/Gemini_Generated_Image_dvhm34dvhm34dvhm_stgify.png"
                    },
                    {
                      name: "Tính Cách INTJ Có Gì Khác Biệt",
                      link: "https://drive.google.com/file/d/1reWoFcDRfkvmPoc3uHU7OvsafFbs6t8n/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764135934/Gemini_Generated_Image_wccnvowccnvowccn_eozu9x.png"
                    },
                    {
                      name: "Tìm Hiểu Nhóm Tính Cách ENTJ",
                      link: "https://drive.google.com/file/d/1NZhvQs5ndzdfv5BV8cPnrMcnSdj1rZlE/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764135933/Gemini_Generated_Image_4dzhxa4dzhxa4dzh_tdtl5q.png"
                    },
                    {
                      name: "Những Kỹ Năng Làm Quen Với Người Lạ Trong Giao Tiếp Hiệu Quả",
                      link: "https://drive.google.com/file/d/1eo6BqO2uydG6cEb2g3kPwDp7OsufKMZT/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764135934/Gemini_Generated_Image_5nm1qu5nm1qu5nm1_ukq9yj.png"
                    },
                    {
                      name: "Nhóm Tính Cách ESFP",
                      link: "https://drive.google.com/file/d/1lGHpsmatecP8Jxit7d8ev6Jzo1qmZpEx/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764135939/Gemini_Generated_Image_61f31y61f31y61f3_qjqtsz.png"
                    },
                    {
                      name: "Kỹ Năng Giao Tiếp Qua Điện Thoại",
                      link: "https://drive.google.com/file/d/1QjAR7Gw_nE6vN2IjE4b3TwxgEkzGCpIU/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764135933/Gemini_Generated_Image_3r8bej3r8bej3r8b_vsscoj.png"
                    },

                    {
                      name: "Cách Giải Quyết Vấn Đề Và Ra Quyết Định Chỉ Với 6 Bước 6 Kỹ Năng",
                      link: "https://drive.google.com/file/d/1-bXAlyM91EyYP-jayijnkiw0dbIid4uy/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764135934/Gemini_Generated_Image_scp1vtscp1vtscp1_mgugge.png"
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
              {selectedFolder === "pdf_real" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      name: "KỸ NĂNG ỨNG PHÓ VỚI TÌNH HUỐNG KHẨN CẤP",
                      link: "https://drive.google.com/file/d/1_IWl6ZXNR7Hz920MvM7CtE52JYrUcI0G/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764137145/Gemini_Generated_Image_g5c7l0g5c7l0g5c7_kgxfh4.png"
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
              {selectedFolder === "pdf_ai" && (
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
            </motion.div>
          )}
        </main>
      </div>


    </section>
  );
};

export default KyNangSong;
