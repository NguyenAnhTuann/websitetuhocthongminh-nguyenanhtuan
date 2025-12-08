import React from 'react';
import { Link } from 'react-router-dom';

const BrushLink = ({ to, icon: Icon, children }) => {
  return (
    <Link 
      to={to} 
      className="group relative flex items-center justify-center px-3 py-2"
    >
      {/* --- LỚP NỀN: Đám mây SVG --- */}
      {/* THAY ĐỔI: 
         - Tăng w-[130%] lên w-[180%] -> Để đám mây dài hẳn ra 2 bên.
         - Tăng h-[140%] lên h-[160%] -> Để đám mây phồng to hơn 1 chút cho cân đối.
      */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[160%] -z-10 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
        <svg 
          viewBox="0 0 200 60" 
          className="h-full w-full fill-white/25 drop-shadow-sm"
          preserveAspectRatio="none"
        >
          <path d="M158,45 H42 c-15,0 -22,-10 -15,-20 c2,-3 6,-5 10,-5 c2,-10 12,-15 22,-12 c5,-8 18,-8 24,-2 c5,-8 18,-8 24,0 c10,-4 20,2 22,12 c4,0 8,2 10,5 c7,10 0,20 -15,20 Z" />
        </svg>
      </div>

      {/* --- LỚP NỘI DUNG --- */}
      <span className="relative z-10 flex items-center gap-1.5 font-medium text-white/90 transition-colors duration-300 group-hover:text-white group-hover:-translate-y-0.5 shadow-sm">
        {Icon && <Icon className="h-4 w-4" />}
        {children}
      </span>
    </Link>
  );
};

export default BrushLink;