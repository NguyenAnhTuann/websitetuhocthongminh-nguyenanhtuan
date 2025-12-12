const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fetch = require("node-fetch");

// ===== OpenAI ChatGPT & Models =====
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
Bạn là trợ lý AI thông minh.
Trả lời chính xác và ngắn gọn.
`;

const User = require("./models/User");
const Visit = require("./models/Visit"); // 🔥 ĐÃ DI CHUYỂN VÀ THÊM DÒNG NÀY

// KHỞI TẠO APP — PHẢI ĐỂ Ở ĐÂY
const app = express();

// Tăng giới hạn lên 50mb để nhận được ảnh base64
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: [
      "https://www.tuhocthongminh.online",
      "https://tuhocthongminh.online",
      "https://websitetuhocthongminh-nguyenanhtuan.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// 🔥 LOGIC GHI LẠI LƯỢT TRUY CẬP (recordVisit)
const recordVisit = async (req, res, next) => {
    // Chỉ ghi lại nếu không phải request admin/stats
    const path = req.path.toLowerCase();
    if (!path.startsWith('/api/admin') && !path.startsWith('/api/stats') && req.method === 'GET') {
        try {
            await Visit.create({}); 
        } catch (error) {
            console.error('Lỗi khi ghi lại lượt truy cập:', error);
        }
    }
    next();
};

// ÁP DỤNG MIDDLEWARE
app.use(recordVisit); // 🔥 THÊM DÒNG NÀY


const SUBJECT_PROMPTS = {
  toan: `
Bạn là trợ lý AI CHUYÊN VỀ MÔN TOÁN.
Chỉ trả lời Toán: đại số, hình học, giải phương trình, xác suất, thống kê.
Nếu câu hỏi không thuộc môn Toán → trả lời: "Câu hỏi này không thuộc môn Toán. Vui lòng hỏi đúng môn."
`,
  nguvan: `
Bạn là trợ lý AI CHUYÊN MÔN NGỮ VĂN.
Chỉ phân tích thơ, văn bản, truyện, tác giả, tác phẩm, biện pháp tu từ, bài nghị luận.
Nếu câu hỏi không thuộc môn Ngữ Văn → từ chối.
`,
  tienganh: `
Bạn là trợ lý AI môn TIẾNG ANH.
Chỉ trả lời ngữ pháp, từ vựng, viết lại câu, luyện nghe, dịch văn bản.
Không trả lời các môn khác.
`,
  vatly: `
Bạn là trợ lý AI môn VẬT LÝ.
Chỉ trả lời cơ học, điện học, quang học, hạt nhân, dao động, sóng.
Câu hỏi ngoài Vật lý → từ chối.
`,
  hoahoc: `
Bạn là trợ lý AI môn HOÁ HỌC.
Chỉ trả lời hóa vô cơ, hữu cơ, phản ứng, cân bằng phương trình, cấu tạo chất.
Không trả lời nội dung môn khác.
`,
  sinhhoc: `
Bạn là trợ lý AI môn SINH HỌC.
Chỉ trả lời di truyền học, tế bào, tiến hóa, sinh thái, cơ thể người.
Không trả lời ngoài môn.
`,
  dialy: `
Bạn là trợ lý AI môn ĐỊA LÝ.
Chỉ trả lời về tự nhiên, dân cư, kinh tế, khí hậu, bản đồ.
Nếu câu hỏi ngoài môn → từ chối.
`,
  lichsu: `
Bạn là trợ lý AI môn LỊCH SỬ.
Chỉ trả lời sự kiện lịch sử, nhân vật lịch sử, chiến tranh, đường lối phát triển.
Ngoài phạm vi môn → từ chối.
`,
  tinhoc: `
Bạn là trợ lý AI môn TIN HỌC.
Chỉ trả lời thuật toán, lập trình, Excel, Word, PowerPoint, mạng máy tính.
Ngoài môn → từ chối.
`,
  congnghe: `
