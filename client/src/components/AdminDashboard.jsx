import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");

    // ❌ Nếu không phải admin → quay về home
    if (role !== "admin") {
      window.location.href = "/home";
      return;
    }

    const token = localStorage.getItem("token");

    // 📌 Gọi API lấy danh sách user
    fetch("http://localhost:5000/api/admin/users", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(async (res) => {
        const data = await res.json();

        // ❌ Nếu API báo lỗi → không phải mảng → hiển thị lỗi
        if (!res.ok) {
          setError(data.message || "Lỗi quyền truy cập");
          return;
        }

        // ❌ Nếu backend trả object thay vì array
        if (!Array.isArray(data)) {
          setError("Dữ liệu không hợp lệ từ server");
          return;
        }

        // ✔ Thành công
        setUsers(data);
      })
      .catch(() => {
        setError("Không thể tải danh sách người dùng.");
      });
  }, []);

  return (
    <div className="p-8">

      {/* 🔴 NÚT ĐĂNG XUẤT */}
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/dangnhap";
        }}
        className="mb-6 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
      >
        Đăng xuất
      </button>

      <h1 className="text-3xl font-bold mb-6">Danh sách học sinh</h1>

      {/* ❌ HIỆN LỖI NẾU 403 HOẶC API LỖI */}
      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Chỉ render bảng nếu users là array */}
      {Array.isArray(users) && users.length > 0 && (
        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Họ tên</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Số điện thoại</th>
              <th className="p-3 border">Trường</th>
              <th className="p-3 border">Khối</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="p-3 border">{u.fullName}</td>
                <td className="p-3 border">{u.email}</td>
                <td className="p-3 border">{u.phone}</td>
                <td className="p-3 border">{u.school}</td>
                <td className="p-3 border">{u.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Không có user */}
      {Array.isArray(users) && users.length === 0 && !error && (
        <p>Không có học sinh nào.</p>
      )}
    </div>
  );
}
