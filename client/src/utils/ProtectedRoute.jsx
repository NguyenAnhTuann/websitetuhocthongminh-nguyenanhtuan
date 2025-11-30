import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  // Nếu có user + token → cho vào trang
  if (user && token) return children;

  // Nếu chưa đăng nhập → hiển thị giao diện cảnh báo + nút đăng nhập
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="bg-red-100 border border-red-300 text-red-700 px-6 py-4 rounded-xl text-center max-w-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">
          Bạn cần đăng nhập để truy cập trang này!
        </h2>

        <p className="text-sm mb-5">
          Vui lòng đăng nhập để tiếp tục sử dụng tính năng này.
        </p>

        <button
          onClick={() => navigate("/dangnhap")}
          className="px-6 py-2 bg-[#1c7c76] text-white rounded-lg shadow hover:bg-[#166662] transition"
        >
          Đăng nhập ngay
        </button>
      </div>
    </div>
  );
}
