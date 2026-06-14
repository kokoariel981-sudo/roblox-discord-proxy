const express = require("express");

const app = express();
app.use(express.json());

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

// test route (VERY IMPORTANT for debugging)
app.get("/", (req, res) => {
    res.send("Server is alive ✅");
});

app.post("/player-joined", async (req, res) => {
    try {
        const player = req.body.player;

        if (!player) {
            return res.status(400).json({ error: "No player provided" });
        }

        console.log("Player joined:", player);

        // Node 22 built-in fetch (NO imports needed)
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: `🟢 ${player} joined the game`
            })
        });

        if (!response.ok) {
            console.error("Discord webhook failed:", await response.text());
        }

        res.json({ success: true });

    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ error: "Internal error" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on port", PORT);
});