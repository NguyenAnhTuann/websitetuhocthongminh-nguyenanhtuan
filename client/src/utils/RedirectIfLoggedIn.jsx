import { Navigate } from "react-router-dom";

export default function RedirectIfLoggedIn({ children }) {
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role");

  // Nếu đã đăng nhập
  if (user && role) {
    if (role === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    }
    return <Navigate to="/home" replace />;
  }

  // Nếu chưa đăng nhập → cho vào trang Login/Register
  return children;
}
