const fs = require("fs");
const { classifyTraffic } = require("../ml/ai");

module.exports = async function (req, res, next) {
  // Ensure the logs directory exists
  const logDir = "logs";
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  // Create a log entry with request details
  const logEntry = {
    method: req.method,
    path: req.path,
    query: req.query,
    headers: req.headers,
    body: req.body,
    timestamp: new Date().toISOString(),
  };
  console.log("[Traffic Logger] Logging request:", logEntry);
  // AI Classification
  logEntry.prediction = await classifyTraffic(logEntry);

  // Log to file or database
  fs.appendFileSync("logs/traffic.json", JSON.stringify(logEntry) + "\n");
  console.log(
    `[AI] Prediction: ${logEntry.prediction} - ${req.method} ${req.path}`
  );

  next();
};
