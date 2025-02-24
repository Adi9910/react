import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files

// Serve the HTML page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// API to save data
app.post("/save", (req, res) => {
    const newData = req.body;
    
    fs.readFile("data.json", "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: err });

        let jsonData = data ? JSON.parse(data) : [];
        jsonData.push(newData);

        fs.writeFile("data.json", JSON.stringify(jsonData, null, 2), (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Data saved successfully!" });
        });
    });
});

// Start the server
app.listen(5000, () => console.log("Server running on port 5000"));
