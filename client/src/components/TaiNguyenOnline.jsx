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
  const [activeTab, setActiveTab] = useState("intro");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);


  const t = {
    vi: {
      title: "KỸ NĂNG MẠNG",
      subtitle:
        "Trang bị kiến thức – kỹ năng để sử dụng Internet an toàn, nhận diện rủi ro và bảo vệ bản thân trên không gian mạng.",

      pdfTitle: "Tài liệu PDF",
      pdf2: "Cẩm nang sử dụng mạng an toàn",

      mediaTitle: "Video – Tình huống minh họa",
      mediaDesc:
        "Video mô phỏng các tình huống trên mạng giúp học sinh nhận biết lừa đảo, tin giả và cách ứng xử an toàn."
    },

    en: {
      title: "CYBER SKILLS",
      subtitle:
        "Equip knowledge and skills to stay safe online, identify digital risks, and protect yourself on the Internet.",

      pdfTitle: "PDF Resources",
      pdf1: "Benefits, risks and cyber safety solutions",
      pdf2: "Safe Internet usage handbook",

      mediaTitle: "Videos – Real Scenarios",
      mediaDesc:
        "Scenario-based videos that help students recognize scams, fake news, and react safely online."
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
        className="w-fit mt-6 md:mt-10 mx-auto text-center
             text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-outfit
             bg-[#1c7c76] px-6 py-4 rounded-2xl shadow-sm"
      >
        {t[language].title}
      </motion.h1>


<div className="text-center mt-4">
  <Typewriter text={t[language].subtitle} />
</div>


      <div className="mt-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:items-start">


        {/* NÚT MỞ SIDEBAR MOBILE */}
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

              }}
              className={`p-3 rounded-lg cursor-pointer transition
        ${activeTab === "intro" ? "bg-[#1c7c76] text-white" : "hover:bg-gray-100"}`}
            >
              Giới thiệu
            </li>




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

            {openVideo && activeTab === "video" && (
              <ul className="pl-5 space-y-2 text-sm">

                <li
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-xl"
                  onClick={() => { setSelectedFolder("video_main")
                    setMobileSidebarOpen(false);

                  }}
                >
                  Xử lý tình huống để an toàn số
                </li>

              </ul>
            )}





            {/* PDF */}
            <li
              onClick={() => {
                setActiveTab("pdf");        // ✔ ĐÚNG
                setSelectedFolder("pdf_home");
                setOpenPDF(true);
                setOpenVideo(false);
                // setMobileSidebarOpen(false);

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
                  onClick={() => { setSelectedFolder("pdf2")
                    setMobileSidebarOpen(false);

                  }}
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
            <div className="max-w-4xl mx-auto bg-[#f8fffe] border border-[#d8efea] shadow-sm rounded-2xl p-8 text-center">

              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1c7c76] mb-3">
                Kỹ năng mạng là gì?
              </h2>

              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                Kỹ năng mạng giúp học sinh – sinh viên biết cách sử dụng Internet an toàn,
                nhận diện lừa đảo, phòng tránh tin giả, bảo vệ thông tin cá nhân và ứng xử văn minh
                trên không gian mạng.
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
                    Bộ tài liệu về an toàn số, cách nhận biết rủi ro mạng và hướng dẫn bảo vệ bản thân khi online.
                  </p>
                </div>

                {/* Item 2 */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                  <div className="w-12 h-12 mx-auto bg-[#A8DCD2] rounded-xl flex items-center justify-center mb-4">
                    <Images className="w-6 h-6 text-[#1c7c76]" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Video – Tình huống minh họa</h3>
                  <p className="text-sm text-gray-600">
                    Video mô phỏng các tình huống như tin giả, lừa đảo, lộ thông tin cá nhân và cách xử lý chính xác.
                  </p>
                </div>

                {/* Item 3 */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                  <div className="w-12 h-12 mx-auto bg-[#A8DCD2] rounded-xl flex items-center justify-center mb-4">
                    <MessageCircle className="w-6 h-6 text-[#1c7c76]" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Tương tác & hỗ trợ</h3>
                  <p className="text-sm text-gray-600">
                    Chatbot trả lời câu hỏi về Internet an toàn, giúp học sinh xử lý tình huống mạng nhanh chóng và hiệu quả.
                  </p>
                </div>

              </div>

              {/* FOOT TEXT */}
              <p className="mt-8 text-sm md:text-base text-gray-600 leading-relaxed">
                Mục <span className="font-semibold text-[#1c7c76]">Kỹ năng mạng</span> được xây dựng
                nhằm giúp học sinh – sinh viên hiểu đúng, hành xử đúng và tự bảo vệ mình trên không gian số.
              </p>

            </div>
          )}



          {selectedFolder === "pdf_home" && activeTab === "pdf" && (
            <div className="w-full bg-white border rounded-2xl p-10 text-center shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
                📄 Tài liệu tham khảo PDF
              </h2>
              <p className="text-gray-500 text-base">
                Hãy chọn tài liệu
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
                🎬 Danh sách video
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

              {/* CHƯA CHỌN FOLDER */}
              {!selectedFolder && (
                <p className="text-center text-gray-500">Hãy chọn tài liệu.</p>
              )}
            </motion.div>
          )}



          {activeTab === "pdf" && selectedFolder !== "pdf_home" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full bg-white border border-gray-200 rounded-2xl p-8 shadow-md mb-12"
            >
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 flex items-center justify-center gap-2">
                📄 Danh sách tài liệu
              </h2>


              {selectedFolder === "pdf2" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      name: "CHIA SẺ VỀ TÌNH HUỐNG MẤT KIỂM SOÁT AN TOÀN TRÊN KHÔNG GIAN MẠNG",
                      link: "https://drive.google.com/file/d/1Zbet2-wOLsg9NKc43MeQbksqnjMQ3FZm/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764142475/Gemini_Generated_Image_kjwz2pkjwz2pkjwz_jv8n7j.png"
                    },
                    {
                      name: "LỢI ÍCH, RỦI RO VÀ GIẢI PHÁP AN TOÀN TRÊN KHÔNG GIAN MẠNG",
                      link: "https://drive.google.com/file/d/1z2P3QBo0GXelf2UqX_hXtGzGUNC7yGvB/view?usp=sharing",
                      thumbnail: "https://res.cloudinary.com/duk8odqun/image/upload/v1764142473/Gemini_Generated_Image_58ragp58ragp58ra_jfd7t4.png"
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


              {/* CHƯA CHỌN FOLDER */}
              {!selectedFolder && (
                <p className="text-center text-gray-500">Hãy chọn tài liệu.</p>
              )}
            </motion.div>
          )}

        </main>
      </div>


    </section>
  );
};

export default TaiNguyenOnline;
