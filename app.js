require("dotenv").config();
const fs      = require("fs");
const path    = require("path");
const express = require("express");
const cors    = require("cors");

const connectDB      = require("./config/db");
const analyzeRoutes  = require("./routes/analyzeRoutes");
const jobRoutes      = require("./routes/jobRoutes");

// Ensure required upload directories exist before the server starts.
// multer will crash with an unhelpful ENOENT if they are missing.
const UPLOAD_DIRS = [
  "uploads/resume",
  "uploads/accepted",
  "uploads/rejected",
];

UPLOAD_DIRS.forEach((dir) => {
  fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
});

connectDB();

const app  = express();
const port = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────────────────────────

app.use(cors());
app.use(express.json());

// Basic request logger
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ── Routes ──────────────────────────────────────────────────────────────────

app.use("/api", analyzeRoutes);
app.use("/api", jobRoutes);

// ── 404 handler ─────────────────────────────────────────────────────────────

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ── Global error handler ─────────────────────────────────────────────────────
// Must have four parameters so Express treats it as an error handler.

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(`[ERROR] ${err.message}`, err.stack);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
