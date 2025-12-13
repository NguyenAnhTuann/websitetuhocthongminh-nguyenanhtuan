import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [totalUsers, setTotalUsers] = useState(0);


  const [isDataLoading, setIsDataLoading] = useState(true);

  const [notify, setNotify] = useState({ type: "", message: "" });
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDeleteId, setUserToDeleteId] = useState(null); //


  const showNotify = (type, message) => {
    setNotify({ type, message });

    setTimeout(() => {
      setNotify({ type: "", message: "" });
    }, 2500);
  };


  // ================================
  // HÀM TẢI DỮ LIỆU USER
  // ================================
  const fetchUsers = async (searchQuery = "") => {
    setIsDataLoading(true); // BẬT LOADING CỤC BỘ
    setError("");
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm mới

    const token = localStorage.getItem("token");
    // Xây dựng URL với tham số search
    const url = `https://websitetuhocthongminh-nguyenanhtuan.onrender.com/api/admin/users${searchQuery ? `?search=${searchQuery}` : ""}`;

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
      setIsDataLoading(false); // TẮT LOADING CỤC BỘ
    }
  };


  const fetchTotalUsers = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        "https://websitetuhocthongminh-nguyenanhtuan.onrender.com/api/admin/users/count",
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      const data = await res.json();
      if (res.ok) {
        setTotalUsers(data.totalUsers);
      }
    } catch (err) {
      console.error("Không lấy được tổng số user");
    }
  };



  // ================================
  // Xử lý tìm kiếm
  // ================================
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentSearchTerm(searchTerm); // Cập nhật từ khóa tìm kiếm thực tế -> trigger useEffect
  };


  // ================================
  // XÓA HỌC SINH VI PHẠM (Sửa để hiển thị Modal)
  // ================================
  const handleDelete = async (id) => {
    // XÓA DÒNG NÀY: if (!window.confirm("Bạn có chắc muốn xóa học sinh này và cấm đăng ký lại?")) return;

    // THAY BẰNG: Hiển thị Modal
    setUserToDeleteId(id);
    setShowDeleteModal(true);
  };

  // ================================
  // THÊM: Hàm xác nhận xóa sau khi nhấn OK trên Modal
  // ================================
  const confirmDelete = async () => {
    const id = userToDeleteId;
    if (!id) return;

    // Ẩn modal ngay lập tức
    setShowDeleteModal(false);
    setUserToDeleteId(null);

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

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDeleteId(null);
  };


  // ================================
  // useEffect CHÍNH: Tải và tìm kiếm data
  // ================================
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      window.location.href = "/trangchu";
      return;
    }

    // Tải dữ liệu (lần ađầu hoặc khi có tìm kiếm)
    fetchUsers(currentSearchTerm);
    fetchTotalUsers();

  }, [currentSearchTerm])


  // ===============================
  // PHÂN TRANG
  // ===============================
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  // CHỈ CẮT USERS NẾU KHÔNG CÒN TẢI DATA
  const currentUsers = isDataLoading ? [] : users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  // THÊM LOGIC NÀY: Tính toán dãy số trang để hiển thị (ví dụ: 5 trang quanh trang hiện tại)
  const getPaginationItems = () => {
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // LOẠI BỎ: if (loading) { return <loading screen> }


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

      {/* ======================= MODAL XÁC NHẬN XÓA (CẬP NHẬT CHUYÊN NGHIỆP) ======================= */}
              {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
                  <div className="bg-white rounded-xl shadow-2xl p-6 w-11/12 max-w-sm md:max-w-md transform transition-all duration-300 scale-100">

                    {/* Header Modal - Sử dụng màu ĐỎ để nhấn mạnh CẢNH BÁO/XÓA */}
                    <div className="border-b pb-3 mb-4 flex items-center gap-3 text-red-600">
                      {/* Icon Cảnh báo (Exclamation Triangle) */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <h3 className="text-xl font-bold tracking-wide">XÁC NHẬN THAO TÁC QUAN TRỌNG</h3>
                    </div>

                    {/* Nội dung CHUYÊN NGHIỆP, KHÔNG DÙNG DẤU * */}
                    <p className="text-gray-700 mb-6 text-base leading-relaxed">
                      Bạn vui lòng xác nhận việc xóa tài khoản người dùng này. Thao tác này là không thể hoàn tác.
                      <br />
                      <span className="font-semibold text-red-600">Hệ thống sẽ thực hiện các bước:</span>
                      <ul className="list-disc ml-5 mt-2 text-sm text-gray-600 space-y-1">
                        <li>Xóa vĩnh viễn toàn bộ dữ liệu người dùng khỏi cơ sở dữ liệu.</li>
                        <li>Đưa Email và Số điện thoại vào danh sách cấm đăng ký lại.</li>
                      </ul>
                    </p>

                    {/* Footer / Buttons */}
                    <div className="flex justify-end space-x-3 mt-4">
                      <button
                        onClick={cancelDelete}
                        className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition duration-150 shadow-sm"
                      >
                        Hủy bỏ
                      </button>
                      <button
                        onClick={confirmDelete}
                        className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition duration-150"
                      >
                        Xác nhận Xóa
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* ================================================================= */}

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
      <div className="p-4 md:p-8 max-w-6xl mx-auto">

        {/* 1. KHU VỰC TIÊU ĐỀ CHÍNH */}
        <div className="mb-8">
          <h1
            className=" mx-auto text-center block
               text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-outfit
               bg-[#1c7c76] px-6 py-4 rounded-xl shadow-lg"
          >
            DỮ LIỆU HỌC SINH
          </h1>

          <p className="mt-4 text-center text-lg font-semibold text-[#1c7c76]">
            Tổng số học sinh đã đăng ký: <span className="text-black">{totalUsers}</span>
          </p>
        </div>


        {/* 2. KHU VỰC TÌM KIẾM NỔI BẬT */}
        <div className="bg-white p-5 md:p-6 rounded-xl shadow-2xl mb-8 border border-gray-100">
          <p className="text-gray-600 font-semibold mb-3 text-lg border-b pb-2">
            🔎 Tìm kiếm thông tin học sinh
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


        {/* === HIỂN THỊ LOADING HOẶC DATA === */}
        {isDataLoading ? (
          // SPINNER CHỈ Ở KHU VỰC DATA
          <div className="flex items-center justify-center py-10 bg-white rounded-xl shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1c7c76] border-t-transparent"></div>
          </div>
        ) : (
          <>
            {/* ===== MOBILE VIEW (HIỆN TẠI ĐÃ CÓ PHÂN TRANG) ===== */}
            <div className="md:hidden space-y-3">
              {currentUsers.map((u) => (
                <div key={u._id} className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
                  <p className="font-bold text-black text-lg">{u.fullName}</p>

                  <div className="mt-2 text-sm text-gray-700 space-y-1">
                    <p><b>Email:</b> {u.email}</p>
                    <p><b>SĐT:</b> {u.phone}</p>
                    <p><b>Ngày sinh:</b> {u.dob}</p>
                    <p><b>Trường:</b> {u.school}</p>
                    <p><b>Lớp:</b> {u.grade}</p>
                    <p><b>Thời gian đăng ký:</b> {new Date(u.createdAt).toLocaleDateString("vi-VN")}</p>
                  </div>

                  <button
                    onClick={() => handleDelete(u._id)}
                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold"
                  >
                    Xóa
                  </button>
                </div>
              ))}

              {/* ================================================================= */}
              {/* KHỐI PHÂN TRANG CHO MOBILE (Hiển thị nếu có hơn 1 trang) */}
              {users.length > 0 && totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg text-white font-semibold shadow text-sm
              ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-[#1c7c76] hover:bg-[#17635f]"}`}
                  >
                    Trang trước
                  </button>

                  {/* Dãy số trang */}
                  {getPaginationItems().map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`
                w-9 h-9 rounded-full font-bold shadow transition duration-150 text-sm
                ${page === currentPage
                          ? "bg-[#1c7c76] text-white ring-2 ring-offset-2 ring-[#1c7c76]"
                          : "bg-white text-[#1c7c76] border border-gray-300 hover:bg-gray-100"
                        }
              `}
                    >
                      {page}
                    </button>
                  ))}
                  {/* Kết thúc Dãy số trang */}

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg text-white font-semibold shadow text-sm
              ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-[#1c7c76] hover:bg-[#17635f]"}`}
                  >
                    Trang sau
                  </button>
                </div>
              )}
              {/* KẾT THÚC KHỐI PHÂN TRANG MOBILE */}
              {/* ================================================================= */}
              {users.length === 0 && (
                <p className="text-center py-6 text-gray-500">
                  Không có học sinh nào {currentSearchTerm ? "phù hợp với từ khóa." : "trong hệ thống."}
                </p>
              )}
            </div>

            {/* ===== DESKTOP VIEW ===== */}
            <div className="hidden md:block bg-white shadow-xl rounded-xl p-6 border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1c7c76] text-white">
                      <th className="p-3 text-sm font-semibold whitespace-nowrap">Họ tên</th>
                      <th className="p-3 text-sm font-semibold whitespace-nowrap">Ngày sinh</th> {/* <--- THÊM MỚI */}
                      <th className="p-3 text-sm font-semibold whitespace-nowrap">Email</th>
                      <th className="p-3 text-sm font-semibold whitespace-nowrap">Số điện thoại</th>
                      <th className="p-3 text-sm font-semibold whitespace-nowrap">Trường</th>
                      <th className="p-3 text-sm font-semibold whitespace-nowrap">Lớp</th>
                      <th className="p-3 text-sm font-semibold whitespace-nowrap">Thời gian đăng ký</th>
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
                        <td className="p-3">{u.dob}</td>
                        <td className="p-3">{u.email}</td>
                        <td className="p-3">{u.phone}</td>
                        <td className="p-3">{u.school}</td>
                        <td className="p-3">{u.grade}</td>
                        <td className="p-3">{new Date(u.createdAt).toLocaleDateString("vi-VN")}</td>

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
              </div>



              {/* PHÂN TRANG - ĐÃ CẬP NHẬT THÊM DÃY SỐ TRANG */}
              {users.length > 0 && totalPages > 1 && ( // Chỉ hiển thị nếu có > 1 trang
                <div className="hidden md:flex justify-center items-center mt-6 gap-2 md:gap-4 flex-wrap">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg text-white font-semibold shadow text-sm md:text-base
                    ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-[#1c7c76] hover:bg-[#17635f]"}`}
                  >
                    Trang trước
                  </button>

                  {/* Dãy số trang */}
                  {getPaginationItems().map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`
                        w-10 h-10 rounded-full font-bold shadow transition duration-150 text-sm md:text-base
                        ${page === currentPage
                          ? "bg-[#1c7c76] text-white ring-2 ring-offset-2 ring-[#1c7c76]" // Trang hiện tại
                          : "bg-white text-[#1c7c76] border border-gray-300 hover:bg-gray-100" // Trang khác
                        }
                      `}
                    >
                      {page}
                    </button>
                  ))}
                  {/* Kết thúc Dãy số trang */}

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg text-white font-semibold shadow text-sm md:text-base
                    ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-[#1c7c76] hover:bg-[#17635f]"}`}
                  >
                    Trang sau
                  </button>
                </div>
              )}



              {users.length === 0 && (
                <p className="text-center py-6 text-gray-500">
                  Không có học sinh nào {currentSearchTerm ? "phù hợp với từ khóa." : "trong hệ thống."}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}