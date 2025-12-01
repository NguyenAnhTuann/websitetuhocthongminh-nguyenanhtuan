import { motion } from "framer-motion";

export default function ChinhSachBaoMat() {
  return (
    <section className="w-full px-4 py-20 bg-white max-w-5xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-3xl md:text-5xl font-extrabold text-white bg-[#1c7c76] px-6 py-4 rounded-2xl shadow-sm"
      >
        Chính sách bảo mật
      </motion.h1>

      <div className="mt-10 bg-white border border-gray-200 rounded-2xl shadow-md p-8 space-y-6 leading-relaxed text-gray-700">
        <p>
          Website <strong>Tự Học Thông Minh</strong> cam kết bảo vệ thông tin cá nhân của học sinh,
          giáo viên và người dùng theo đúng quy định pháp luật Việt Nam.
        </p>

        <h2 className="text-xl font-bold text-[#1c7c76]">1. Thu thập thông tin</h2>
        <p>
          Chúng tôi chỉ thu thập các thông tin cần thiết cho mục đích học tập,
          liên hệ và hỗ trợ như: họ tên, email, lớp học, trường học.
        </p>

        <h2 className="text-xl font-bold text-[#1c7c76]">2. Mục đích sử dụng</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Hỗ trợ học sinh truy cập tài liệu và nội dung học tập.</li>
          <li>Xác thực tài khoản và khôi phục mật khẩu.</li>
          <li>Nâng cao chất lượng hệ thống và trải nghiệm người dùng.</li>
        </ul>

        <h2 className="text-xl font-bold text-[#1c7c76]">3. Bảo mật thông tin</h2>
        <p>
          Mọi dữ liệu được mã hóa và lưu trữ an toàn.  
          Chúng tôi không chia sẻ thông tin người dùng cho bên thứ ba.
        </p>

        <h2 className="text-xl font-bold text-[#1c7c76]">4. Quyền của người dùng</h2>
        <p>
          Người dùng có quyền yêu cầu chỉnh sửa hoặc xoá thông tin cá nhân bằng cách liên hệ quản trị.
        </p>

        <p className="text-gray-600 text-sm">
          Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ:{" "}
          <strong>nguyenanhtuan.profile@gmail.com</strong>
        </p>
      </div>
    </section>
  );
}
