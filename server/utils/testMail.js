require("dotenv").config({ path: '../.env' });
const sendEmail = require("./sendMail");


sendEmail("nguyenanhtuan.profile@gmail.com", "Test Zoho", "<h1>Mail OK!</h1>")
  .then(() => {
    console.log("Email gửi thành công!");
  })
  .catch(err => {
    console.error("Lỗi gửi email:", err);
  });
