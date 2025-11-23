import React from "react";
import { Link } from "react-router-dom";

const KyNangSong = ({ language }) => {
  const t = {
    vi: {
      title: "Kỹ năng sống",
      bl: "Kỹ năng sống trong bạo lực",
      other: "Kỹ năng sống khác"
    },
    en: {
      title: "Life Skills",
      bl: "Life skills in violence & safety",
      other: "Other life skills"
    }
  };

  return (
    <section className="min-h-screen px-4 py-20 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-[#1c7c76] mb-10">
        {t[language].title}
      </h1>

      <div className="w-full max-w-3xl space-y-6">

        {/* Folder 1 */}
        <Link
          to="/kynangsong/baoluc"
          className="block p-6 bg-gray-50 rounded-xl border hover:border-[#1c7c76] hover:bg-gray-100 transition shadow-sm"
        >
          <h2 className="text-2xl font-semibold">{t[language].bl}</h2>
          <p className="text-gray-500 mt-1">Nhấn để mở</p>
        </Link>

        {/* Folder 2 */}
        <Link
          to="/kynangsong/khac"
          className="block p-6 bg-gray-50 rounded-xl border hover:border-[#1c7c76] hover:bg-gray-100 transition shadow-sm"
        >
          <h2 className="text-2xl font-semibold">{t[language].other}</h2>
          <p className="text-gray-500 mt-1">Nhấn để mở</p>
        </Link>

      </div>
    </section>
  );
};

export default KyNangSong;
