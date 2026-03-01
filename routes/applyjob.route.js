const express = require('express');

const router = express.Router();

const {applyJob, getAllJobs,deleteJob}  = require("../controllers/applyjob.controller.js");
const upload = require('../middleware/mutlter.js');
// Route to apply for a job
router.post('/apply', upload.single('resume'), applyJob);
router.get('/', getAllJobs);
router.delete('/:id', deleteJob); // Route to delete a job by ID
// Export the router
module.exports = router;