const mongoose = require("mongoose");

const SkillRequirementSchema = new mongoose.Schema({
    skillName: {
        type: String,
        required: true
    },

    requiredLevel: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },

    isMandatory: {
        type: Boolean,
        default: false
    }
});

const InterviewerJobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },

    jobDescriptionPoints: {
        type: [String],
        required: true
    },

    techSkills: {
        type: [SkillRequirementSchema],
        required: true
    },

    minSkillMatchPercentage: {
        type: Number,
        default: 70
    },

    minRoleAlignmentScore: {
        type: Number,
        default: 60
    },

    experienceRequired: {
        type: Number, // in years
        min: 0
    },

    education: {
        type: String
    },

    roleType: {
        type: String,
        enum: ["Intern", "Junior", "Mid", "Senior"],
        required: true
    },

    createdBy: {
        type: String,
        default: "admin"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("InterviewerJob", InterviewerJobSchema);