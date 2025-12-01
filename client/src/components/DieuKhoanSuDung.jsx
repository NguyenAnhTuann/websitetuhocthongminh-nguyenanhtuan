import { motion } from "framer-motion";

export default function DieuKhoanSuDung() {
  return (
    <section className="w-full px-4 py-20 bg-white max-w-5xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-3xl md:text-5xl font-extrabold text-white bg-[#1c7c76] px-6 py-4 rounded-2xl shadow-sm"
      >
        ĐIỀU KHOẢN SỬ DỤNG
      </motion.h1>

      <div className="mt-10 bg-white border border-gray-200 rounded-2xl shadow-md p-8 space-y-6 leading-relaxed text-gray-700">
        
        <p>
          Khi sử dụng website <strong>Tự Học Thông Minh</strong>, bạn đồng ý tuân thủ các điều khoản dưới đây.
        </p>

        <h2 className="text-xl font-bold text-[#1c7c76]">1. Mục đích sử dụng</h2>
        <p>
          Website được xây dựng nhằm hỗ trợ học sinh trong học tập, thực hành kỹ năng,
          tra cứu tài liệu và tương tác với hệ thống AI.
        </p>

        <h2 className="text-xl font-bold text-[#1c7c76]">2. Quy định người dùng</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Không sử dụng nội dung với mục đích thương mại khi chưa có sự cho phép.</li>
          <li>Không chia sẻ tài khoản hoặc thông tin đăng nhập cho người khác.</li>
          <li>Không thực hiện hành vi gây ảnh hưởng đến hệ thống hoặc người dùng khác.</li>
        </ul>

        <h2 className="text-xl font-bold text-[#1c7c76]">3. Trách nhiệm</h2>
        <p>
          Người dùng tự chịu trách nhiệm đối với thông tin cung cấp và hành vi khi sử dụng dịch vụ.
        </p>

        <h2 className="text-xl font-bold text-[#1c7c76]">4. Thay đổi điều khoản</h2>
        <p>
          Quản trị viên có quyền cập nhật điều khoản theo thực tế.  
          Thông báo sẽ được gửi qua email hoặc hiển thị trên website.
        </p>

        <p className="text-gray-600 text-sm">
          Mọi yêu cầu hỗ trợ: <strong>httngan.work1@gmail.com</strong>
        </p>
      </div>
    </section>
  );
}
