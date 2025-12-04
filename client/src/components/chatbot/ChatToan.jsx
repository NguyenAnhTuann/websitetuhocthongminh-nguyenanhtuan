import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { motion, AnimatePresence } from "framer-motion";
// Thay PiImage bằng PiPaperclip
import { PiMathOperationsFill, PiPaperclip, PiX } from "react-icons/pi";

export default function ChatToan() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // --- State quản lý ảnh ---
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Hàm chuyển file sang Base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const sendMessage = async () => {
    if (!input.trim() && !selectedFile) return;

    // 1. Cập nhật giao diện ngay lập tức
    const userMsg = { sender: "user", text: input, image: previewUrl };
    setMessages((prev) => [...prev, userMsg]);

    const currentInput = input;
    const currentImage = selectedFile;

    // 2. CHUẨN BỊ LỊCH SỬ (QUAN TRỌNG)
    // Lấy 10 tin nhắn gần nhất để AI nhớ ngữ cảnh (tránh gửi quá nhiều tốn tiền/token)
    // Map từ sender "user"/"bot" sang role "user"/"assistant"
    const historyToSend = messages.slice(-10).map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text || "" // Chỉ gửi text của lịch sử để tiết kiệm, bỏ qua ảnh cũ
    }));

    // Reset input
    setInput("");
    clearImage(); 
    setIsTyping(true);

    try {
      let base64Image = null;
      if (currentImage) {
        base64Image = await convertFileToBase64(currentImage);
      }

      const res = await fetch(
        "https://websitetuhocthongminh-nguyenanhtuan.onrender.com/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: currentInput,
            subject: "toan",
            image: base64Image,
            history: historyToSend, // <--- Gửi kèm lịch sử tại đây
          }),
        }
      );

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
      }, 10);

    } catch (err) {
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "bot", text: "Lỗi hệ thống." }]);
    }
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white border border-gray-200 rounded-2xl shadow-md p-6"
      >
        <div className="h-[450px] overflow-y-auto space-y-6 pr-2">
          {messages.map((m, idx) => (
            <div key={idx}>
              {m.sender === "user" ? (
                // --- CẬP NHẬT: Hiển thị User Message (Text + Ảnh) ---
                <div className="flex flex-col items-end">
                  {/* Nếu có ảnh thì hiển thị ảnh trước */}
                  {m.image && (
                    <div className="mb-2">
                       <img 
                         src={m.image} 
                         alt="Uploaded content" 
                         className="max-w-[200px] max-h-[200px] rounded-lg border border-gray-200 shadow-sm object-contain bg-gray-50"
                       />
                    </div>
                  )}
                  {/* Nếu có text thì hiển thị text */}
                  {m.text && (
                    <div className="max-w-[75%] bg-[#3C9E8F] text-white px-4 py-2.5 rounded-2xl shadow">
                      {m.text}
                    </div>
                  )}
                </div>
              ) : (
                // --- Bot Message ---
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#A8DCD2] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#1c7c76] font-bold text-xs">AI</span>
                  </div>
                  <div className="max-w-[85%] bg-gray-50 text-gray-900 px-4 py-3 rounded-2xl border shadow-sm overflow-hidden">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
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
        
        {/* Preview ảnh nhỏ TRƯỚC khi gửi (để user biết mình đã chọn) */}
        <AnimatePresence>
          {previewUrl && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mb-2 ml-2 relative inline-block"
            >
              <div className="relative group">
                <img src={previewUrl} alt="Preview" className="h-16 rounded-lg border border-gray-300 shadow-sm" />
                <button 
                  onClick={clearImage}
                  className="absolute -top-2 -right-2 bg-gray-200 text-gray-600 rounded-full p-1 hover:bg-red-500 hover:text-white transition-colors shadow-sm"
                >
                  <PiX size={12} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white border border-gray-300 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2">
          
          {/* 1. Ô nhập liệu (Input) */}
          <input
            value={input}
            placeholder="Nhập bài toán..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 bg-transparent outline-none text-[15px] text-gray-800 placeholder-gray-400"
          />

          <div className="flex items-center gap-1 border-l pl-2 border-gray-200">
             {/* Input file ẩn */}
             <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              hidden
            />
            
            {/* 2. Nút Kẹp Giấy (Chọn ảnh) nằm cạnh nút gửi */}
            <button
              onClick={() => fileInputRef.current.click()}
              className={`p-2 rounded-full transition-colors ${
                selectedFile ? "text-[#1c7c76] bg-teal-50" : "text-gray-400 hover:text-[#1c7c76] hover:bg-gray-100"
              }`}
              title="Đính kèm hình ảnh"
            >
              <PiPaperclip size={22} />
            </button>

            {/* 3. Nút Gửi */}
            <motion.button
              onClick={sendMessage}
              whileTap={{ scale: 0.9 }}
              disabled={!input.trim() && !selectedFile}
              className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
                (!input.trim() && !selectedFile) 
                  ? "text-gray-300 cursor-not-allowed" 
                  : "text-white bg-[#1c7c76] hover:bg-[#166662] shadow-sm"
              }`}
            >
              {/* Icon mũi tên gửi hoặc chữ Gửi */}
              <span className="px-2 font-bold text-sm">GỬI</span>
            </motion.button>
          </div>

        </div>

        <p className="mt-2 text-xs text-gray-400 text-center">
          ChatBot chuyên môn Toán – Powered by AI.
        </p>
      </div>
    </section>
  );
}