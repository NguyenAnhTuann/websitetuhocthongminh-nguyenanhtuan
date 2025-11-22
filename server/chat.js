import OpenAI from "openai";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// OpenAI Client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Lấy thời gian thật từ server
function getVNTime() {
  return new Date().toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false,
  });
}

// SYSTEM PROMPT CHUẨN CHATGPT
const SYSTEM_PROMPT = `
Bạn là ChatGPT – trợ lý AI tự nhiên, thông minh và mạnh mẽ.
Bạn trả lời tất cả các chủ đề: đời sống, toán học, lập trình, phân tích, lịch sử, khoa học, mẹo vặt.
Không giới hạn lĩnh vực.
Luôn trả lời rõ ràng, chính xác, mạch lạc và thân thiện.

Khi người dùng hỏi về ngày/giờ, hãy dùng thời gian hệ thống được gửi kèm:
(time) = <thời gian thực tế từ server>.

Luôn trả lời tự nhiên, không máy móc.
Không yêu cầu người dùng làm rõ trừ khi thật sự cần.
`;

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  const now = getVNTime();

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o", // MODEL MẠNH NHẤT GIỐNG CHATGPT
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT.replace("<thời gian thực tế từ server>", now),
        },
        { role: "user", content: message },
      ],
    });

    res.json({ reply: completion.choices[0].message.content });

  } catch (err) {
    console.error("❌ AI error:", err);
    res.status(500).json({ error: "AI error" });
  }
});

app.listen(5000, () => console.log("🚀 ChatGPT API đang chạy tại http://localhost:5000"));
