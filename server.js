const express = require("express");
const cors = require("cors");
const path = require("path");
const OpenAI = require("openai");

const app = express();

// OpenAI
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

// ====== ここが重要 ======
// index.html を返す
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// プレイヤー発言を受け取る
app.post("/chat", async (req, res) => {
    const playerMessage = req.body.message;

    try {
        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "あなたはTRPGのゲームマスターです。"
                },
                {
                    role: "user",
                    content: playerMessage
                }
            ]
        });

        const gmReply = "GM: " + completion.choices[0].message.content;
        res.json({ reply: gmReply });

    } catch (error) {
        console.error(error);
        res.json({ reply: "GM: ……（エラーが発生した）" });
    }
});

// ====== Render 用 ======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});



