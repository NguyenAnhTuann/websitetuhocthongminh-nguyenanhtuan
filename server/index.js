const http = require("http");
const fetch = require("node-fetch");

require("dotenv").config();
const apiKey = process.env.OPENAI_API_KEY;


const server = http.createServer(async (req, res) => {
  if (req.url === "/chat" && req.method === "POST") {
    let body = "";

    req.on("data", chunk => (body += chunk));
    req.on("end", async () => {
      const { message } = JSON.parse(body);

      const result = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "Bạn là trợ lý Toán Lớp 10 – Cô Ngân. Hãy giải thích dễ hiểu, từng bước, không bỏ sót."
            },
            {
              role: "user",
              content: message
            }
          ]
        })
      });

      const data = await result.json();

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ reply: data.choices[0].message.content }));
    });
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});
