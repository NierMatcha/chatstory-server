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
        const completion = await client.chat.


