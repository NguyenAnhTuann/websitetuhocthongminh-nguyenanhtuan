import { useEffect, useState } from "react";
// Import icon để làm đẹp
import { Users, Calendar, TrendingUp } from "lucide-react"; 

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [notify, setNotify] = useState({ type: "", message: "" });
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // 🔥 STATE MỚI: Lưu thống kê lượt truy cập
  const [visitStats, setVisitStats] = useState({
    today: 0,
    month: 0,
    year: 0,
    loading: true, 
    error: null,
  });


  const showNotify = (type, message) => {
    setNotify({ type, message });

    // Tự tắt sau 2.5 giây
    setTimeout(() => {
      setNotify({ type: "", message: "" });
    }, 2500);
  };


  // ================================
  // XÓA HỌC SINH VI PHẠM (Giữ nguyên)
  // ================================
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa học sinh này và cấm đăng ký lại?")) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `https://websitetuhocthongminh-nguyenanhtuan.onrender.com/api/admin/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        showNotify("error", data.message || "Xóa thất bại!");
        return;
      }

      showNotify("success", "Đã xóa học sinh và khóa email + SĐT khỏi hệ thống!");


      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      showNotify("error", "Lỗi kết nối server!");
    }

  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      window.location.href = "/trangchu";
      return;
    }

    const token = localStorage.getItem("token");

    // 1. Fetch danh sách người dùng (Logic cũ)
    fetch("https://websitetuhocthongminh-nguyenanhtuan.onrender.com/api/admin/users", {
      headers: { Authorization: "Bearer " + token },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok || !Array.isArray(data)) {
          setError(data.message || "Lỗi khi tải danh sách");
          return;
        }
        setUsers(data);
      })
      .catch(() => setError("Không thể tải danh sách người dùng."))
      .finally(() => {
        setLoading(false);
      });


    // 2. 🔥 Fetch thống kê lượt truy cập (Logic mới)
    const fetchStats = async () => {
        try {
            const res = await fetch(
              "https://websitetuhocthongminh-nguyenanhtuan.onrender.com/api/stats/visits",
              {
                headers: { Authorization: "Bearer " + token },
              }
            );
            const data = await res.json();
    
            if (!res.ok) {
              setVisitStats(prev => ({ 
                ...prev, 
                error: data.message || "Lỗi khi tải thống kê.", 
                loading: false 
              }));
              return;
            }
    
            setVisitStats({
              today: data.today,
              month: data.month,
              year: data.year,
              loading: false,
              error: null,
            });
          } catch (err) {
            setVisitStats(prev => ({ 
                ...prev, 
                error: "Không thể kết nối server để tải thống kê.", 
                loading: false 
            }));
          }
    }
    
    fetchStats();

  }, []); // Dependency array rỗng


  // ===============================
  // PHÂN TRANG (Giữ nguyên)
  // ===============================
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f7f7]">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#1c7c76] border-t-transparent"></div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#f4f7f7]">

      {/* ======= THÔNG BÁO (Giữ nguyên) ======= */}
      {notify.message && (
        <div className={`
      fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-white
      transform transition-all duration-500
      ${notify.type === "success" ? "bg-green-600" : "bg-red-600"}
    `}
        >
          <p className="font-semibold">{notify.message}</p>
        </div>
      )}

      {/* ====== HEADER ADMIN (Giữ nguyên) ====== */}
      <header className="bg-[#1c7c76] text-white py-4 px-4 shadow-lg flex justify-between items-center">
        {/* TIÊU ĐỀ */}
        <h1 className="text-xl md:text-2xl font-bold tracking-wide mt-0">
          QUẢN LÝ DỮ LIỆU HỆ THỐNG
        </h1>

        {/* NÚT CHỈ HIỆN TRÊN DESKTOP */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => (window.location.href = "/trangchu")}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-[#1a2a2a] font-semibold rounded-lg shadow-md"
          >
            Về trang chủ
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/dangnhap";
            }}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold shadow-md"
          >
            Đăng xuất
          </button>
        </div>

        {/* NÚT MENU 3 GẠCH CHỈ CHO MOBILE */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setShowMobileMenu(prev => !prev)}
        >
          ☰
        </button>
      </header>

      {/* MENU ẨN HIỆN TRÊN MOBILE (Giữ nguyên) */}
      {showMobileMenu && (
        <div className="md:hidden bg-white shadow-lg border-b border-gray-200 p-4 space-y-3">
          <button
            onClick={() => {
              setShowMobileMenu(false);
              window.location.href = "/trangchu";
            }}
            className="block w-full bg-yellow-500 text-white font-semibold py-2 rounded-lg"
          >
            Về trang chủ
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/dangnhap";
            }}
            className="block w-full bg-red-500 text-white font-semibold py-2 rounded-lg"
          >
            Đăng xuất
          </button>
        </div>
      )}



      {/* ====== CONTENT ====== */}
      <div className="p-8 max-w-6xl mx-auto">

        <h1
          className=" mx-auto text-center block
             text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-outfit
             bg-[#1c7c76] px-6 py-4 rounded-2xl shadow-sm"
        >
          DỮ LIỆU HỌC SINH
        </h1>

        {/* 🔥 BOX THỐNG KÊ LƯỢT TRUY CẬP MỚI */}
        <h2 className="text-3xl font-bold text-[#1c7c76] mt-8 mb-4">📈 Thống kê Lượt Truy Cập</h2>

        {visitStats.error && (
            <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-xl shadow">
              {visitStats.error}
            </div>
        )}

        {visitStats.loading ? (
            <div className="flex justify-center items-center p-6 bg-white rounded-xl shadow-md">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#1c7c76] border-t-transparent"></div>
                <p className="ml-3 text-gray-600">Đang tải thống kê...</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Lượt truy cập hôm nay */}
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-500 uppercase">Hôm nay</p>
                        <Calendar className="w-6 h-6 text-yellow-500" />
                    </div>
                    <p className="text-3xl font-extrabold text-[#1a2a2a] mt-1">{visitStats.today.toLocaleString()}</p>
                </div>

                {/* Lượt truy cập tháng này */}
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-500 uppercase">Tháng này</p>
                        <Users className="w-6 h-6 text-blue-500" />
                    </div>
                    <p className="text-3xl font-extrabold text-[#1a2a2a] mt-1">{visitStats.month.toLocaleString()}</p>
                </div>

                {/* Lượt truy cập năm nay */}
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-500 uppercase">Năm nay</p>
                        <TrendingUp className="w-6 h-6 text-green-500" />
                    </div>
                    <p className="text-3xl font-extrabold text-[#1a2a2a] mt-1">{visitStats.year.toLocaleString()}</p>
                </div>
            </div>
        )}
        {/* 🔥 KẾT THÚC BOX THỐNG KÊ */}


        {error && (
          <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-xl shadow">
            {error}
          </div>
        )}

        {/* ===== MOBILE VIEW (Giữ nguyên) ===== */}
        <div className="md:hidden space-y-3">
          {currentUsers.map((u) => (
            <div key={u._id} className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
              <p className="font-bold text-black text-lg">{u.fullName}</p>

              <div className="mt-2 text-sm text-gray-700 space-y-1">
                <p><b>Email:</b> {u.email}</p>
                <p><b>SĐT:</b> {u.phone}</p>
                <p><b>Trường:</b> {u.school}</p>
                <p><b>Khối:</b> {u.grade}</p>
              </div>

              <button
                onClick={() => handleDelete(u._id)}
                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold"
              >
                Xóa
              </button>
            </div>
          ))}
        </div>

        {/* ===== DESKTOP VIEW (Giữ nguyên) ===== */}
        <div className="hidden md:block bg-white shadow-xl rounded-xl p-6 border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1c7c76] text-white">
                <th className="p-3 text-sm font-semibold">Họ tên</th>
                <th className="p-3 text-sm font-semibold">Email</th>
                <th className="p-3 text-sm font-semibold">Số điện thoại</th>
                <th className="p-3 text-sm font-semibold">Trường</th>
                <th className="p-3 text-sm font-semibold">Khối</th>
                <th className="p-3 text-sm font-semibold text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.map((u, index) => (
                <tr
                  key={u._id}
                  className={`border-b hover:bg-gray-100 transition ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                >
                  <td className="p-3">{u.fullName}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.phone}</td>
                  <td className="p-3">{u.school}</td>
                  <td className="p-3">{u.grade}</td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold shadow"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PHÂN TRANG (Giữ nguyên) */}
          <div className="flex justify-center items-center mt-6 gap-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg text-white font-semibold shadow 
            ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-[#1c7c76] hover:bg-[#17635f]"}`}
            >
              Trang trước
            </button>

            <span className="font-bold text-lg text-[#1c7c76]">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg text-white font-semibold shadow 
            ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-[#1c7c76] hover:bg-[#17635f]"}`}
            >
              Trang sau
            </button>
          </div>

          {users.length === 0 && (
            <p className="text-center py-6 text-gray-500">Không có học sinh nào.</p>
          )}
        </div>
      </div>
    </div>
  );
}