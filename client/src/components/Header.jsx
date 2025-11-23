import { Link } from "react-router-dom";
import { LuNotebookPen, LuSchool } from "react-icons/lu";
import { PiGraduationCapBold } from "react-icons/pi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { Menu, X } from "lucide-react";
import { BsSun } from "react-icons/bs";
import React, { useState, useRef, useEffect } from "react";


const Header = ({ language, setLanguage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openLifeMenu, setOpenLifeMenu] = useState(false);
  const lifeMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (lifeMenuRef.current && !lifeMenuRef.current.contains(e.target)) {
        setOpenLifeMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === "vi" ? "en" : "vi"));
  };

  const translations = {
    vi: {
      LOGO1: "TỰ HỌC",
      LOGO2: "THÔNG MINH",
      menu: {
        kynangtuhoch: "Kỹ năng tự học",
        kynangsong: "Kỹ năng sống",
        chatbot: "AI ChatBot",
        thuchanh: "Thực hành",
        tailieuso: "Tài nguyên online",
      },
      auth: { login: "Đăng nhập", register: "Đăng ký" },
    },
    en: {
      LOGO1: "SMART",
      LOGO2: "SELF-LEARNING",
      menu: {
        kynangtuhoch: "Self-learning",
        kynangsong: "Life skills",
        chatbot: "AI ChatBot",
        thuchanh: "Practice",
        tailieuso: "Online resources",
      },
      auth: { login: "Login", register: "Register" },
    },
  };

  const t = translations[language];

  return (
    <header className="w-full fixed top-0 z-50 backdrop-blur-md bg-[#1c7c76] shadow-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* 🔥 LOGO kiểu Landing Page như ảnh */}
        <Link
          to="/home"
          className="group flex flex-col leading-tight select-none"
        >
          <span className="text-[20px] md:text-[22px] font-bold text-white tracking-tight group-hover:text-yellow-200 transition">
            {t.LOGO1}
          </span>

          <span className="text-[26px] md:text-[30px] font-extrabold text-white group-hover:text-yellow-300 transition tracking-tight">
            {t.LOGO2}
          </span>
        </Link>

        {/* 🔥 MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] text-white/90 font-medium">
          <Link className="hover:text-yellow-400 transition flex gap-1 items-center" to="/kynangtuhoc">
            <LuNotebookPen className="w-4 h-4" /> {t.menu.kynangtuhoch}
          </Link>

          <div
  ref={lifeMenuRef}
  className="relative"
>
  <button
    onClick={() => setOpenLifeMenu((prev) => !prev)}
    onMouseEnter={() => setOpenLifeMenu(true)}
    className="hover:text-yellow-400 transition flex items-center gap-1"
  >
    <LuSchool className="w-4 h-4" /> {t.menu.kynangsong}
  </button>

  {/* DROPDOWN – chỉ đóng khi click ra ngoài */}
  {openLifeMenu && (
    <div
      onMouseEnter={() => setOpenLifeMenu(true)}
      onMouseLeave={() => setOpenLifeMenu(true)} 
      className="absolute top-full left-0 mt-2 w-60 bg-white text-gray-800 rounded-xl shadow-lg border border-gray-200 p-2 z-50"
    >
      <Link
        to="/kynangsong/baoluc"
        className="block px-4 py-2 rounded-lg hover:bg-gray-100"
      >
        🔹 Kỹ năng sống trong bạo lực
      </Link>

      <Link
        to="/kynangsong/khac"
        className="block px-4 py-2 rounded-lg hover:bg-gray-100"
      >
        🔹 Kỹ năng sống khác
      </Link>
    </div>
  )}
</div>



          <Link className="hover:text-yellow-400 transition flex gap-1 items-center" to="/chatbot">
            <BsSun className="w-4 h-4" /> {t.menu.chatbot}
          </Link>

          <Link className="hover:text-yellow-400 transition flex gap-1 items-center" to="/thuchanh">
            <PiGraduationCapBold className="w-4 h-4" /> {t.menu.thuchanh}
          </Link>

          <Link className="hover:text-yellow-400 transition flex gap-1 items-center" to="/tailieuso">
            <MdOutlineLibraryBooks className="w-4 h-4" /> {t.menu.tailieuso}
          </Link>
        </nav>

        {/* 🔥 ACTIONS */}
        <div className="flex items-center gap-4">

          {/* Nút đăng nhập */}
          <Link
            to="/login"
            className="hidden md:block px-4 py-1.5 text-white/90 border border-white/30 rounded-xl hover:bg-white/20 transition text-sm backdrop-blur-md"
          >
            {t.auth.login}
          </Link>

          {/* Nút đăng ký nổi bật */}
          <Link
            to="/register"
            className="hidden md:block px-4 py-1.5 bg-yellow-400 text-[#1a2a2a] font-medium rounded-xl shadow-md hover:bg-yellow-300 transition text-sm"
          >
            {t.auth.register}
          </Link>

          {/* Language toggle */}
          <button
            onClick={handleLanguageToggle}
            className="border border-white/30 rounded-lg p-1 w-11 h-7 flex items-center justify-center hover:bg-white/20 backdrop-blur-md"
          >
            <img
              src={
                language === "vi"
                  ? "https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg"
                  : "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
              }
              alt="Flag"
              className="w-6 h-4 object-cover"
            />
          </button>

          {/* Mobile button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* 🔥 MOBILE MENU (Glassmorphism) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1a6d66]/40 backdrop-blur-lg px-6 py-5 flex flex-col gap-5 text-white font-medium border-t border-white/20">

          <Link to="/kynangtuhoc" onClick={() => setIsMobileMenuOpen(false)}>
            {t.menu.kynangtuhoch}
          </Link>

          <Link to="/kynangsong" onClick={() => setIsMobileMenuOpen(false)}>
            {t.menu.kynangsong}
          </Link>

          <Link to="/chatbot" onClick={() => setIsMobileMenuOpen(false)}>
            {t.menu.chatbot}
          </Link>

          <Link to="/thuchanh" onClick={() => setIsMobileMenuOpen(false)}>
            {t.menu.thuchanh}
          </Link>

          <Link to="/tailieuso" onClick={() => setIsMobileMenuOpen(false)}>
            {t.menu.tailieuso}
          </Link>

          <div className="flex flex-col gap-3 border-t border-white/20 pt-4">
            <Link to="/login" className="px-3 py-2 bg-white/20 rounded-lg text-center">
              {t.auth.login}
            </Link>
            <Link to="/register" className="px-3 py-2 bg-yellow-400 text-[#1a2a2a] rounded-lg text-center">
              {t.auth.register}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
