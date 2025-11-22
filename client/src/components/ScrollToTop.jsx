import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // 👈 Scroll lên đầu mỗi lần đổi trang
  }, [pathname]);

  return null; // Không render gì ra giao diện
};

export default ScrollToTop;
