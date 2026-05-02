const express = require('express');
const app = express();
const Log = require('../logging_middleware/log');

app.use(express.json());

app.post('/notify', (req, res) => {

    Log("backend", "info", "controller", "Notify API called");

    const { message } = req.body;

    if (!message) {
        Log("backend", "error", "handler", "Message missing");
        return res.status(400).json({ error: "Message is required" });
    }

    Log("backend", "info", "service", "Notification processed successfully");

    res.json({
        status: "success",
        message: message
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
