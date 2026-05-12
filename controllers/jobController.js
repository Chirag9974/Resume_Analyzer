const mongoose       = require("mongoose");
const InterviewerJob = require("../models/InterviewerJob");
const ResumeAnalysis = require("../models/ResumeAnalysis");

// ── Create job ───────────────────────────────────────────────────────────────

exports.createJob = async (req, res) => {
  try {
    const {
      jobTitle,
      jobDescriptionPoints,
      techSkills,
      roleType,
      minSkillMatchPercentage,
      minRoleAlignmentScore,
      experienceRequired,
      education,
    } = req.body;

    // Basic validation (Mongoose will enforce types; this surfaces friendlier errors)
    if (!jobTitle?.trim()) {
      return res.status(400).json({ error: "jobTitle is required" });
    }
    if (!Array.isArray(jobDescriptionPoints) || jobDescriptionPoints.length === 0) {
      return res.status(400).json({ error: "jobDescriptionPoints must be a non-empty array" });
    }
    if (!Array.isArray(techSkills) || techSkills.length === 0) {
      return res.status(400).json({ error: "techSkills must be a non-empty array" });
    }
    if (!roleType) {
      return res.status(400).json({ error: "roleType is required" });
    }

    const job = await InterviewerJob.create({
      jobTitle:               jobTitle.trim(),
      jobDescriptionPoints,
      techSkills,
      roleType,
      minSkillMatchPercentage,
      minRoleAlignmentScore,
      experienceRequired,
      education,
    });

    return res.status(201).json({ message: "Job created successfully", job });

  } catch (error) {
    console.error("[createJob]", error.message);
    // Expose mongoose validation messages; hide internal details for other errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Failed to create job" });
  }
};

// ── List all jobs ────────────────────────────────────────────────────────────

exports.getJobs = async (_req, res) => {
  try {
    const jobs = await InterviewerJob.find().sort({ createdAt: -1 });
    return res.status(200).json({ jobs });
  } catch (error) {
    console.error("[getJobs]", error.message);
    return res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

// ── Get a single job ─────────────────────────────────────────────────────────

exports.getJob = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid job ID" });
    }

    const job = await InterviewerJob.findById(id);
    if (!job) return res.status(404).json({ error: "Job not found" });

    return res.status(200).json({ job });
  } catch (error) {
    console.error("[getJob]", error.message);
    return res.status(500).json({ error: "Failed to fetch job" });
  }
};

// ── Get all analyses for a job ───────────────────────────────────────────────

exports.getJobAnalyses = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid job ID" });
    }

    const analyses = await ResumeAnalysis.find({ jobId: id }).sort({ createdAt: -1 });
    return res.status(200).json({ analyses });
  } catch (error) {
    console.error("[getJobAnalyses]", error.message);
    return res.status(500).json({ error: "Failed to fetch analyses" });
  }
};
