const mongoose = require("mongoose");

// Re-use the same skill shape as InterviewerJob so matchedSkills/missingSkills
// are typed objects instead of plain Array.
const SkillResultSchema = new mongoose.Schema(
  {
    skillName:     { type: String, required: true },
    requiredLevel: { type: Number, min: 1, max: 5 },
    isMandatory:   { type: Boolean, default: false },
  },
  { _id: false }
);

const ResumeAnalysisSchema = new mongoose.Schema({
  resumeFileName: { type: String, required: true },

  resumeFilePath: { type: String, required: true },

  jobId: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      "InterviewerJob",
    required: true,
    index:    true,
  },

  matchedSkills: { type: [SkillResultSchema], default: [] },

  missingSkills: { type: [SkillResultSchema], default: [] },

  skillMatchPercentage: { type: Number, required: true, min: 0, max: 100 },

  roleAlignmentScore: { type: Number, required: true, min: 0, max: 100 },

  approved: { type: Boolean, default: false },

  status: {
    type:     String,
    enum:     ["Accepted", "Rejected"],
    required: true,
  },

  recommendations: { type: [String], default: [] },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ResumeAnalysis", ResumeAnalysisSchema);
