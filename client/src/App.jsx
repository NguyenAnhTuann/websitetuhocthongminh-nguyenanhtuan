import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

// Components
import Header from './components/Header';
import Home from './components/Home';
import ScrollToTop from './components/ScrollToTop';

// New pages
import KyNangTuHoc from "./components/KyNangTuHoc";
import KyNangSong from './components/KyNangSong';
import ChatBot from './components/ChatBot';
import ThucHanh from './components/ThucHanh';
import TaiNguyenOnline from './components/TaiNguyenOnline';
import Login from "./components/Login";
import Register from "./components/Register";
import KyNangSongBaoLuc from "./components/KyNangSongBaoLuc";
import KyNangSongKhac from "./components/KyNangSongKhac";




const AppWrapper = () => {
  const location = useLocation();
  const [language, setLanguage] = useState('vi');

  const getInitialTheme = () => {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 5;
  };

  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <>
      <ScrollToTop />

      <div className="font-sans">
        <Header
          language={language}
          setLanguage={setLanguage}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />

        <div className="pt-[50px]">

          <Routes>
            {/* Redirect root → /home */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* Trang chủ */}
            <Route path="/home" element={<Home language={language} />} />

            {/* 5 trang mới theo menu */}
            <Route
              path="/kynangtuhoc" element={<KyNangTuHoc language={language} />}
            />
            <Route path="/kynangsong" element={<KyNangSong language={language} />} />

            {/* 2 trang con */}
            <Route path="/kynangsong/baoluc" element={<KyNangSongBaoLuc language={language} />} />
            <Route path="/kynangsong/khac" element={<KyNangSongKhac language={language} />} />



            <Route path="/chatbot" element={<ChatBot language={language} />} />
            <Route path="/thuchanh" element={<ThucHanh language={language} />} />
            <Route path="/tailieuso" element={<TaiNguyenOnline language={language} />} />
            {/* ===== Trang Đăng Nhập ===== */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />




          </Routes>

        </div>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
