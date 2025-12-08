import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link để dẫn tới trang đăng nhập

// Import icon UI từ bộ 'pi' (đã xác nhận hoạt động tốt)
import { PiStopCircleBold, PiWarningCircleBold } from "react-icons/pi";
// Import icon từ bộ 'lu'
import { LuSparkles } from "react-icons/lu";

export default function ChatTest() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  // Câu chào mặc định cho bản Test
  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: "Xin chào! 👋 Đây là **ChatBot Dùng Thử**.\n\nBạn có thể hỏi tôi các câu hỏi chung. Tuy nhiên, để được hỗ trợ chuyên sâu từng môn học (Toán, Lý, Hóa, Văn...), vui lòng **Đăng nhập** nhé!",
      },
    ]);
  }, []);

  // Dùng useRef để lưu ID của interval
  const intervalRef = useRef(null);

  // Hàm dừng trả lời
  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsTyping(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    // 1. Cập nhật giao diện (User message)
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const currentInput = input;

    // 2. Chuẩn bị lịch sử
    const historyToSend = messages.slice(-10).map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text || ""
    }));

    // Reset input và KHÓA giao diện
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch(
        "https://websitetuhocthongminh-nguyenanhtuan.onrender.com/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: currentInput,
            subject: "test", // <--- QUAN TRỌNG: Subject là 'test'
            history: historyToSend,
          }),
        }
      );

      const data = await res.json();
      const full = data.reply || "";

      let cur = "";
      let i = 0;

      if (intervalRef.current) clearInterval(intervalRef.current);

      // Hiệu ứng gõ chữ
      intervalRef.current = setInterval(() => {
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
          handleStop();
        }
      }, 10);

    } catch (err) {
      handleStop();
      setMessages((prev) => [...prev, { sender: "bot", text: "Lỗi hệ thống hoặc mất kết nối server." }]);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Tự động cuộn xuống dưới (Smooth scroll giống ChatCongNghe)
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  return (
    <section className="min-h-screen w-full flex flex-col items-center px-4 py-16 bg-white font-sans">

      {/* ===== TIÊU ĐỀ (Style giống ChatCongNghe) ===== */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="flex justify-center mb-4">
          {/* Icon màu vàng cam (Gradient) để phân biệt đây là bản Dùng Thử */}
          <div className="w-20 h-20 bg-[#1c7c76] rounded-2xl flex items-center justify-center shadow-lg">
            <LuSparkles className="text-white text-4xl" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1c7c76]">
          ChatBot Dùng Thử
        </h1>

        <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-base md:text-lg">
          Trải nghiệm tính năng hỏi đáp AI cơ bản (Giới hạn tính năng).
        </p>
      </motion.div>

      {/* ===== BANNER CẢNH BÁO (Đã style lại cho hợp tông) ===== */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded-r-xl flex items-start md:items-center gap-3 shadow-sm"
      >
        <PiWarningCircleBold className="text-yellow-600 text-2xl flex-shrink-0 mt-0.5 md:mt-0" />
        <div className="text-sm md:text-base text-yellow-800">
          <span className="font-bold">Lưu ý:</span> Để sử dụng Chatbot chuyên sâu cho 13 môn học, vui lòng 
          <Link to="/dangnhap" className="font-bold underline text-[#1c7c76] hover:text-[#166662] mx-1">
            Đăng nhập tài khoản
          </Link> 
          của bạn.
        </div>
      </motion.div>

      {/* ===== KHUNG CHAT (Copy style từ ChatCongNghe) ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white border border-gray-200 rounded-2xl shadow-md p-6"
      >
        <div
          ref={chatContainerRef}
          className="h-[550px] overflow-y-auto space-y-6 pr-2"
        >
          {messages.map((m, idx) => (
            <div key={idx}>
              {m.sender === "user" ? (
                // --- User Message ---
                <div className="flex flex-col items-end">
                  <div className="max-w-[85%] md:max-w-[75%] bg-[#3C9E8F] text-white px-4 py-2.5 rounded-2xl shadow">
                    {m.text}
                  </div>
                </div>
              ) : (
                // --- Bot Message ---
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1c7c76] flex items-center justify-center flex-shrink-0 shadow-sm text-white">
                    <LuSparkles size={18} />
                  </div>
                  <div className="max-w-[90%] md:max-w-[85%] bg-gray-50 text-gray-900 px-4 py-3 rounded-2xl border shadow-sm overflow-hidden">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                         a: ({node, ...props}) => <a {...props} className="text-[#1c7c76] font-bold hover:underline" target="_blank" rel="noopener noreferrer" />
                      }}
                    >
                      {m.text}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1c7c76] flex items-center justify-center text-white shadow-sm">
                 <LuSparkles size={16} />
              </div>
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

      {/* ===== INPUT AREA (Copy style từ ChatCongNghe) ===== */}
      <div className="w-full max-w-4xl mt-4">

        <div className="bg-white border border-gray-300 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2">

          <input
            value={input}
            placeholder={isTyping ? "AI đang trả lời..." : "Hỏi bất cứ điều gì (Toán, Văn, Anh...)"}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isTyping && sendMessage()}
            disabled={isTyping}
            className={`flex-1 bg-transparent outline-none text-[15px] ${isTyping ? "text-gray-400 cursor-not-allowed" : "text-gray-800 placeholder-gray-400"
              }`}
          />

          <div className="flex items-center gap-1 border-l pl-2 border-gray-200">
            {isTyping ? (
              <motion.button
                onClick={handleStop}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 shadow-sm flex items-center gap-1"
              >
                <PiStopCircleBold size={20} />
                <span className="px-1 font-bold text-sm">DỪNG</span>
              </motion.button>
            ) : (
              <motion.button
                onClick={sendMessage}
                whileTap={{ scale: 0.9 }}
                disabled={!input.trim()}
                className={`p-2 rounded-lg transition-colors flex items-center justify-center ${!input.trim()
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-white bg-[#1c7c76] hover:bg-[#166662] shadow-sm"
                  }`}
              >
                <span className="px-2 font-bold text-sm">GỬI</span>
              </motion.button>
            )}
          </div>

        </div>

        <p className="mt-2 text-xs text-gray-400 text-center">
          Bản dùng thử giới hạn tính năng. <Link to="/dangnhap" className="text-[#1c7c76] hover:underline">Đăng nhập ngay</Link> để trải nghiệm đầy đủ.
        </p>
      </div>
    </section>
  );
}