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

      {/* ===== KHUNG CHAT ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white border border-gray-200 rounded-2xl shadow-md p-6"
      >
        <div className="h-[450px] overflow-y-auto space-y-4 pr-2">

          {/* Hiển thị tin nhắn */}
          {messages.map((m, idx) => (
            <div key={idx}>
              {m.sender === "user" && (
                <div className="flex justify-end">
                  <div className="max-w-[75%] bg-[#3C9E8F] text-white px-4 py-2.5 rounded-2xl shadow">
                    {m.text}
                  </div>
                </div>
              )}

              {m.sender === "bot" && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#A8DCD2] flex items-center justify-center">
                    <span className="text-[#1c7c76] font-bold text-xs">AI</span>
                  </div>

                  <div className="max-w-[75%] bg-gray-50 text-gray-900 px-4 py-3 rounded-2xl border shadow-sm">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {m.text}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Hiệu ứng gõ */}
          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#A8DCD2]" />
              <div className="bg-gray-100 border border-gray-200 rounded-xl py-2 px-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
                </div>
              </div>
            </div>
          )}

        </div>
      </motion.div>

      {/* ===== INPUT ===== */}
      <div className="w-full max-w-4xl mt-4">
        <div className="bg-white border border-gray-300 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-3">
          <input
            value={input}
            placeholder="Nhập câu hỏi..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 bg-transparent outline-none text-[15px] text-gray-800"
          />

          <motion.button
            onClick={sendMessage}
            whileTap={{ scale: 0.85 }}
            className="bg-[#1c7c76] text-white px-5 py-2 rounded-lg hover:bg-[#166662]"
          >
            ➤
          </motion.button>
        </div>

        <p className="mt-2 text-[11px] text-gray-400 text-center">
          Powered by Coder.
        </p>
      </div>

    </section>
  );
}
