const express = require("express");
const router  = express.Router();
const {
  createJob,
  getJobs,
  getJob,
  getJobAnalyses,
} = require("../controllers/jobController");

router.post  ("/jobs",                createJob);
router.get   ("/jobs",                getJobs);
router.get   ("/jobs/:id",            getJob);
router.get   ("/jobs/:id/analyses",   getJobAnalyses);

module.exports = router;
