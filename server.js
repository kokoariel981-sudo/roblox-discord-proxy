const express = require("express");

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

        await fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: "Roblox Tracker",
                avatar_url: "https://i.imgur.com/4M34hi2.png",
                embeds: [
                    {
                        author: {
                            name: "Roblox Server Monitor",
                            icon_url: "https://i.imgur.com/4M34hi2.png"
                        },
                        title: "Player Joined",
                        color: 0x2ecc71,
                        description: `**${player}** just joined the game`,
                        fields: [
                            {
                                name: "Event",
                                value: "Join",
                                inline: true
                            },
                            {
                                name: "Player",
                                value: player,
                                inline: true
                            }
                        ],
                        footer: {
                            text: "Roblox Live Tracker"
                        },
                        timestamp: new Date().toISOString()
                    }
                ]
            })
        });

        res.json({ success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "error" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on port", PORT);
});
