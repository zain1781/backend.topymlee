const Jobs = require('../models/jobs.model');

const getAllJobs = async (req, res) => {
    try {
        const jobs = await Jobs.find();
        res.status(200).json(jobs);
    }   
    catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }


};

const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Jobs.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}


const createJob = async (req, res) => {
  try {
 

    const jobs = Array.isArray(req.body) ? req.body : [req.body];

    const requiredFields = [
      "title",
      "company",
      "description",
      "location",
      "experience",
      "salary",
      "type",
      "applylink",
      "userId"

    ];

    console.log("Received jobs data:", jobs);
 

    for (const job of jobs) {
      const missingFields = requiredFields.filter(field => !job[field]);
      if (missingFields.length > 0) {
        return res.status(400).json({
          message: "Missing required fields",
          missing: missingFields
        });
      }
    }

    const createdJobs = await Jobs.insertMany(jobs);
  

    res.status(201).json({
      message: "Jobs created successfully",
      jobs: createdJobs,
    });
    console.log("Jobs created:", jobs);

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};




const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const updates = req.body;
        const updatedJob = await Jobs.findByIdAndUpdate(jobId, updates, { new: true });
        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({
            message: 'Job updated successfully',
            job: updatedJob
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
   
const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;    
        const deletedJob = await Jobs.findByIdAndDelete(jobId);
        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({
            message: 'Job deleted successfully',
            job: deletedJob
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
module.exports = {
    getAllJobs,
    getJobById,  
    deleteJob,
    updateJob,
    createJob
};