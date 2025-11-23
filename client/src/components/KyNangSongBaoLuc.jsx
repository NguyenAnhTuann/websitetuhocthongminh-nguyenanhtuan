
import React from "react";

const KyNangSongBaoLuc = ({ language }) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[#1c7c76]">
        {language === "vi" ? "Kỹ năng sống trong bạo lực" : "Life Skills – Violence & Safety"}
      </h1>

      <p className="mt-4 text-gray-700">
        Nội dung về bạo lực học đường, an toàn mạng, cách xử lý tình huống...
      </p>

      {/* Bạn sẽ thêm PDF / video / hình ảnh ở đây */}
    </div>
  );
};

export default KyNangSongBaoLuc;
