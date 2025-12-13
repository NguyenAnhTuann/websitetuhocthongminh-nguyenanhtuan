import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  Laptop,
  BookOpen,
  ShieldCheck,
  MessageCircle,
  FileText,
  LineChart
} from "lucide-react";
import {
  HiAcademicCap
} from "react-icons/hi";
import { LuUserRoundPen } from "react-icons/lu";
import { MdOutlineLibraryBooks } from "react-icons/md";
import avatarImage from "../assets/avt.png";



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
  }, [text, speed]);

  return (
    <motion.p
      initial={{ opacity: 0, scale: 0.6, rotateX: 90 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="w-full max-w-[90%] px-4 text-center md:text-left text-sm md:text-base font-sans pt-4 pb-2 text-black  break-words whitespace-normal drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
    >
      {displayed}
      <span className="animate-pulse">|</span>
    </motion.p>
  );
};

const Home = ({ language }) => {

  useEffect(() => {
  fetch("https://websitetuhocthongminh-nguyenanhtuan.onrender.com/api/visit", {
    method: "POST",
  });
}, []);
  const navigate = useNavigate();

  const translations = {
    vi: {
      heroTitle: "Nền tảng TỰ HỌC THÔNG MINH",
      heroType:
        "Kết nối tài liệu số, kỹ năng mềm, bài tập trắc nghiệm và AI ChatBot vào một website duy nhất.",
      heroDesc:
        "Website hỗ trợ học sinh, sinh viên chủ động học tập trong kỷ nguyên số: xem tài liệu PDF, video, hình ảnh từ Google Drive; luyện kỹ năng tự học, kỹ năng sống; làm bài trắc nghiệm có chấm điểm; và tương tác với ChatBot ngay trên trang web.",
      heroPrimaryBtn: "Khám phá nội dung",
      heroSecondaryBtn: "Đăng nhập tài khoản",

      sectionsTitle: "Website có những nội dung gì?",
      sectionsSubtitle:
        "Các nội dung được chia thành 5 khu vực chính, giúp học sinh, sinh viên dễ dàng tự học và thực hành.",

      sections: [
        {
          key: "kynangtuhoc",
          title: "1. Kỹ năng tự học",
          route: "/kynangtuhoc",
          icon: <HiAcademicCap className="w-7 h-7" />,
          points: [
            "PDF: Tầm quan trọng của kỹ năng tự học trong Kỷ nguyên số",
            "PDF: Biện pháp thay đổi tích cực thói quen tự học và quản lý thời gian",
            "Video, hình ảnh, dự án thực tế của học sinh"
          ]
        },
        {
          key: "kynangsong",
          title: "2. Kỹ năng sống",
          route: "/kynangsong",
          icon: <ShieldCheck className="w-7 h-7" />,
          points: [
            "PDF: Tình huống mất kiểm soát trên không gian mạng (an toàn mạng)",
            "PDF: Biện pháp xử lý bạo lực học đường",
            "Video, hình ảnh minh họa tình huống thực tế"
          ]
        },
        {
          key: "kynangmang",
          title: "3. Kỹ năng mạng",
          route: "/kynangmang",
          icon: <MdOutlineLibraryBooks className="w-7 h-7" />,
          points: [
            "Kịch bản xử lý tình huống trên không gian mạng và đời sống",
            "Hướng dẫn an toàn mạng dành cho học sinh, sinh viên",
            "Tài liệu, sách báo, bài viết tham khảo được lưu trên Google Drive"
          ]
        },
        {
          key: "chatbot",
          title: "4. Tích hợp công cụ AI ChatBot",
          route: "/chatbot",
          icon: <MessageCircle className="w-7 h-7" />,
          points: [
            "PDF: Giới thiệu các công cụ AI phổ biến hiện nay",
            "ChatBot tích hợp trực tiếp trên website",
            "Hỗ trợ hỏi đáp, gợi ý ý tưởng, luyện tập kỹ năng"
          ]
        },
        {
          key: "thuchanh",
          title: "5. Trang thực hành",
          route: "/thuchanh",
          icon: <Laptop className="w-7 h-7" />,
          points: [
            "Bài tập trắc nghiệm có chấm điểm tự động",
            "Câu hỏi gắn với tình huống thực tế",
            "Video tình huống để học sinh phân tích và trả lời"
          ]
        },
      ],

      accountTitle: "Tài khoản & Bảo mật",
      accountDesc:
        "Website hỗ trợ hệ thống tài khoản riêng cho sinh viên và một tài khoản Admin để quản lý toàn bộ hoạt động học tập.",
      accountStudentTitle: "Tài khoản sinh viên",
      accountStudentPoints: [
        "Đăng ký / đăng nhập để lưu tiến trình học",
        "Xem lại lịch sử làm bài trắc nghiệm và điểm số",
        "Truy cập các nội dung, tài liệu phù hợp với từng nhóm học sinh"
      ],
      accountAdminTitle: "Tài khoản Admin (1 người quản lý)",
      accountAdminPoints: [
        "Đăng nhập bằng tài khoản quản trị riêng",
        "Xem thống kê số lượng học sinh đăng ký",
        "Theo dõi điểm số, kết quả bài tập trắc nghiệm",
        "Quản lý nội dung: thêm/sửa tài liệu, bài tập, video"
      ],
      accountSecurityNote:
        "Hệ thống sẽ áp dụng các biện pháp bảo mật cơ bản cho đăng ký và đăng nhập (mã hóa mật khẩu, phân quyền sinh viên / admin, kiểm soát truy cập).",

      howTitle: "Website hoạt động như thế nào?",
      howSteps: [
        "Bước 1: Học sinh truy cập website, xem nội dung miễn phí hoặc đăng ký tài khoản sinh viên.",
        "Bước 2: Học sinh chọn mục Kỹ năng tự học, Kỹ năng sống hoặc Tài nguyên để đọc tài liệu, xem video.",
        "Bước 3: Thực hành trên trang Bài tập trắc nghiệm, làm bài và xem điểm ngay sau khi nộp.",
        "Bước 4: Sử dụng ChatBot tích hợp để hỏi thêm, tìm gợi ý, giải thích nội dung khó.",
        "Bước 5: Admin đăng nhập vào tài khoản quản trị để xem thống kê học sinh, điểm số và cập nhật nội dung."
      ],

      ctaBottom: "Bắt đầu từ Kỹ năng tự học",
      ctaBottomSub: "Hoặc khám phá từng mục trong thanh menu phía trên."
    },

    // ================= ENGLISH VERSION =================
    en: {
      heroTitle: "SMART SELF-LEARNING PLATFORM",
      heroType:
        "Connecting digital materials, life skills, quizzes and AI ChatBot into one website.",
      heroDesc:
        "This website helps students become active learners in the digital era: view PDFs, videos, images from Google Drive; practice self-learning and life skills; take auto-graded quizzes; and interact with ChatBot directly on the site.",
      heroPrimaryBtn: "Explore content",
      heroSecondaryBtn: "Sign in",

      sectionsTitle: "What does this website provide?",
      sectionsSubtitle:
        "All learning content is organized into 5 main areas to support self-learning and real practice.",

      sections: [
        {
          key: "kynangtuhoc",
          title: "1. Self-learning skills",
          route: "/kynangtuhoc",
          icon: <HiAcademicCap className="w-7 h-7" />,
          points: [
            "PDF: The importance of self-learning in the digital era",
            "PDF: Positive changes in learning habits and time management",
            "Videos, images, and student projects"
          ]
        },
        {
          key: "kynangsong",
          title: "2. Life skills",
          route: "/kynangsong",
          icon: <ShieldCheck className="w-7 h-7" />,
          points: [
            "PDF: Case studies of losing control on social media (online safety)",
            "PDF: Solutions for handling school violence",
            "Visual content and sample real-life scenarios"
          ]
        },
        {
          key: "chatbot",
          title: "3. AI ChatBot integration",
          route: "/chatbot",
          icon: <MessageCircle className="w-7 h-7" />,
          points: [
            "PDF: Overview of popular AI tools today",
            "Built-in ChatBot chatbot for Q&A and practice",
            "Support for exploring knowledge and generating ideas"
          ]
        },
        {
          key: "thuchanh",
          title: "4. Practice page",
          route: "/thuchanh",
          icon: <Laptop className="w-7 h-7" />,
          points: [
            "Auto-graded multiple-choice quizzes",
            "Questions attached to real situations",
            "Scenario-based videos for students to analyze and answer"
          ]
        },
        {
          key: "kynangmang",
          title: "5. Resources & digital library",
          route: "/kynangmang",
          icon: <MdOutlineLibraryBooks className="w-7 h-7" />,
          points: [
            "Scenario scripts for handling online and offline situations",
            "Guides to online safety and digital citizenship",
            "Documents and articles stored and shared via Google Drive"
          ]
        }
      ],

      accountTitle: "Accounts & Security",
      accountDesc:
        "The website supports separate accounts for students and one Admin account to manage the whole learning system.",
      accountStudentTitle: "Student accounts",
      accountStudentPoints: [
        "Sign up / sign in to save learning progress",
        "Review quiz history and scores",
        "Access learning materials tailored to each student group"
      ],
      accountAdminTitle: "Admin account (single manager)",
      accountAdminPoints: [
        "Sign in with a dedicated admin account",
        "View statistics of registered students",
        "Track quiz results and learning performance",
        "Manage content: add / edit documents, quizzes, and videos"
      ],
      accountSecurityNote:
        "Basic security measures will be applied to registration and login (password hashing, role-based access control for student/admin, and protected routes).",

      howTitle: "How does the website work?",
      howSteps: [
        "Step 1: Students access the website and optionally create a student account.",
        "Step 2: They choose Self-learning Skills, Life Skills, or Resources to study PDFs and watch videos.",
        "Step 3: They go to the Practice page, take quizzes, and see scores immediately.",
        "Step 4: They use the built-in ChatBot tool to ask questions and deepen understanding.",
        "Step 5: The Admin logs in to the management dashboard to see statistics and update content."
      ],

      ctaBottom: "Start with Self-learning skills",
      ctaBottomSub: "Or explore each section from the menu above."
    }
  };

  const t = translations[language];

  return (
    <section className="min-h-screen flex flex-col items-center justify-start px-4 py-20 bg-white ">
      {/* HERO SECTION */}
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* Left content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className=" mt-6 md:mt-10 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-outfit leading-tight 
             bg-[#1c7c76] px-6 py-4 rounded-2xl shadow-sm inline-block"
          >
            {t.heroTitle}
          </motion.h1>


          <Typewriter text={t.heroType} />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="
    w-full max-w-[95%]
    text-justify md:text-justify
    text-sm xs:text-base md:text-lg
    px-2 md:px-4
    pt-3 pb-2
    break-words whitespace-normal
    leading-relaxed
    text-black
  "
          >
            {t.heroDesc}
          </motion.p>


          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 flex flex-col sm:flex-row gap-3"
          >
            <button
              onClick={() => navigate("/kynangtuhoc")}
              className="px-4 py-2 text-xs
  xs:px-5 xs:py-2.5 xs:text-sm
  md:px-6 md:py-3 md:text-base
  rounded-full bg-[#3C9E8F] text-white text-sm font-semibold shadow-md hover:bg-yellow-500 transition"
            >
              {t.heroPrimaryBtn}
            </button>
            <button
              onClick={() => navigate("/dangnhap")} // route tạm, bạn sẽ tạo sau
              className="px-4 py-2 text-xs
  xs:px-5 xs:py-2.5 xs:text-sm
  md:px-6 md:py-3 md:text-base
  rounded-full border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-300 transition flex items-center gap-2"
            >
              <LuUserRoundPen className="w-4 h-4" />
              {t.heroSecondaryBtn}
            </button>
          </motion.div>

          {/* Small info row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-6 grid grid-cols-2 gap-3 text-xs md:text-sm text-gray-500 dark:text-gray-400"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#3C9E8F]" />
              <span>Tài liệu PDF, video lưu trên Google Drive</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#3C9E8F]" />
              <span>ChatBot ChatBot tích hợp</span>
            </div>
          </motion.div>
        </div>

        {/* Right avatar / illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <div className="relative flex justify-center mb-6 mt-4">
            <img
              src={avatarImage}
              className="
    w-28 h-28          /* Mobile nhỏ */
    xs:w-36 xs:h-36    /* Mobile lớn & iPhone Pro Max */
    sm:w-40 sm:h-40    /* Tablet dọc */
    md:w-52 md:h-52    /* iPad ngang & laptop */
    lg:w-60 lg:h-60    /* PC rộng */
    object-cover rounded-full border-4 border-white shadow-lg
  "
            />

          </div>



          {/* Text bên dưới avatar */}
          <div className="flex flex-col items-center gap-1">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#3C9E8F] uppercase tracking-wide">
              <Laptop className="w-4 h-4" />
              {language === "vi"
                ? "Học tập chủ động trong kỷ nguyên số"
                : "Active learning in the digital age"}
            </span>
          </div>
        </motion.div>

      </div>

      {/* SECTIONS: MAIN CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full max-w-6xl mt-16"
      >
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-gray-900  mb-2">
          {t.sectionsTitle}
        </h2>
        <p className="text-sm md:text-base text-center text-gray-600  max-w-3xl mx-auto mb-8">
          {t.sectionsSubtitle}
        </p>

        <div className="
  grid 
  grid-cols-1               /* Mobile */
  sm:grid-cols-2            /* iPhone ngang / tablet nhỏ */
  md:grid-cols-2            /* Tablet */
  lg:grid-cols-3            /* Laptop */
  xl:grid-cols-3            /* PC */
  gap-4 sm:gap-6
">

          {t.sections.map((section, idx) => (
            <motion.div
              key={section.key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
              className="bg-white border border-gray-200 hover:border-[#3C9E8F] rounded-2xl p-4 xs:p-5 md:p-6 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col"
              onClick={() => navigate(section.route)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <div className="absolute w-10 h-10 bg-[#A8DCD2] rounded-xl opacity-60"></div>
                  <div className="relative z-10 text-[#3C9E8F]">{section.icon}</div>
                </div>
                <h3 className="text-sm md:text-base font-bold text-gray-900 ">
                  {section.title}
                </h3>
              </div>
              <ul className="text-xs xs:text-sm md:text-base text-gray-600  space-y-1.5 flex-1">
                {section.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#3C9E8F] flex-shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ACCOUNTS & SECURITY */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-full max-w-6xl mt-16"
      >
        <div className="bg-white  border border-gray-200  rounded-2xl p-6 md:p-8 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 ">
                {t.accountTitle}
              </h2>
              <p className="text-sm md:text-sm text-gray-600  mt-2 max-w-2xl">
                {t.accountDesc}
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="inline-flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#3C9E8F]" />
                <span>
                  {language === "vi"
                    ? "Mật khẩu được mã hoá – phân quyền sinh viên / admin"
                    : "Password hashing & role-based access control"}
                </span>
              </div>
              <div className="inline-flex items-center gap-2">
                <LineChart className="w-4 h-4 text-[#3C9E8F]" />
                <span>
                  {language === "vi"
                    ? "Admin xem thống kê số lượng học sinh & điểm số"
                    : "Admin dashboard with student & score statistics"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-4">
            {/* Student account */}
            <div className="bg-white  border border-gray-200  rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <LuUserRoundPen className="w-5 h-5 text-[#3C9E8F]" />
                <h3 className="font-bold text-gray-900  text-sm md:text-base">
                  {t.accountStudentTitle}
                </h3>
              </div>
              <ul className="text-xs xs:text-sm md:text-base text-gray-600  space-y-1.5">
                {t.accountStudentPoints.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#3C9E8F] flex-shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Admin account */}
            <div className="bg-white  border border-gray-200  rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-[#3C9E8F]" />
                <h3 className="font-bold text-gray-900  text-sm md:text-base">
                  {t.accountAdminTitle}
                </h3>
              </div>
              <ul className="text-xs xs:text-sm md:text-base text-gray-600  space-y-1.5">
                {t.accountAdminPoints.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#3C9E8F] flex-shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-4 text-xs md:text-sm text-gray-500 dark:text-gray-400 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#3C9E8F] mt-0.5 flex-shrink-0" />
            <span>{t.accountSecurityNote}</span>
          </p>
        </div>
      </motion.div>

      {/* HOW IT WORKS / BOTTOM CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="w-full max-w-6xl mt-16 mb-10"
      >
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900  mb-3">
          {t.howTitle}
        </h2>
        <ol className="list-decimal ml-5 text-xs xs:text-sm md:text-base text-gray-600  space-y-1.5">
          {t.howSteps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>

        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <button
              onClick={() => navigate("/kynangtuhoc")}
              className="px-4 py-2 text-xs
  xs:px-5 xs:py-2.5 xs:text-sm
  md:px-6 md:py-3 md:text-base
  rounded-full bg-[#3C9E8F] text-white text-sm font-semibold shadow-md hover:bg-yellow-500 transition inline-flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              {t.ctaBottom}
            </button>
            <p className="mt-2 text-xs md:text-sm text-gray-500">
              {t.ctaBottomSub}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Home;
