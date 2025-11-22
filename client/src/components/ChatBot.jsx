import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { motion } from "framer-motion";


export default function ChatBot() {
  // Scroll lên đầu trang sau khi DOM load xong (tránh che header)
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  }, []);


  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);


  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
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
        {
          sender: "bot",
          text: "Xin lỗi, hiện tại hệ thống đang gặp lỗi. Vui lòng thử lại sau.",
        },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-gray-900 flex justify-center">

      {/* MAIN AREA (Không sidebar) */}
      <div className="flex-1 max-w-3xl w-full flex flex-col">

        {/* HEADER */}
        <header className="sticky top-0 z-10 border-b border-gray-200 bg-[#f3f4f6]/80 backdrop-blur">
          <div className="px-4 py-4 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-xl font-semibold">ChatBot Hỗ Trợ</h1>
              <p className="text-sm text-gray-500">
                Trả lời mọi lĩnh vực – trải nghiệm giống ChatGPT.
              </p>
            </div>
          </div>
        </header>

        {/* BODY */}
        <main className="flex-1 px-4 py-6 flex flex-col gap-4">

          {/* KHUNG CHAT */}
          <div className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4">
              {messages.map((m, idx) => (
                <div key={idx} className="mb-1">

                  {/* USER */}
                  {m.sender === "user" && (
                    <div className="flex justify-end">
                      <div className="max-w-[75%] bg-[#0b93f6] text-white px-4 py-2.5 rounded-2xl rounded-br-sm shadow">
                        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
                          {m.text}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* BOT */}
                  {m.sender === "bot" && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shadow-inner">
                        <span className="text-gray-600 font-bold text-xs">AI</span>
                      </div>

                      <div className="max-w-[75%] bg-gray-50 text-gray-900 px-4 py-3 rounded-2xl rounded-tl-sm border border-gray-200 shadow-sm">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeRaw]}
                          components={{
                            p: ({ node, ...props }) => (
                              <p className="leading-relaxed text-[15px] mb-1 whitespace-pre-wrap" {...props} />
                            ),
                            li: ({ node, ...props }) => (
                              <li className="ml-5 list-disc text-[15px]" {...props} />
                            ),
                            strong: ({ node, ...props }) => (
                              <strong className="font-semibold" {...props} />
                            ),
                            code: ({ node, ...props }) => (
                              <code className="bg-gray-200 px-1 rounded text-red-600 text-[13px]" {...props} />
                            ),
                          }}
                        >
                          {m.text}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* TYPING INDICATOR */}
              {isTyping && (
                <div className="flex items-center gap-3 mt-1">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shadow-inner" />
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* INPUT BAR */}
          <div>
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
                className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition shadow"
              >
                ➤
              </motion.button>
            </div>

            <p className="mt-2 text-[11px] text-gray-400 text-center">
              Powered by OpenAI GPT-4o.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
