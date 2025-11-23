import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// SYSTEM PROMPT NGẮN – KHÔNG CHÀO, KHÔNG DẪN DÀI
const SYSTEM_PROMPT = `
Bạn là trợ lý AI thông minh. 
Trả lời chính xác, rõ ràng, vào thẳng trọng tâm.
Không chào hỏi kiểu "Xin chào", không mở đầu vòng vo.
Chỉ trả lời nội dung người dùng hỏi.
`;

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const prompt = `
${SYSTEM_PROMPT}

Người dùng hỏi: ${message}
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({ reply });

  } catch (err) {
    console.error("❌ Gemini API error:", err);
    res.status(500).json({
      reply: "Lỗi máy chủ hoặc API Gemini. Vui lòng thử lại."
    });
  }
});

app.listen(5000, () =>
  console.log("🚀 Gemini AI server running at http://localhost:5000")
);
