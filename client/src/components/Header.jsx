import { Link } from "react-router-dom";

import React, { useState, useRef, useEffect } from "react";

import {
  GraduationCap,
  HeartHandshake,
  Shield,
  Bot,
  CheckSquare
} from "lucide-react";



const Header = ({ language, setLanguage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openLifeMenu, setOpenLifeMenu] = useState(false);
  const lifeMenuRef = useRef(null);
  const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  if (storedUser && storedToken) {
    setUser(JSON.parse(storedUser));
  } else {
    setUser(null);
  }
}, []);




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
        kynangmang: "Kỹ năng mạng",
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
        kynangmang: "Online resources",
      },
      auth: { login: "Login", register: "Register" },
    },
  };

  const t = translations[language];

  return (
    <header className="w-full fixed top-0 z-50 backdrop-blur-md bg-[#1c7c76] shadow-sm border-b border-white/20">
      <div className="
  max-w-7xl mx-auto flex items-center justify-between
  px-3 xs:px-4 sm:px-6 md:px-8
  py-3 sm:py-4
">

        {/* 🔥 LOGO kiểu Landing Page như ảnh */}
        <Link
          to="/home"
          className="group flex flex-col leading-tight select-none"
        >
          <span className="text-[18px]
  xs:text-[20px]
  sm:text-[22px]
  md:text-[22px]
  font-bold text-white tracking-tight group-hover:text-yellow-200 transition">
            {t.LOGO1}
          </span>

          <span className="text-[22px]
  xs:text-[26px]
  sm:text-[28px]
  md:text-[30px]
  lg:text-[32px]
  font-extrabold text-white group-hover:text-yellow-300 transition tracking-tight">
            {t.LOGO2}
          </span>
        </Link>

        {/* 🔥 MENU DESKTOP */}
        <nav className="
  hidden md:flex items-center
  gap-4 lg:gap-6 xl:gap-8
  text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px]
  text-white/90 font-medium
">

          <Link className="hover:text-yellow-400 transition flex gap-1 items-center" to="/kynangtuhoc">
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" /> {t.menu.kynangtuhoc}
          </Link>

          <Link className="hover:text-yellow-400 transition flex gap-1 items-center" to="/kynangsong">
            <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5" /> {t.menu.kynangsong}
          </Link>

          <Link className="hover:text-yellow-400 transition flex gap-1 items-center" to="/kynangmang">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5" /> {t.menu.kynangmang}
          </Link>

          <Link className="hover:text-yellow-400 transition flex gap-1 items-center" to="/chatbot">
            <Bot className="w-4 h-4 sm:w-5 sm:h-5" /> {t.menu.chatbot}
          </Link>

          <Link className="hover:text-yellow-400 transition flex gap-1 items-center" to="/thuchanh">
            <CheckSquare className="w-4 h-4 sm:w-5 sm:h-5" /> {t.menu.thuchanh}
          </Link>

        </nav>

        {/* 🔥 ACTIONS */}
        <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">

          {/* Nếu CHƯA đăng nhập → hiện Login + Register */}
          {!user && (
            <>
              <Link
                to="/dangnhap"
                className="hidden md:block
  px-3 py-1 text-xs
  sm:px-4 sm:py-1.5 sm:text-sm
  border border-white/30 text-white/90 rounded-xl hover:bg-white/20 transition  backdrop-blur-md"
              >
                {t.auth.login}
              </Link>

              <Link
                to="/dangky"
                className="hidden md:block
  px-3 py-1 text-xs
  sm:px-4 sm:py-1.5 sm:text-sm
  border border-white/30 text-white/90 rounded-xl font-medium hover:bg-yellow-300 transition text-sm"
              >
                {t.auth.register}
              </Link>
            </>
          )}

          {/* Nếu ĐÃ đăng nhập → hiện TÊN + ĐĂNG XUẤT */}
          {user && (
            <div className="flex items-center gap-3 text-white">
              <span className="font-semibold flex items-center gap-2">
                👋 {user.fullName}
              </span>

              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                  localStorage.removeItem("role"); 
                  window.location.reload();
                }}

                className="px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
              >
                Đăng xuất
              </button>
            </div>
          )}



        </div>

      </div>


    </header>
  );
};

export default Header;
