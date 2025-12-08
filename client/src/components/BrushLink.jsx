// Component link với hiệu ứng vệt sơn
const BrushLink = ({ to, icon: Icon, children }) => {
  return (
    <Link 
      to={to} 
      className="group relative flex items-center justify-center px-3 py-1"
    >
      {/* --- LỚP NỀN: Vệt sơn SVG --- */}
      {/* Mặc định ẩn (opacity-0), hiện lên khi hover (opacity-100) */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <svg 
          viewBox="0 0 200 60" 
          preserveAspectRatio="none" 
          className="h-full w-full fill-yellow-400"
        >
          {/* Đây là path vẽ hình vệt sơn nguệch ngoạc */}
          <path d="M5.3,47.8c12.3-10.3,55.4-23.7,112.9-15.6c23.7,3.3,64.9,9.3,77.9,5.2c6-1.9,1.6-6-2.6-7.5c-16.1-5.7-88.9-12.7-133.4-6.3C27.9,28.7,4.6,35.6,5.3,47.8z"/>
        </svg>
      </div>

      {/* --- LỚP NỘI DUNG: Text & Icon --- */}
      {/* Chuyển màu chữ sang đen khi hover để nổi trên nền vàng */}
      <span className="relative z-10 flex items-center gap-1 font-medium text-white/90 transition-colors duration-300 group-hover:text-slate-900 group-hover:-translate-y-0.5">
        <Icon className="h-4 w-4" /> 
        {children}
      </span>
    </Link>
  );
};