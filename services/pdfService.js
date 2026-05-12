const fs   = require("fs");
const path = require("path");
const pdf  = require("pdf-parse");

const MIN_TEXT_LENGTH = 50; // characters

/**
 * Extract plain text from a PDF file.
 * @param {string} relativeFilePath - path returned by multer
 * @returns {Promise<string>} extracted text
 * @throws {Error} if the file is missing, unreadable, or yields too little text
 */
exports.extractText = async (relativeFilePath) => {
  const absolutePath = path.resolve(__dirname, "..", relativeFilePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`PDF file not found: ${absolutePath}`);
  }

  const buffer = fs.readFileSync(absolutePath);
  const data   = await pdf(buffer);
  const text   = data.text || "";

  if (text.trim().length < MIN_TEXT_LENGTH) {
    throw new Error(
      "Could not extract readable text from the PDF. " +
      "The file may be scanned, image-only, or password-protected."
    );
  }

  return text;
};
