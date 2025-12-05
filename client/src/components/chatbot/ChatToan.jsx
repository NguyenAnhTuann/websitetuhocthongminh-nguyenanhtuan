import { useState, useRef, useEffect } from "react"; // Thêm useRef
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { motion } from "framer-motion";
// Thêm icon Stop (PiStopCircleBold)
import { PiMathOperationsFill, PiStopCircleBold, PiPaperPlaneRightFill, PiTrashBold, PiCopyBold } from "react-icons/pi";

export default function ChatToan() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Dùng useRef để lưu ID của interval, giúp có thể clear nó ở bất cứ đâu
  const intervalRef = useRef(null);

  // [MỚI 2] Ref để hủy request mạng khi bấm Dừng
  const abortControllerRef = useRef(null);

  // [MỚI 3] Load lịch sử chat từ LocalStorage khi mở web
  useEffect(() => {
    const saved = localStorage.getItem("chat_history");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // [MỚI 4] Tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    // Lưu lịch sử vào LocalStorage mỗi khi tin nhắn thay đổi
    if (messages.length > 0) localStorage.setItem("chat_history", JSON.stringify(messages));
  }, [messages]);

  // Hàm dừng trả lời
  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // [MỚI] Hủy request mạng thực sự
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsTyping(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return; // Chặn nếu đang gõ

    // 1. Cập nhật giao diện (User message)
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const currentInput = input;

    // 2. Chuẩn bị lịch sử
    const historyToSend = messages.slice(-10).map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text || ""
    }));

    // Reset input và KHÓA giao diện ngay lập tức
    setInput("");
    setIsTyping(true);

    // [MỚI] Tạo bộ điều khiển hủy mới
    abortControllerRef.current = new AbortController();

    try {
      const res = await fetch(
        "https://websitetuhocthongminh-nguyenanhtuan.onrender.com/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: currentInput,
            subject: "toan",
            history: historyToSend,
          }),
          signal: abortControllerRef.current.signal, // [MỚI] Gắn tín hiệu để hủy
        }
      );

      const data = await res.json();
      const full = data.reply || "";

      let cur = "";
      let i = 0;

      // Xóa interval cũ nếu còn tồn tại (đề phòng)
      if (intervalRef.current) clearInterval(intervalRef.current);

      // Bắt đầu hiệu ứng gõ chữ
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
          // Khi chạy xong thì tự động dừng
          handleStop();
        }
      }, 10);

    } catch (err) {
      // [MỚI] Kiểm tra nếu lỗi do người dùng bấm Dừng thì không báo lỗi
      if (err.name === 'AbortError') {
        console.log("Đã dừng tạo câu trả lời");
      } else {
        handleStop();
        setMessages((prev) => [...prev, { sender: "bot", text: "Lỗi hệ thống." }]);
      }
    }
  };

  // Cleanup khi component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);


  // [MỚI] Hàm xóa lịch sử chat
  const handleClear = () => {
    if (isTyping) handleStop();
    setMessages([]);
    localStorage.removeItem("chat_history");
  };

  // [MỚI] Hàm copy nội dung
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Đã sao chép!"); // Bạn có thể thay bằng toast notification nếu muốn đẹp hơn
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center px-4 py-16 bg-white">

      {/* ===== TIÊU ĐỀ ===== */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-[#1c7c76] rounded-2xl flex items-center justify-center shadow-lg">
            <PiMathOperationsFill className="text-white text-4xl" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1c7c76]">
          ChatBot Môn Toán
        </h1>

        <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-base md:text-lg">
          Trợ lý AI giải Toán nhanh – chính xác.
        </p>
      </motion.div>

      {/* ===== KHUNG CHAT ===== */}
      <motion.div
        layout  // <--- THÊM DÒNG NÀY
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white border border-gray-200 rounded-2xl shadow-md p-6 relative" // <--- THÊM "relative"
      >
        {/* [MỚI] NÚT XÓA CHAT */}
        {messages.length > 0 && (
          <button
            onClick={handleClear}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 p-2"
            title="Xóa đoạn chat"
          >
            <PiTrashBold size={20} />
          </button>
        )}
        <div className="h-[700px] overflow-y-auto space-y-6 pr-2">
          {messages.map((m, idx) => (
            <div key={idx}>
              {m.sender === "user" ? (
                // --- User Message ---
                <div className="flex flex-col items-end">
                  <div className="max-w-[75%] bg-[#3C9E8F] text-white px-4 py-2.5 rounded-2xl shadow">
                    {m.text}
                  </div>
                </div>
              ) : (
                // --- Bot Message ---
                // --- ĐOẠN MỚI (DÁN VÀO CHỖ VỪA XÓA) ---
                <div className="group flex items-start gap-3 relative"> {/* Thêm class group và relative */}
                  <div className="w-8 h-8 rounded-full bg-[#A8DCD2] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#1c7c76] font-bold text-xs">AI</span>
                  </div>

                  <div className="max-w-[85%] bg-gray-50 text-gray-900 px-4 py-3 rounded-2xl border shadow-sm overflow-hidden">
                    {/* Cấu hình lại để hiển thị Toán */}
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkMath]}
                      rehypePlugins={[rehypeRaw, rehypeKatex]}
                    >
                      {m.text}
                    </ReactMarkdown>
                  </div>

                  {/* Nút Copy hiện ra khi di chuột vào */}
                  <button
                    onClick={() => handleCopy(m.text)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-[#1c7c76] mt-2"
                    title="Sao chép"
                  >
                    <PiCopyBold size={18} />
                  </button>
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
          <div ref={scrollRef} />
        </div>
      </motion.div>

      {/* ===== INPUT AREA ===== */}
      <div className="w-full max-w-4xl mt-4">

        <div className="bg-white border border-gray-300 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2">

          {/* Ô nhập liệu: Bị disable khi isTyping = true */}
          <input
            value={input}
            placeholder={isTyping ? "AI đang trả lời..." : "Nhập bài toán..."}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isTyping && sendMessage()}
            disabled={isTyping} // <--- KHÓA INPUT
            className={`flex-1 bg-transparent outline-none text-[15px] ${isTyping ? "text-gray-400 cursor-not-allowed" : "text-gray-800 placeholder-gray-400"
              }`}
          />

          <div className="flex items-center gap-1 border-l pl-2 border-gray-200">
            {/* Logic hiển thị Nút: Nếu đang typing thì hiện nút STOP, ngược lại hiện nút GỬI */}
            {isTyping ? (
              // --- NÚT DỪNG ---
              <motion.button
                onClick={handleStop}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 shadow-sm flex items-center gap-1"
              >
                <PiStopCircleBold size={20} />
                <span className="px-1 font-bold text-sm">DỪNG</span>
              </motion.button>
            ) : (
              // --- NÚT GỬI ---
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
          ChatBot chuyên môn Toán – Powered by AI.
        </p>
      </div>
    </section>
  );
}