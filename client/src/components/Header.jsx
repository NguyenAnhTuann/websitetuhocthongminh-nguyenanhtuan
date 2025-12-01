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
  const mobileMenuRef = useRef(null);


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

  useEffect(() => {
    function handleClickOutsideMenu(e) {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => document.removeEventListener("mousedown", handleClickOutsideMenu);
  }, [isMobileMenuOpen]);




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
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setRole(storedRole);
    } else {
      setUser(null);
      setRole(null);
    }
  }, []);


  return (
    <header className="w-full fixed top-0 z-[9999] backdrop-blur-md bg-[#1c7c76] shadow-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <Link
          to="/trangchu"
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
            <GraduationCap className="w-4 h-4" /> {t.menu.kynangtuhoc}
          </Link>

          <Link className="hover:text-yellow-400 transition flex gap-1 items-center" to="/kynangsong">
            <HeartHandshake className="w-4 h-4" /> {t.menu.kynangsong}
          </Link>

          <Link className="hover:text-yellow-400 transition flex gap-1 items-center" to="/kynangmang">
            <Shield className="w-4 h-4" /> {t.menu.kynangmang}
          </Link>

          <Link className="hover:text-yellow-400 transition flex gap-1 items-center" to="/chatbot">
            <Bot className="w-4 h-4" /> {t.menu.chatbot}
          </Link>

          <Link className="hover:text-yellow-400 transition flex gap-1 items-center" to="/thuchanh">
            <CheckSquare className="w-4 h-4" /> {t.menu.thuchanh}
          </Link>

        </nav>

        {/* 🔥 ACTIONS */}
        <div className="flex items-center gap-4">

          {/* Nếu CHƯA đăng nhập → hiện Login + Register */}
          {!user && (
            <>
              <Link
                to="/dangnhap"
                className="hidden md:block px-4 py-1.5 text-white/90 border border-white/30 rounded-xl hover:bg-white/20 transition text-sm backdrop-blur-md"
              >
                {t.auth.login}
              </Link>

              <Link
                to="/dangky"
                className="hidden md:block px-4 py-1.5 bg-yellow-400 text-[#1a2a2a] font-medium rounded-xl shadow-md hover:bg-yellow-300 transition text-sm"
              >
                {t.auth.register}
              </Link>
            </>
          )}

          {/* Nếu ĐÃ đăng nhập → hiện TÊN + ĐĂNG XUẤT */}
          {user && (
            <div className="hidden md:flex items-center gap-3 text-white">
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
                className="hidden md:block px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
              >
                Đăng xuất
              </button>
            </div>
          )}




        </div>

        {/* 🔥 NÚT MENU MOBILE */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white text-3xl"
        >
          ☰
        </button>


      </div>
      {/* TÊN NGƯỜI DÙNG — CHỈ HIỆN TRÊN MOBILE */}
      {user && (
        <div className="md:hidden w-full bg-[#1c7c76] text-white px-6 py-2 border-t border-white/20 mt-2">
          <span className="flex items-center justify-center gap-2 font-semibold">
            👋 {user.fullName}
          </span>
        </div>
      )}


      {/* 🔥 MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-[#1c7c76] text-white px-6 py-4 space-y-4 border-t border-white/20"
        >


          <Link
            className="block hover:text-yellow-300"
            to="/kynangtuhoc"
            onClick={() => setIsMobileMenuOpen(false)}
          >

            <GraduationCap className="inline w-4 h-4 mr-2" />
            {t.menu.kynangtuhoc}
          </Link>

          <Link
            className="block hover:text-yellow-300"
            to="/kynangsong"
            onClick={() => setIsMobileMenuOpen(false)}
          >

            <HeartHandshake className="inline w-4 h-4 mr-2" />
            {t.menu.kynangsong}
          </Link>

          <Link
            className="block hover:text-yellow-300"
            to="/kynangmang"
            onClick={() => setIsMobileMenuOpen(false)}
          >

            <Shield className="inline w-4 h-4 mr-2" />
            {t.menu.kynangmang}
          </Link>

          <Link
            className="block hover:text-yellow-300"
            to="/chatbot"
            onClick={() => setIsMobileMenuOpen(false)}
          >

            <Bot className="inline w-4 h-4 mr-2" />
            {t.menu.chatbot}
          </Link>

          <Link
            className="block hover:text-yellow-300"
            to="/thuchanh"
            onClick={() => setIsMobileMenuOpen(false)}
          >

            <CheckSquare className="inline w-4 h-4 mr-2" />
            {t.menu.thuchanh}
          </Link>

          {/* 🔥 LOGIN / REGISTER CHO MOBILE */}
          {!user && (
            <div className="pt-4 border-t border-white/20 space-y-3">
              <Link
                to="/dangnhap"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-center border border-white/40 rounded-lg"
              >

                {t.auth.login}
              </Link>

              <Link
                to="/dangky"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-center bg-yellow-400 text-[#1a2a2a] rounded-lg font-semibold"
              >

                {t.auth.register}
              </Link>
            </div>
          )}

          {/* 🔥 LOGOUT cho mobile */}
          {user && (
            <>
              {/* 👇 Nút Quản lý dữ liệu (chỉ admin) */}
              {role === "admin" && (
                <Link
                  to="/admin-dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-4 py-2 mt-2 bg-yellow-400 text-[#1a2a2a] text-center rounded-lg font-semibold hover:bg-yellow-300 transition"
                >
                  Quản lý dữ liệu
                </Link>
              )}

              {/* 👇 Nút Đăng xuất */}
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="w-full px-4 py-2 mt-4 bg-red-500 rounded-lg"
              >
                Đăng xuất
              </button>
            </>
          )}

        </div>
      )}


    </header>
  );
};

export default Header;