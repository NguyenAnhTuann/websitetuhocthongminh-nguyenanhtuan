import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LuSend, LuBot } from "react-icons/lu";

export default function ChatTest() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Câu chào mặc định
  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: "Xin chào! 👋 Đây là bản dùng thử Chatbot AI.\nBạn có thể hỏi tôi bất cứ điều gì (Toán, Văn, Anh...). \n\nLưu ý: Để được hỗ trợ chuyên sâu, hãy Đăng nhập nhé!",
      },
    ]);
  }, []);

  // Tự động cuộn xuống
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Gọi API với subject là "test"
      const res = await axios.post("https://websitetuhocthongminh-nguyenanhtuan.onrender.com/api/chat", {
        message: input,
        subject: "test", // QUAN TRỌNG: Phải khớp với key trong index.js
        history: newMessages.slice(-6), // Gửi kèm lịch sử chat ngắn
      });

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Lỗi kết nối server. Vui lòng thử lại sau." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[85vh] max-w-4xl mx-auto p-4">
      {/* Header riêng cho bản Test */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded relative">
        <p className="font-bold">Chế độ Dùng thử</p>
        <p>Bạn đang chat với AI tổng hợp. <Link to="/dangnhap" className="underline text-blue-600">Đăng nhập ngay</Link> để mở khóa Gia sư chuyên sâu.</p>
      </div>

      {/* Khung chat */}
      <div className="flex-1 overflow-y-auto bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-inner">
        {messages.map((msg, index) => (
          <div key={index} className={`flex mb-4 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === "user" ? "bg-[#1c7c76] text-white rounded-br-none" : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"}`}>
              <p style={{ whiteSpace: "pre-wrap" }}>{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && <div className="text-gray-400 text-sm italic ml-2">AI đang suy nghĩ...</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1c7c76]"
          placeholder="Nhập câu hỏi của bạn..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} disabled={isLoading} className="bg-[#1c7c76] text-white p-3 rounded-xl hover:bg-[#155f5b] transition-colors">
          <LuSend size={20} />
        </button>
      </div>
    </div>
  );
}