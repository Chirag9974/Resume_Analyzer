const axios = require("axios");

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";

/**
 * Send resume text and job configuration to the Python AI service.
 * @param {string} resumeText - extracted resume text
 * @param {object} jobData    - interviewer-defined job data
 * @returns {Promise<object>} analysis result
 * @throws {Error} with an actionable message if the service is unreachable
 */
exports.analyzeResumeWithAI = async (resumeText, jobData) => {
  try {
    const response = await axios.post(
      `${AI_SERVICE_URL}/analyze`,
      { resume_text: resumeText, job: jobData },
      { timeout: 15000 }
    );
    return response.data;
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      throw new Error(
        `AI service is not reachable at ${AI_SERVICE_URL}. ` +
        "Make sure the Python FastAPI server is running."
      );
    }
    if (error.response) {
      const detail = error.response.data?.detail || error.response.statusText;
      throw new Error(`AI service returned an error: ${detail}`);
    }
    throw new Error(`AI service request failed: ${error.message}`);
  }
};
