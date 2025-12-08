import { useState, useRef, useEffect } from "react"; // Thêm useRef
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { motion } from "framer-motion";
// Thêm icon Stop (PiStopCircleBold)
import { PiMathOperationsFill, PiStopCircleBold, PiPaperPlaneRightFill } from "react-icons/pi";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";


export default function ChatToan() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: "Xin chào! 👋 Tôi là trợ lý AI chuyên về Toán học. \n\nBạn cần giải bài tập Đại số, Hình học hay thắc mắc công thức nào không?",
      },
    ]);
  }, []);


  const preprocessMath = (content) => {
    if (!content) return "";
    return content
      .replace(/\\\[/g, "$$")  // Đổi \[ thành $$
      .replace(/\\\]/g, "$$")  // Đổi \] thành $$
      .replace(/\\\(/g, "$$")  // Đổi \( thành $
      .replace(/\\\)/g, "$$"); // Đổi \) thành $
  };

  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
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
            subject: "toan",

            history: historyToSend,

          }),

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
      handleStop();
      setMessages((prev) => [...prev, { sender: "bot", text: "Lỗi hệ thống." }]);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);


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

        initial={{ opacity: 0, y: 20 }}

        animate={{ opacity: 1, y: 0 }}

        className="w-full max-w-4xl bg-white border border-gray-200 rounded-2xl shadow-md p-6"

      >

        <div
          ref={chatContainerRef}
          className="h-[550px] overflow-y-auto space-y-6 pr-2">
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

                <div className="flex items-start gap-3">

                  <div className="w-8 h-8 rounded-full bg-[#A8DCD2] flex items-center justify-center flex-shrink-0">

                    <span className="text-[#1c7c76] font-bold text-xs">AI</span>

                  </div>

                  <div className="max-w-[85%] bg-gray-50 text-gray-900 px-4 py-3 rounded-2xl border shadow-sm overflow-hidden">

                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkMath]}
                      rehypePlugins={[rehypeRaw, rehypeKatex]}
                    >
                      {/* Gọi hàm preprocessMath để xử lý trước khi hiển thị */}
                      {preprocessMath(m.text)}
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

