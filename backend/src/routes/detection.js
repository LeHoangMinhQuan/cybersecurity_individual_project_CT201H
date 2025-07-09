const express = require("express");
const fs = require("fs");
const path = require("path");
const { avatarUpload } = require("../middlewares/avatar-upload.middleware");
const router = express.Router();

// GET /api/v1/detect/logs - fetch recent traffic logs
router.get("/logs", (req, res) => {
  const logFilePath = path.join(__dirname, "../../logs/traffic.json");
  if (!fs.existsSync(logFilePath)) {
    return res.status(200).json([]);
  }

  const rawLines = fs.readFileSync(logFilePath, "utf-8").trim().split("\n");
  const logs = rawLines
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch (err) {
        console.error("Failed to parse log line:", line, err);
        return null;
      }
    })
    .filter(Boolean);

  res.status(200).json(logs);
});

router.post("/upload", avatarUpload, (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.status(200).json({
    message: "File uploaded successfully.",
    filename: req.file.filename,
    path: req.file.path,
  });
});
module.exports = router;
