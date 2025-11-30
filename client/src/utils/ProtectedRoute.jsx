import { useNavigate } from "react-router-dom";
import { TriangleAlert } from "lucide-react"; // icon đẹp

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  // Nếu đã đăng nhập → cho vào trang
  if (user && token) return children;

  // UI cảnh báo chuyên nghiệp
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center px-4 mb-32">

      <div className="bg-white border border-red-200 shadow-xl rounded-2xl p-8 max-w-lg text-center relative">

        {/* ICON CẢNH BÁO */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 flex items-center justify-center bg-red-100 text-red-600 rounded-full shadow-inner">
            <TriangleAlert size={40} strokeWidth={1.5} />
          </div>
        </div>

        {/* TIÊU ĐỀ */}
        <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
          Bạn chưa đăng nhập!
        </h2>

        {/* MÔ TẢ */}
        <p className="text-gray-600 leading-relaxed mb-6">
          Bạn cần đăng nhập để truy cập tính năng này.
          <br />
          Hãy đăng nhập ngay để tiếp tục trải nghiệm.
        </p>

        {/* NÚT */}
        <button
          onClick={() => navigate("/dangnhap")}
          className="px-8 py-3 bg-[#1c7c76] text-white font-semibold rounded-xl shadow
                     hover:bg-[#17635f] active:scale-95 transition-transform"
        >
          Đăng nhập ngay
        </button>
      </div>
    </div>
  );
}