Bạn là trợ lý AI môn CÔNG NGHỆ.
Chỉ trả lời kỹ thuật, điện, nông nghiệp, công nghiệp.
Không trả lời câu hỏi sai môn.
`,
  quocphong: `
Bạn là trợ lý AI môn GIÁO DỤC QUỐC PHÒNG.
Chỉ trả lời an ninh quốc phòng, sơ cứu, đội hình đội ngũ, kỹ năng sống sót.
Không trả lời ngoài môn.
`,
  theduc: `
Bạn là trợ lý AI môn THỂ DỤC.
Chỉ trả lời các bài tập thể thao, rèn luyện sức khỏe, kỹ thuật vận động.
Không xử lý câu hỏi học thuật khác.
`,
  huongnghiep: `
Bạn là trợ lý AI môn HƯỚNG NGHIỆP.
Chỉ tư vấn nghề nghiệp, kỹ năng làm việc, định hướng tương lai.
Không trả lời kiến thức Toán, Lý, Hóa...
`,
  kinhtephapluat: `
Bạn là trợ lý AI môn KINH TẾ & PHÁP LUẬT.
Chỉ giải thích luật, quy định, quyền công dân, kiến thức kinh tế cơ bản.
Không trả lời câu hỏi ngoài môn.
`,
test: `
  Bạn là trợ lý AI dành cho người dùng trải nghiệm thử. 
  Hãy trả lời thân thiện, ngắn gọn và hữu ích về mọi lĩnh vực cơ bản.
  Luôn nhắc người dùng: "Hãy đăng nhập để chọn gia sư chuyên sâu từng môn học nhé!" ở cuối câu trả lời.
  `
};


// ROUTES
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);

const statsRoutes = require("./routes/stats"); // 🔥 THÊM DÒNG NÀY
app.use("/api/stats", statsRoutes) // 🔥 THÊM DÒNG NÀY

// ===============================
// 1) KẾT NỐI MONGODB
// ===============================

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🔗 Đã kết nối với DATABSE:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err);
    process.exit(1);
  });

// ===============================
// TẠO ADMIN
// ===============================
app.get("/make-admin", async (req, res) => {
  try {
    const email = "admin@gmail.com";
    await User.findOneAndUpdate(
      { email },
      { role: "admin" },
      { new: true }
    );
    res.send("Đã chuyển tài khoản thành admin");
  } catch (err) {
    res.status(500).send("Lỗi server");
  }
});

// ===============================
// 4) API ChatGPT (ĐÃ SỬA: CHỈ NHẬN TEXT)
// ===============================

app.post("/api/chat", async (req, res) => {
  // 1. Bỏ nhận biến 'image' từ req.body
  const { message, subject, history } = req.body;

  if (!subject || !SUBJECT_PROMPTS[subject]) {
    return res.json({ reply: "Lỗi: Môn học không hợp lệ." });
  }

  try {
    // 2. SỬA ĐOẠN NÀY: Luôn gán nội dung là text
    // (Đã xóa đoạn kiểm tra if (image) để tránh gửi ảnh lên OpenAI)
    const userContent = message;

    // 3. Xử lý LỊCH SỬ chat (Giữ nguyên)
    const previousMessages = Array.isArray(history) ? history : [];

    // 4. Gộp: [System Prompt] + [Lịch sử cũ] + [Câu hỏi mới]
    const fullConversation = [
      { role: "system", content: SUBJECT_PROMPTS[subject] },
      ...previousMessages, 
      { role: "user", content: userContent } // Lúc này content là chuỗi text, rất nhẹ
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: fullConversation,
      max_tokens: 1000,
    });

    const reply = completion.choices?.[0]?.message?.content;
    res.json({ reply });

  } catch (err) {
    console.error("❌ Error:", err);
    // Log chi tiết lỗi để dễ kiểm tra nếu có vấn đề khác
    if (err.response) {
        console.error(err.response.status, err.response.data);
    }
    res.status(500).json({ reply: "Lỗi server." });
  }
});



// ===============================
// 5) START SERVER
// ===============================
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy trên PORT ${PORT}`);
});