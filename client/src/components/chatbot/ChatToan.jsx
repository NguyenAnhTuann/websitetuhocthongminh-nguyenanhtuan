import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion, AnimatePresence } from "framer-motion";
import "katex/dist/katex.min.css"; // Import CSS cho Toán học

// Icons
import { 
  PiMathOperationsFill, 
  PiStopCircleBold, 
  PiPaperPlaneRightFill, 
  PiTrashBold, 
  PiCopyBold, 
  PiArrowsClockwiseBold,
  PiCheckBold
} from "react-icons/pi";

export default function ChatToan() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null); // State để hiện icon check khi copy

  // Refs
  const intervalRef = useRef(null);
  const messagesEndRef = useRef(null);

  // --- 1. AUTO SCROLL ---
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]); // Cuộn khi có tin nhắn mới hoặc đang gõ

  // --- 2. HÀM DỪNG TRẢ LỜI ---
  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsTyping(false);
  };

  // --- 3. TẠO ĐOẠN CHAT MỚI ---
  const handleNewChat = () => {
    if (isTyping) handleStop();
    setMessages([]);
    setInput("");
  };

  // --- 4. COPY TEXT ---
  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedId(idx);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // --- 5. TẠO LẠI CÂU TRẢ LỜI (REGENERATE) ---
  const handleRegenerate = async () => {
    if (messages.length === 0 || isTyping) return;
    
    // Tìm tin nhắn cuối cùng của User
    const lastUserIndex = messages.findLastIndex(m => m.sender === "user");
    if (lastUserIndex === -1) return;

    const lastUserText = messages[lastUserIndex].text;
    
    // Xóa các tin nhắn sau tin nhắn User đó (xóa câu trả lời cũ của Bot)
    const newHistory = messages.slice(0, lastUserIndex + 1);
    setMessages(newHistory);

    // Gửi lại request với nội dung cũ
    await processMessage(lastUserText, newHistory);
  };

  // --- HÀM XỬ LÝ GỬI TIN NHẮN CHUNG ---
  const processMessage = async (msgText, currentHistory) => {
    setIsTyping(true);

    // Chuẩn bị lịch sử để gửi API (Lấy 10 tin gần nhất)
    const historyToSend = currentHistory.slice(-10).map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text || ""
    }));

    try {
      const res = await fetch(
        "https://websitetuhocthongminh-nguyenanhtuan.onrender.com/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: msgText,
            subject: "toan",
            history: historyToSend,
          }),
        }
      );

      const data = await res.json();
      const fullReply = data.reply || "";

      // Hiệu ứng Streaming giả lập
      let cur = "";
      let i = 0;

      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        if (i < fullReply.length) {
          cur += fullReply[i];
          i++;
          setMessages((prev) => {
            // Kiểm tra xem tin nhắn cuối có phải là bot đang trả lời không
            const lastMsg = prev[prev.length - 1];
            if (lastMsg?.sender === "bot" && lastMsg?.isStreaming) {
              return [...prev.slice(0, -1), { ...lastMsg, text: cur }];
            }
            // Nếu chưa có tin nhắn bot, thêm mới
            return [...prev, { sender: "bot", text: cur, isStreaming: true }];
          });
          // Scroll theo từng chữ hiện ra
          scrollToBottom();
        } else {
          // Kết thúc
          handleStop();
          // Đánh dấu tin nhắn đã stream xong (để hiện nút chức năng)
          setMessages(prev => {
            const last = prev[prev.length - 1];
            return [...prev.slice(0, -1), { ...last, isStreaming: false }];
          });
        }
      }, 10); // Tốc độ gõ (ms)

    } catch (err) {
      handleStop();
      setMessages((prev) => [...prev, { sender: "bot", text: "Lỗi kết nối server.", isError: true }]);
    }
  };

  // --- SỰ KIỆN GỬI TỪ INPUT ---
  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const textToSend = input;
    const newMsg = { sender: "user", text: textToSend };
    
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setInput("");

    await processMessage(textToSend, updatedMessages);
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center bg-gray-50 relative">
      
      {/* ===== HEADER ===== */}
      <div className="w-full bg-white shadow-sm py-3 px-6 fixed top-0 z-10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#1c7c76] rounded-xl flex items-center justify-center shadow-md">
            <PiMathOperationsFill className="text-white text-xl" />
          </div>
          <h1 className="text-xl font-bold text-[#1c7c76] hidden md:block">Toán Học AI</h1>
        </div>
        
        {/* Nút Chat Mới */}
        <button 
          onClick={handleNewChat}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          title="Xóa lịch sử trò chuyện"
        >
          <PiTrashBold />
          <span>Chat Mới</span>
        </button>
      </div>

      {/* ===== KHUNG CHAT ===== */}
      <div className="w-full max-w-4xl flex-1 mt-20 mb-24 px-4 overflow-y-auto custom-scrollbar">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] opacity-50">
            <PiMathOperationsFill className="text-6xl text-gray-300 mb-4" />
            <p className="text-gray-400">Hãy hỏi tôi một bài toán...</p>
          </div>
        ) : (
          <div className="space-y-6 pb-4">
            {messages.map((m, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex w-full ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex flex-col max-w-[85%] md:max-w-[75%] ${m.sender === "user" ? "items-end" : "items-start"}`}>
                  
                  {/* Avatar */}
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      m.sender === "user" ? "bg-gray-200 text-gray-600 order-2" : "bg-[#A8DCD2] text-[#1c7c76]"
                    }`}>
                      {m.sender === "user" ? "YOU" : "AI"}
                    </div>
                    <span className="text-xs text-gray-400">{m.sender === "user" ? "Bạn" : "Gia sư Toán"}</span>
                  </div>

                  {/* Bubble Chat */}
                  <div className={`px-4 py-3 rounded-2xl shadow-sm text-[15px] leading-relaxed overflow-hidden
                    ${m.sender === "user" 
                      ? "bg-[#3C9E8F] text-white rounded-tr-none" 
                      : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
                    }`}
                  >
                    {m.sender === "user" ? (
                      m.text
                    ) : (
                      /* --- 1. & 2. RENDER MARKDOWN + MATH + CODE --- */
                      <ReactMarkdown
                        className="markdown-content"
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeKatex, rehypeRaw]}
                        components={{
                          code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || "");
                            return !inline && match ? (
                              <SyntaxHighlighter
                                style={dracula}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            ) : (
                              <code className={`${className} bg-gray-100 text-red-500 rounded px-1 py-0.5`} {...props}>
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {m.text}
                      </ReactMarkdown>
                    )}
                  </div>

                  {/* --- 5. NÚT CHỨC NĂNG (Copy / Regenerate) --- */}
                  {m.sender === "bot" && !m.isStreaming && !m.isError && (
                    <div className="flex items-center gap-2 mt-2 ml-1">
                      <button 
                        onClick={() => handleCopy(m.text, idx)}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors"
                        title="Sao chép"
                      >
                        {copiedId === idx ? <PiCheckBold className="text-green-500"/> : <PiCopyBold size={16}/>}
                      </button>
                      
                      {/* Chỉ hiện nút tạo lại ở tin nhắn cuối cùng */}
                      {idx === messages.length - 1 && (
                        <button 
                          onClick={handleRegenerate}
                          className="text-gray-400 hover:text-[#1c7c76] p-1 rounded transition-colors flex items-center gap-1 text-xs"
                          title="Tạo lại câu trả lời khác"
                        >
                          <PiArrowsClockwiseBold size={16}/>
                          <span className="hidden sm:inline">Thử lại</span>
                        </button>
                      )}
                    </div>
                  )}

                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* ===== INPUT AREA ===== */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 flex justify-center z-20">
        <div className="w-full max-w-4xl relative">
          
          <div className="bg-gray-50 border border-gray-300 rounded-2xl px-4 py-3 shadow-inner flex items-center gap-3 focus-within:ring-2 focus-within:ring-[#1c7c76] transition-all">
            <input
              value={input}
              placeholder={isTyping ? "AI đang suy nghĩ..." : "Nhập bài toán cần giải (VD: Giải pt x^2 - 4 = 0)..."}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isTyping && sendMessage()}
              disabled={isTyping}
              className="flex-1 bg-transparent outline-none text-gray-800 disabled:text-gray-400 placeholder-gray-400"
            />

            {/* Nút Gửi / Dừng */}
            {isTyping ? (
              <motion.button
                onClick={handleStop}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                title="Dừng trả lời"
              >
                <PiStopCircleBold size={24} />
              </motion.button>
            ) : (
              <motion.button
                onClick={sendMessage}
                whileTap={{ scale: 0.9 }}
                disabled={!input.trim()}
                className={`p-2 rounded-xl transition-colors ${
                  !input.trim() 
                    ? "text-gray-300 bg-gray-100 cursor-not-allowed" 
                    : "text-white bg-[#1c7c76] hover:bg-[#166662] shadow-md"
                }`}
              >
                <PiPaperPlaneRightFill size={20} />
              </motion.button>
            )}
          </div>
          
          <p className="text-center text-[10px] text-gray-400 mt-2">
            AI có thể mắc lỗi. Hãy kiểm tra lại kết quả quan trọng.
          </p>
        </div>
      </div>

    </section>
  );
}