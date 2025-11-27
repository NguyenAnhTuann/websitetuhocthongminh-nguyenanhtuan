// File: server/check_model.js
require("dotenv").config();

// Hàm wrapper để dùng fetch trong CommonJS (giống hệt index.js của bạn)
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log("❌ Lỗi: Không tìm thấy GEMINI_API_KEY trong file .env");
    return;
  }

  console.log("🔄 Đang hỏi Google danh sách model...");

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
      { method: "GET" }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log("❌ Lỗi kết nối:", JSON.stringify(data, null, 2));
      return;
    }

    if (data.models) {
      console.log("\n✅ DANH SÁCH MODEL BẠN ĐƯỢC DÙNG (Hãy copy 1 cái tên dưới đây):");
      console.log("---------------------------------------------------------------");
      data.models.forEach(model => {
        // Chỉ lấy các model hỗ trợ tạo văn bản (generateContent)
        if (model.supportedGenerationMethods && model.supportedGenerationMethods.includes("generateContent")) {
            // Lọc bớt các model phức tạp, chỉ lấy tên ngắn gọn dễ dùng
            console.log(`👉 ${model.name.replace("models/", "")}`);
        }
      });
      console.log("---------------------------------------------------------------");
    } else {
      console.log("⚠️ Không tìm thấy danh sách model nào.");
    }

  } catch (error) {
    console.error("❌ Lỗi chương trình:", error);
  }
}

listModels();