import { Navigate } from "react-router-dom";

export default function RedirectIfLoggedIn({ children }) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  // Nếu đã đăng nhập → không cho vào các trang này
  if (token && user) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
