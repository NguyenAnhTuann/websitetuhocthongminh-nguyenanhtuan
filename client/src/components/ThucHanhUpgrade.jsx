import React from "react";
import { motion } from "framer-motion";
import { LuConstruction, LuAlarmClock } from "react-icons/lu";

export default function ThucHanhBaoTri() {
    return (
        <section className="min-h-screen w-full flex flex-col justify-center items-center px-4 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">

            {/* Hiệu ứng nền mờ */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute -top-[15%] -left-[10%] w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                <div className="absolute top-[30%] -right-[15%] w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            </div>

            {/* ICON & TIÊU ĐỀ */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <div className="flex justify-center mb-6">
                    <motion.div
                        initial={{ rotate: -10 }}
                        animate={{ rotate: 0 }}
                        transition={{ duration: 0.4 }}
                        className="p-5 bg-white rounded-2xl shadow-md border border-teal-100"
                    >
                        <LuConstruction size={80} className="text-teal-600" />
                    </motion.div>
                </div>

                <h1 className="text-3xl md:text-5xl font-extrabold text-teal-700 font-outfit">
                    Trang Thực Hành Đang Bảo Trì
                </h1>

                <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto bg-white/70 backdrop-blur-sm px-3 py-2 rounded-lg">
                    Chúng tôi đang nâng cấp hệ thống để mang đến trải nghiệm tốt hơn.
                </p>
            </motion.div>

            {/* FOOTER */}
            <motion.div
                className="mt-16 text-gray-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                © 2025 TuHocThongMinh AI — Maintenance Mode.
            </motion.div>

        </section>
    );
}
