const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// const fs = require("fs");
const path = require("path");
const helmet = require("helmet");
const trafficLogger = require("./middlewares/trafficLogger");
const detectionRouter = require("./routes/detection");


const app = express();
// app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(trafficLogger); // Log and classify traffic

app.use("/public", express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/v1/detect", detectionRouter);

module.exports = app;
