const fs     = require("fs");
const path   = require("path");
const multer = require("multer");

// Guarantee the staging directory exists before multer tries to write to it.
const RESUME_DIR = path.join(__dirname, "..", "uploads", "resume");
fs.mkdirSync(RESUME_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, RESUME_DIR),
  filename: (_req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const fileFilter = (_req, file, cb) => {
  const isPdf =
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/x-pdf" ||
    file.originalname.toLowerCase().endsWith(".pdf");

  isPdf
    ? cb(null, true)
    : cb(new Error("Only PDF files are allowed"), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

module.exports = upload;
