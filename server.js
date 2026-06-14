const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

app.get("/", (req, res) => {
    res.send("OK");
});

app.post("/player-joined", async (req, res) => {
    try {
        const player = req.body.player;

        if (!player) {
            return res.status(400).json({ error: "No player provided" });
        }

        console.log("Player joined:", player);

        await axios.post(DISCORD_WEBHOOK_URL, {
            content: `🟢 ${player} joined the game`
        });

        res.json({ success: true });

    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ error: "error" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on port", PORT);
});