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
        kynangtuhoc: "Kỹ năng tự học",
        kynangsong: "Kỹ năng sống",
        chatbot: "AI ChatBot",
        thuchanh: "Thực hành",
        tailieuonline: "Tài nguyên online",
      },
      auth: { login: "Đăng nhập", register: "Đăng ký" },
    },
    en: {
      LOGO1: "SMART",
      LOGO2: "SELF-LEARNING",
      menu: {
        kynangtuhoc: "Self-learning",
        kynangsong: "Life skills",
        chatbot: "AI ChatBot",
        thuchanh: "Practice",
        tailieuonline: "Online resources",
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
            <LuNotebookPen className="w-4 h-4" /> {t.menu.kynangtuhoc}
          </Link>

          <Link className="hover:text-yellow-400 transition flex gap-1 items-center" to="/kynangsong">
            <LuNotebookPen className="w-4 h-4" /> {t.menu.kynangsong}
          </Link>

          <Link className="hover:text-yellow-400 transition flex gap-1 items-center" to="/chatbot">
            <BsSun className="w-4 h-4" /> {t.menu.chatbot}
          </Link>

          <Link className="hover:text-yellow-400 transition flex gap-1 items-center" to="/thuchanh">
            <PiGraduationCapBold className="w-4 h-4" /> {t.menu.thuchanh}
          </Link>

          <Link className="hover:text-yellow-400 transition flex gap-1 items-center" to="/tailieuonline">
            <MdOutlineLibraryBooks className="w-4 h-4" /> {t.menu.tailieuonline}
          </Link>
        </nav>

        {/* 🔥 ACTIONS */}
        <div className="flex items-center gap-4">

          {/* Nút đăng nhập */}
          <Link
            to="/dangnhap"
            className="hidden md:block px-4 py-1.5 text-white/90 border border-white/30 rounded-xl hover:bg-white/20 transition text-sm backdrop-blur-md"
          >
            {t.auth.login}
          </Link>

          {/* Nút đăng ký nổi bật */}
          <Link
            to="/dangky"
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
            {t.menu.kynangtuhoc}
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

          <Link to="/tailieuonline" onClick={() => setIsMobileMenuOpen(false)}>
            {t.menu.tailieuonline}
          </Link>

          <div className="flex flex-col gap-3 border-t border-white/20 pt-4">
            <Link to="/dangnhap" className="px-3 py-2 bg-white/20 rounded-lg text-center">
              {t.auth.login}
            </Link>
            <Link to="/dangky" className="px-3 py-2 bg-yellow-400 text-[#1a2a2a] rounded-lg text-center">
              {t.auth.register}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
