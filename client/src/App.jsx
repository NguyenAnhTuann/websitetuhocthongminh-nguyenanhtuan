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
import Footer from './components/Footer';

// New pages
import KyNangTuHoc from "./components/KyNangTuHoc";
import KyNangSong from './components/KyNangSong';
import ChatBot from './components/ChatBot';
import ThucHanh from './components/ThucHanh';
import TaiNguyenOnline from './components/TaiNguyenOnline';
import Login from './components/Login';
import Register from './components/Register';
import RedirectIfLoggedIn from "./utils/RedirectIfLoggedIn";
import AdminDashboard from "./components/AdminDashboard";
import RequireAuth from "./utils/RequireAuth";
import ProtectedRoute from "./utils/ProtectedRoute";
import GlobalToastProvider from './components/GlobalToast';





const AppWrapper = () => {
  const location = useLocation();
  const [language, setLanguage] = useState('vi');
  const hideHeaderPages = ["/admin-dashboard"];
  const shouldHideHeader = hideHeaderPages.includes(location.pathname);


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
        {!shouldHideHeader && (
          <Header
            language={language}
            setLanguage={setLanguage}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        )}


        <div className="pt-[50px]">
<GlobalToastProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />

            <Route path="/home" element={<Home language={language} />} />

            <Route
              path="/kynangtuhoc" element={<KyNangTuHoc language={language} />}
            />
            <Route path="/kynangsong" element={<KyNangSong language={language} />} />
            <Route path="/chatbot" element={<ChatBot language={language} />} />


            <Route
              path="/thuchanh"
              element={
                <ProtectedRoute>
                  <ThucHanh />
                </ProtectedRoute>
              }
            />




            <Route path="/tailieuonline" element={<TaiNguyenOnline language={language} />} />
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




          </Routes>
          </GlobalToastProvider>

          <Footer />

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
