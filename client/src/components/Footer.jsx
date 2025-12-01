import { Link } from "react-router-dom";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";
import { BsChatDots } from "react-icons/bs";
import { PiGraduationCapBold } from "react-icons/pi";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1c7c76] text-white mt-10 border-t border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* 1) Logo + giới thiệu */}
        <div>
          <h2 className="text-2xl font-bold">TỰ HỌC THÔNG MINH</h2>
          <p className="mt-3 text-white/80 text-sm leading-relaxed">
            Nền tảng hỗ trợ học sinh phát triển kỹ năng tự học, kỹ năng sống
            và ứng dụng công nghệ AI trong học tập.
          </p>

          <p className="mt-4 text-white/70 text-sm">
            <br />Trường THPT Tô Văn Ơn
            <br />
            © 2025 • Nội dung học thuật:
            <br/>
            <strong>Huỳnh Thị Thanh Ngân</strong>
            <br />Thiết kế và xây dựng hệ thống:
            <br/>
            <strong>Nguyễn Anh Tuấn - TVU</strong>

          </p>

        </div>

        {/* 2) Liên kết nhanh */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Liên kết nhanh</h3>
          <ul className="space-y-2 text-white/80 text-sm">
            <li><Link className="hover:text-yellow-300" to="/trangchu">Trang chủ</Link></li>
            <li><Link className="hover:text-yellow-300" to="/kynangtuhoc">Kỹ năng tự học</Link></li>
            <li><Link className="hover:text-yellow-300" to="/kynangsong">Kỹ năng sống</Link></li>
            <li><Link className="hover:text-yellow-300" to="/chatbot">AI ChatBot</Link></li>
            <li><Link className="hover:text-yellow-300" to="/kynangmang">Tài nguyên online</Link></li>
            <li><Link className="hover:text-yellow-300" to="/thuchanh">Thực hành</Link></li>
          </ul>
        </div>

        {/* 3) Thông tin trường */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Thông tin liên hệ</h3>
          <p className="text-sm text-white/80">
            <strong>Trường THPT Tô Văn Ơn</strong>
            <br />
            Giáo viên: <strong>Huỳnh Thị Thanh Ngân</strong>
            <br />Email liên hệ:{" "}
            <a
              href="mailto:httngan.work1@gmail.com"
              className="underline hover:text-yellow-300"
            >
              httngan.work1@gmail.com
            </a>
            <br />
            <br />
            Người phát triển & quản lý hệ thống: <strong>Nguyễn Anh Tuấn</strong>
            <br />Email hỗ trợ kỹ thuật:{" "}
            <a
              href="mailto:nguyenanhtuan.profile@gmail.com"
              className="underline hover:text-yellow-300"
            >
              nguyenanhtuan.profile@gmail.com
            </a>
          </p>
        </div>


        {/* 4) Chính sách */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Chính sách</h3>
          <ul className="space-y-2 text-white/80 text-sm">
            <li><Link className="hover:text-yellow-300" to="/chinhsachbaomat">Chính sách bảo mật</Link></li>
            <li><Link className="hover:text-yellow-300" to="/dieukhoansudung">Điều khoản sử dụng</Link></li>

          </ul>
        </div>

      </div>

      <div className="text-center py-4 text-white/80 text-sm border-t border-white/10">
        Made with ❤️ for học sinh THPT Tô Văn Ơn
      </div>
    </footer>
  );
}
