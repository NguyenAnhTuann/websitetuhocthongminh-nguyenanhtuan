import { Navigate } from "react-router-dom";
import { useToast } from "../components/GlobalToast";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {

  const { showToast } = useToast();
  const [redirect, setRedirect] = useState(false);

  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user || !token) {
      showToast("Bạn cần đăng nhập để truy cập trang này!", "error");

      setTimeout(() => setRedirect(true), 1200);
    }
  }, []);

  if (!user || !token) {
    return redirect ? <Navigate to="/dangnhap" replace /> : null;
  }

  return children;
}
