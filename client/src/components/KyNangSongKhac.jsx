import React from "react";

const KyNangSongKhac = ({ language }) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[#1c7c76]">
        {language === "vi" ? "Kỹ năng sống khác" : "Other Life Skills"}
      </h1>

      <p className="mt-4 text-gray-700">
        Nội dung các kỹ năng sống khác...
      </p>

      {/* Bạn sẽ thêm nội dung ở đây */}
    </div>
  );
};

export default KyNangSongKhac;
