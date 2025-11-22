import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuNotebookPen, LuSchool } from "react-icons/lu";
import { PiGraduationCapBold } from "react-icons/pi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { Menu, X } from 'lucide-react';
import { BsSun } from "react-icons/bs";

const Header = ({ language, setLanguage }) => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLanguageToggle = () => {
    setLanguage(prev => (prev === 'vi' ? 'en' : 'vi'));
  };

  const translations = {
    vi: {
      name: "TỰ HỌC THÔNG MINH",
      menu: {
        kynangtuhoch: "Kỹ năng tự học",
        kynangsong: "Kỹ năng sống",
        chatbot: "Công cụ AI ChatBot",
        thuchanh: "Thực hành",
        tailieuso: "Tài nguyên online"
      }
    },
    en: {
      name: "SMART SELF-LEARNING",
      menu: {
        kynangtuhoch: "Self-learning Skills",
        kynangsong: "Life Skills",
        chatbot: "AI ChatBot Tool",
        thuchanh: "Practice",
        tailieuso: "Online Resources"
      }
    }
  };

  const t = translations[language].menu;

  return (
    <header className="w-full fixed top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/home" className="group flex items-center gap-2 transition hover:scale-110">
            <img
              src="https://res.cloudinary.com/duk8odqun/image/upload/v1745472544/Frame_2_duhppo.png"
              alt="Logo"
              className="w-7 h-7 group-hover:rotate-[360deg] transition-transform duration-500"
            />

            <span className="font-medium text-gray-800 text-[15px]">
              {translations[language].name}
            </span>
          </Link>
        </div>

        {/* PC Menu */}
        <nav className="hidden md:flex items-center gap-6 text-[14px] text-gray-700 font-medium">
          <Link to="/kynangtuhoc" className="flex items-center gap-2 hover:text-sky-600">
            <LuNotebookPen className="w-4 h-4" />
            {t.kynangtuhoch}
          </Link>

          <Link to="/kynangsong" className="flex items-center gap-2 hover:text-sky-600">
            <LuSchool className="w-4 h-4" />
            {t.kynangsong}
          </Link>

          <Link to="/chatbot" className="flex items-center gap-2 hover:text-sky-600">
            <BsSun className="w-4 h-4" />
            {t.chatbot}
          </Link>

          <Link to="/thuchanh" className="flex items-center gap-2 hover:text-sky-600">
            <PiGraduationCapBold className="w-4 h-4" />
            {t.thuchanh}
          </Link>

          <Link to="/tailieuso" className="flex items-center gap-2 hover:text-sky-600">
            <MdOutlineLibraryBooks className="w-4 h-4" />
            {t.tailieuso}
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">

          {/* Language */}
          <button
            onClick={handleLanguageToggle}
            className="border border-gray-200 rounded-lg p-1 w-11 h-7 flex items-center justify-center hover:bg-gray-100 transition"
          >
            <img
              src={language === 'vi'
                ? "https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg"
                : "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"}
              alt="Flag"
              className="w-6 h-4 object-cover"
            />
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className="text-gray-700 md:hidden"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white px-6 py-4 flex flex-col gap-6 text-gray-800 font-medium">

          <Link to="/kynangtuhoc" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
            <LuNotebookPen className="w-5 h-5" />
            {t.kynangtuhoch}
          </Link>

          <Link to="/kynangsong" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
            <LuSchool className="w-5 h-5" />
            {t.kynangsong}
          </Link>

          <Link to="/chatbot" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
            <BsSun className="w-5 h-5" />
            {t.chatbot}
          </Link>

          <Link to="/thuchanh" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
            <PiGraduationCapBold className="w-5 h-5" />
            {t.thuchanh}
          </Link>

          <Link to="/tailieuso" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
            <MdOutlineLibraryBooks className="w-5 h-5" />
            {t.tailieuso}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
