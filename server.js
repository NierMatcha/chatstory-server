const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// テスト用ルート
app.get("/", (req, res) => {
    res.send("ChatStory server is running");
});

// サーバー起動
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
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

