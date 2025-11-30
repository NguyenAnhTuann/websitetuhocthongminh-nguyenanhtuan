import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Tạo client OpenAI (ChatGPT)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // <-- sử dụng key bạn đã tạo
});

// SYSTEM PROMPT – quy tắc trả lời
const SYSTEM_PROMPT = `
Bạn là trợ lý AI thông minh.
Trả lời chính xác, rõ ràng, vào thẳng trọng tâm.
Không chào hỏi kiểu "Xin chào", không giới thiệu bản thân.
Chỉ trả lời nội dung người dùng hỏi.
`;

// ============================
// ROUTE CHAT GPT
// ============================
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // model rẻ, mạnh, tốt nhất hiện tại
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content ||
      "Tôi chưa thể trả lời câu hỏi này.";

    res.json({ reply });
  } catch (err) {
    console.error("❌ OpenAI API error:", err);
    res.status(500).json({
      reply: "Lỗi server hoặc API ChatGPT. Vui lòng thử lại.",
    });
  }
});

// ============================
// START SERVER
// ============================
app.listen(5000, () =>
  console.log("🚀 ChatGPT server running at https://websitetuhocthongminh-nguyenanhtuan.onrender.com")
);
