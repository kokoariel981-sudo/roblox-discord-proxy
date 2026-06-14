const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

app.post("/player-joined", async (req, res) => {
    const player = req.body.player;

    if (!player) {
        return res.status(400).json({ error: "No player provided" });
    }

    console.log("Player joined:", player);

    await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            content: `🟢 ${player} joined the game`
        })
    });

    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});