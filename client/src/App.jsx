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
import RequireAuth from "./utils/RequireAuth";
import RequireFlowStep from "./utils/RequireFlowStep";

import ChinhSachBaoMat from "./components/ChinhSachBaoMat";
import DieuKhoanSuDung from "./components/DieuKhoanSuDung";




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
  const [step, setStep] = useState(0);
  const [resetEmail, setResetEmail] = useState("");


  useEffect(() => {
    function goBackForgot() {
      setStep(1);
    }

    window.addEventListener("go_back_forgot", goBackForgot);

    return () => {
      window.removeEventListener("go_back_forgot", goBackForgot);
    };
  }, []);


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


            {/* QUÊN MẬT KHẨU FLOW */}
            {step === 1 && (
              <QuenMatKhau
                onNext={(email) => {
                  setResetEmail(email);
                  setStep(2);
                }}
              />
            )}

            {step === 2 && (
              <NhapOTP
                email={resetEmail}
                onNext={() => setStep(3)}
              />
            )}

            {step === 3 && (
              <DatMatKhauMoi
                email={resetEmail}
                onNext={() => setStep(0)}
              />
            )}



            <Routes>
              <Route path="/" element={<Navigate to="/trangchu" replace />} />

              <Route path="/trangchu" element={<Home language={language} />} />

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

              <Route
                path="/admin-dashboard"
                element={
                  <RequireAuth>
                    <AdminDashboard />
                  </RequireAuth>
                }
              />


              <Route
                path="/dangnhap"
                element={
                  <RedirectIfLoggedIn>
                    <Login openForget={() => setStep(1)} />
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

              
            <Route path="/chinhsachbaomat" element={<ChinhSachBaoMat />} />
            <Route path="/dieukhoansudung" element={<DieuKhoanSuDung />} />
            
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