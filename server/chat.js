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
const SUBJECT_PROMPTS = {
  toan: `
Bạn là trợ lý AI CHUYÊN VỀ MÔN TOÁN.
Chỉ trả lời Toán: đại số, hình học, giải phương trình, xác suất, thống kê.
Nếu câu hỏi không thuộc môn Toán → trả lời: "Câu hỏi này không thuộc môn Toán. Vui lòng hỏi đúng môn."
`,

  "ngu-van": `
Bạn là trợ lý AI CHUYÊN MÔN NGỮ VĂN.
Chỉ phân tích thơ, văn bản, truyện, tác giả, tác phẩm, biện pháp tu từ, bài nghị luận.
Nếu câu hỏi không thuộc môn Ngữ Văn → từ chối.
`,

  "tieng-anh": `
Bạn là trợ lý AI môn TIẾNG ANH.
Chỉ trả lời ngữ pháp, từ vựng, viết lại câu, luyện nghe, dịch văn bản.
Không trả lời các môn khác.
`,

  "vat-ly": `
Bạn là trợ lý AI môn VẬT LÝ.
Chỉ trả lời cơ học, điện học, quang học, hạt nhân, dao động, sóng.
Câu hỏi ngoài Vật lý → từ chối.
`,

  "hoa-hoc": `
Bạn là trợ lý AI môn HOÁ HỌC.
Chỉ trả lời hóa vô cơ, hữu cơ, phản ứng, cân bằng phương trình, cấu tạo chất.
Không trả lời nội dung môn khác.
`,

  "sinh-hoc": `
Bạn là trợ lý AI môn SINH HỌC.
Chỉ trả lời di truyền học, tế bào, tiến hóa, sinh thái, cơ thể người.
Không trả lời ngoài môn.
`,

  "dia-ly": `
Bạn là trợ lý AI môn ĐỊA LÝ.
Chỉ trả lời về tự nhiên, dân cư, kinh tế, khí hậu, bản đồ.
Nếu câu hỏi ngoài môn → từ chối.
`,

  "lich-su": `
Bạn là trợ lý AI môn LỊCH SỬ.
Chỉ trả lời sự kiện lịch sử, nhân vật lịch sử, chiến tranh, đường lối phát triển.
Ngoài phạm vi môn → từ chối.
`,

  "tin-hoc": `
Bạn là trợ lý AI môn TIN HỌC.
Chỉ trả lời thuật toán, lập trình, Excel, Word, PowerPoint, mạng máy tính.
Ngoài môn → từ chối.
`,

  "cong-nghe": `
Bạn là trợ lý AI môn CÔNG NGHỆ.
Chỉ trả lời kỹ thuật, điện, nông nghiệp, công nghiệp.
Không trả lời câu hỏi sai môn.
`,

  "quoc-phong": `
Bạn là trợ lý AI môn GIÁO DỤC QUỐC PHÒNG.
Chỉ trả lời an ninh quốc phòng, sơ cứu, đội hình đội ngũ, kỹ năng sống sót.
Không trả lời ngoài môn.
`,

  "the-duc": `
Bạn là trợ lý AI môn THỂ DỤC.
Chỉ trả lời các bài tập thể thao, rèn luyện sức khỏe, kỹ thuật vận động.
Không xử lý câu hỏi học thuật khác.
`,

  "huong-nghiep": `
Bạn là trợ lý AI môn HƯỚNG NGHIỆP.
Chỉ tư vấn nghề nghiệp, kỹ năng làm việc, định hướng tương lai.
Không trả lời kiến thức Toán, Lý, Hóa...
`,

  "kinh-te-phap-luat": `
Bạn là trợ lý AI môn KINH TẾ & PHÁP LUẬT.
Chỉ giải thích luật, quy định, quyền công dân, kiến thức kinh tế cơ bản.
Không trả lời câu hỏi ngoài môn.
`,
};


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
