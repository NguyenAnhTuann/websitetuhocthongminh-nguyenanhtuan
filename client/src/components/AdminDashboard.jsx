import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [notify, setNotify] = useState({ type: "", message: "" });
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  // ---> THÊM STATE TÌM KIẾM
  const [searchTerm, setSearchTerm] = useState("");
  // ---> THÊM STATE ĐỂ LƯU TỪ KHÓA ĐANG TÌM KIẾM THỰC TẾ
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");


  const showNotify = (type, message) => {
    setNotify({ type, message });

    // Tự tắt sau 2.5 giây
    setTimeout(() => {
      setNotify({ type: "", message: "" });
    }, 2500);
  };




  // ================================
  // XÓA HỌC SINH VI PHẠM
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
        setLoading(false); // ⬅ TẮT LOADING
      });
  }, []);



  // ================================
  // HÀM TẢI DỮ LIỆU USER
  // ================================
  const fetchUsers = async (searchQuery = "") => {
    setLoading(true);
    setError("");
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm mới

    const token = localStorage.getItem("token");
    // Xây dựng URL với tham số search
    const url = `https://websitetuhocthongminh-nguyenanhtuan.onrender.com/api/admin/users${searchQuery ? `?search=${searchQuery}` : ""
      }`;

    try {
      const res = await fetch(url, {
        headers: { Authorization: "Bearer " + token },
      });

      const data = await res.json();
      if (!res.ok || !Array.isArray(data)) {
        setError(data.message || "Lỗi khi tải danh sách");
        setUsers([]);
        return;
      }
      setUsers(data);
    } catch (err) {
      setError("Không thể tải danh sách người dùng. Lỗi kết nối.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };


  // ================================
  // Xử lý tìm kiếm
  // ================================
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentSearchTerm(searchTerm); // Cập nhật từ khóa tìm kiếm thực tế
  };


  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      window.location.href = "/trangchu";
      return;
    }

    // Gọi hàm tải dữ liệu với từ khóa tìm kiếm hiện tại
    fetchUsers(currentSearchTerm);

  }, [currentSearchTerm])


  // ===============================
  // PHÂN TRANG
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

      {/* ======= THÔNG BÁO ======= */}
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

      {/* ====== HEADER ADMIN ====== */}
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

      {/* MENU ẨN HIỆN TRÊN MOBILE */}
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


{/* 2. KHU VỰC TÌM KIẾM NỔI BẬT (KHUNG MỚI) */}
        <div className="bg-white p-5 md:p-6 rounded-xl shadow-2xl mb-8 border border-gray-100">
          <p className="text-gray-600 font-semibold mb-3 text-lg border-b pb-2">
            🔎 Lọc và tìm kiếm thông tin học sinh
          </p>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Nhập Tên, Email, SĐT, Lớp, Trường..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded-lg shadow-inner focus:ring-2 focus:ring-[#1c7c76] focus:border-[#1c7c76] transition"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#1c7c76] hover:bg-[#17635f] text-white font-semibold rounded-lg shadow-md transition duration-200"
            >
              Tìm kiếm
            </button>
            
            {/* NÚT XÓA TÌM KIẾM */}
            {currentSearchTerm && (
               <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setCurrentSearchTerm(""); // Kích hoạt fetch lại toàn bộ dữ liệu
                }}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
              >
                Xóa tìm kiếm
              </button>
            )}
          </form>
        </div>

        {error && (
          <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-xl shadow">
            {error}
          </div>
        )}

        {/* ===== MOBILE VIEW ===== */}
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

        {/* ===== DESKTOP VIEW ===== */}
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

          {/* PHÂN TRANG */}
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
