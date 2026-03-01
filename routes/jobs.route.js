const express = require('express');
const router = express.Router();
const { getAllJobs, createJob,getJobById,updateJob,deleteJob } = require('../controllers/jobs.controller');


router.get('/', getAllJobs); // Route to get all jobs
router.post('/', createJob); // Route to create a new job
router.get('/:id', getJobById); // Route to get a job by ID`
router.delete('/:id', deleteJob); // Route to delete a job by ID    
router.put('/:id', updateJob); // Route to update a job by ID
module.exports = router;