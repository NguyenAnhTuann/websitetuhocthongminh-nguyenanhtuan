import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import GlobalToastProvider from "./components/GlobalToast";

// Pages
import Home from "./components/Home";
import KyNangTuHoc from "./components/KyNangTuHoc";
import KyNangSong from "./components/KyNangSong";
import ChatBot from "./components/ChatBot";
import ThucHanh from "./components/ThucHanh";
import TaiNguyenOnline from "./components/TaiNguyenOnline";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";

// Utils
import RedirectIfLoggedIn from "./utils/RedirectIfLoggedIn";
import ProtectedRoute from "./utils/ProtectedRoute";

// Quên mật khẩu flow
import QuenMatKhau from "./components/QuenMatKhau";
import NhapOTP from "./components/NhapOTP";
import DatMatKhauMoi from "./components/DatMatKhauMoi";

// -----------------------------
// APP WRAPPER
// -----------------------------
const AppWrapper = () => {
  const location = useLocation();
  const [language, setLanguage] = useState("vi");

  // Ẩn header cho trang admin
  const hideHeaderPages = ["/admin-dashboard"];
  const shouldHideHeader = hideHeaderPages.includes(location.pathname);

  // Dark Mode settings
  const getInitialTheme = () => {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 5;
  };

  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);
  const hideFooterPages = ["/admin-dashboard"];
  const shouldHideFooter = hideFooterPages.includes(location.pathname);


  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDarkMode]);

  return (
    <>
      <ScrollToTop />

      {/* Bố cục chính */}
      <div className="min-h-screen flex flex-col font-sans">

        {/* HEADER */}
        {!shouldHideHeader && (
          <Header
            language={language}
            setLanguage={setLanguage}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        )}

        {/* MAIN CONTENT */}
        <main
          className={
            location.pathname === "/admin-dashboard"
              ? "flex-grow"                   // không padding trên trang admin
              : "flex-grow pt-[50px]"         // giữ padding cho các trang khác
          }
        >

          <GlobalToastProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />

              <Route path="/home" element={<Home language={language} />} />

              <Route
                path="/kynangtuhoc"
                element={<KyNangTuHoc language={language} />}
              />

              <Route
                path="/kynangsong"
                element={<KyNangSong language={language} />}
              />

              <Route
                path="/chatbot"
                element={<ChatBot language={language} />}
              />

              <Route
                path="/thuchanh"
                element={
                  <ProtectedRoute>
                    <ThucHanh language={language} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/kynangmang"
                element={<TaiNguyenOnline language={language} />}
              />

              <Route path="/admin-dashboard" element={<AdminDashboard />} />

              <Route
                path="/dangnhap"
                element={
                  <RedirectIfLoggedIn>
                    <Login />
                  </RedirectIfLoggedIn>
                }
              />

              <Route
                path="/dangky"
                element={
                  <RedirectIfLoggedIn>
                    <Register />
                  </RedirectIfLoggedIn>
                }
              />


              {/* QUÊN MẬT KHẨU FLOW */}
              <Route path="/quenmatkhau" element={<QuenMatKhau />} />
              <Route path="/otp" element={<NhapOTP />} />
              <Route path="/datmatkhaumoi" element={<DatMatKhauMoi />} />


            </Routes>
          </GlobalToastProvider>
        </main>

        {/* FOOTER */}
        {!shouldHideFooter && <Footer />}

      </div>
    </>
  );
};

// -----------------------------
// MAIN APP
// -----------------------------
const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;