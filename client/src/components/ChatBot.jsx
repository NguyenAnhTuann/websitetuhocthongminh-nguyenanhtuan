import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { motion } from "framer-motion";

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

      // TẠO BONG BÓNG BOT RỖNG — BẮT BUỘC CHO SAFARI iOS
      setMessages((prev) => [...prev, { sender: "bot", text: "" }]);

      for (let i = 0; i < full.length; i++) {
        cur += full[i];

        setMessages((prev) => {
          const last = prev[prev.length - 1];
          return [...prev.slice(0, -1), { sender: "bot", text: cur }];
        });

        await new Promise((resolve) => setTimeout(resolve, 12)); // iOS friendly
      }

      setIsTyping(false);



    } catch (err) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Xin lỗi, hệ thống đang gặp lỗi. Vui lòng thử lại." },
      ]);
    }
  };
  return (
    <section className="min-h-screen w-full flex flex-col items-center px-4 py-24 bg-white">

      {/* ====== TIÊU ĐỀ ====== */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className=" text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-outfit
                   bg-[#1c7c76] px-6 py-4 rounded-2xl shadow-sm inline-block"
      >
        AI ChatBot
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-gray-600 text-center max-w-2xl mt-3 text-sm md:text-base"
      >
        Trợ lý học tập thông minh – Hỏi đáp mọi lĩnh vực.
      </motion.p>

      {/* ===== KHUNG CHAT ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl bg-white border border-gray-200 rounded-2xl shadow-md p-6 mt-12"
      >
        <div className="h-[450px] overflow-y-auto space-y-4 pr-2">

          {messages.map((m, idx) => (
            <div key={idx}>

              {/* USER */}
              {m.sender === "user" && (
                <div className="flex justify-end">
                  <div className="max-w-[75%] bg-[#3C9E8F] text-white px-4 py-2.5 rounded-2xl rounded-br-sm shadow">
                    {m.text}
                  </div>
                </div>
              )}

              {/* BOT */}
              {m.sender === "bot" && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#A8DCD2] flex items-center justify-center shadow-inner">
                    <span className="text-[#1c7c76] font-bold text-xs">AI</span>
                  </div>

                  <div className="max-w-[75%] bg-gray-50 text-gray-900 px-4 py-3 rounded-2xl rounded-tl-sm border border-gray-200 shadow-sm">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {m.text}
                    </ReactMarkdown>
                  </div>
                </div>
              )}

            </div>
          ))}

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
            className="bg-[#1c7c76] text-white px-5 py-2 rounded-lg hover:bg-[#166662] transition shadow"
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
