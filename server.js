const express = require("express");

const app = express();

app.use(express.json());

app.post("/player-joined", (req, res) => {
    console.log("Player joined:", req.body);

    res.json({
        success: true
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});