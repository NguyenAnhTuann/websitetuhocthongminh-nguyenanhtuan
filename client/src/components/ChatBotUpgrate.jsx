import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("https://websitetuhocthongminh-nguyenanhtuan.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const full = data.reply || "";

      let cur = "";
      let i = 0;

      const interval = setInterval(() => {
        if (i < full.length) {
          cur += full[i];
          i++;

          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last?.sender === "bot") {
              return [...prev.slice(0, -1), { sender: "bot", text: cur }];
            }
            return [...prev, { sender: "bot", text: cur }];
          });
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 8);
    } catch (err) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Xin lỗi, hệ thống đang gặp lỗi. Vui lòng thử lại." },
      ]);
    }
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center px-4 py-16">

      {/* ===== HERO ===== */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1c7c76]">
          AI ChatBot – Trợ Lý Học Tập
        </h1>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Hỏi đáp mọi lĩnh vực, giải thích kiến thức, hỗ trợ bài tập nhanh chóng.
        </p>
      </motion.div>

      {/* ===== DANH SÁCH CHAT THEO MÔN ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
      >
        {[
          { name: "Toán", link: "/chatbot/toan" },
          { name: "Ngữ Văn", link: "/chatbot/nguvan" },
          { name: "Tiếng Anh", link: "/chatbot/tienganh" },
          { name: "Vật Lý", link: "/chatbot/vatly" },
          { name: "Hoá Học", link: "/chatbot/hoahoc" },
          { name: "Sinh Học", link: "/chatbot/sinhhoc" },
          { name: "Địa Lý", link: "/chatbot/dialy" },
          { name: "Lịch Sử", link: "/chatbot/lichsu" },
          { name: "Tin Học", link: "/chatbot/tinhoc" },
          { name: "Công Nghệ", link: "/chatbot/congnghe" },
          { name: "Quốc Phòng", link: "/chatbot/quocphong" },
          { name: "Thể Dục", link: "/chatbot/theduc" },
          { name: "Hướng Nghiệp", link: "/chatbot/huongnghiep" },
          { name: "Kinh Tế – Pháp Luật", link: "/chatbot/kinhtephapluat" },
        ].map((item) => (
          <Link
            key={item.link}
            to={item.link}
            className="p-3 bg-[#1c7c76] text-white rounded-xl shadow hover:bg-[#166662] text-center text-sm md:text-base"
          >
            {item.name}
          </Link>
        ))}
      </motion.div>

    

    </section>
  );
}
