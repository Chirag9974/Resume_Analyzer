const fs   = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const { extractText }        = require("../services/pdfService");
const { analyzeResumeWithAI } = require("../services/aiService");
const InterviewerJob         = require("../models/InterviewerJob");
const ResumeAnalysis         = require("../models/ResumeAnalysis");

/**
 * Safely delete a file; swallows errors so cleanup never masks the real error.
 */
function safeDelete(filePath) {
  try {
    if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
  } catch {
    // best-effort cleanup
  }
}

exports.analyzeResume = async (req, res) => {
  const uploadedPath = req.file?.path ?? null;

  try {
    if (!req.file) {
      return res.status(400).json({ error: "Resume file is required" });
    }

    const { jobId } = req.body;

    if (!jobId) {
      safeDelete(uploadedPath);
      return res.status(400).json({ error: "jobId is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      safeDelete(uploadedPath);
      return res.status(400).json({ error: "jobId is not a valid ObjectId" });
    }

    const job = await InterviewerJob.findById(jobId);
    if (!job) {
      safeDelete(uploadedPath);
      return res.status(404).json({ error: "Job not found" });
    }

    // Will throw if the PDF is unreadable or empty
    const resumeText = await extractText(req.file.path);

    const aiResult = await analyzeResumeWithAI(resumeText, {
      jobTitle:              job.jobTitle,
      jobDescriptionPoints:  job.jobDescriptionPoints,
      techSkills:            job.techSkills,
    });

    const approved =
      aiResult.skillMatchPercentage >= job.minSkillMatchPercentage &&
      aiResult.roleAlignmentScore   >= job.minRoleAlignmentScore;

    const targetFolder = approved ? "accepted" : "rejected";
    const finalPath    = path.join("uploads", targetFolder, req.file.filename);

    // fs.rename is async and works cross-device; fs.renameSync can fail between partitions
    await fs.promises.rename(
      path.resolve(__dirname, "..", uploadedPath),
      path.resolve(__dirname, "..", finalPath)
    );

    const analysis = await ResumeAnalysis.create({
      resumeFileName:       req.file.filename,
      resumeFilePath:       finalPath,
      jobId:                job._id,
      matchedSkills:        aiResult.matchedSkills,
      missingSkills:        aiResult.missingSkills,
      skillMatchPercentage: aiResult.skillMatchPercentage,
      roleAlignmentScore:   aiResult.roleAlignmentScore,
      approved,
      status:               approved ? "Accepted" : "Rejected",
      recommendations:      aiResult.recommendations,
    });

    return res.status(200).json({
      message:  "Resume analyzed successfully",
      approved,
      analysis,
    });

  } catch (error) {
    // Remove the orphaned upload so the staging folder stays clean
    safeDelete(uploadedPath);
    console.error("[analyzeResume]", error.message);
    return res.status(500).json({ error: error.message });
  }
};
