const ApplyJob = require('../models/applyjob.model.js');

const applyJob = async (req, res) => {
  try {
    const { jobId, userId, name, email, coverLetter, phone, linkedin } = req.body;
    console.log(req.body);
    let resume = req.body.resume;
    const file = req.file;

    if (file) {
      // If a file is uploaded, use its path as the resume
      resume = file.filename;
    }

    // Validate required fields
    if (!jobId || !userId || !resume || !phone || !coverLetter || !name || !email || !linkedin) {
      return res.status(400).json({
        message: 'Fields are required.',
      });
    }

    // Create a new application
    const newApplication = new ApplyJob({
      jobId,
      userId,
      name,
      email,
      linkedin,
      resume,
      coverLetter,
      phone,
    });

    const savedApplication = await newApplication.save();

    res.status(201).json({
      message: 'Application submitted successfully',
      application: savedApplication,
    });
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
const getAllJobs = async (req, res) => {
  try {
    const applyjobs = await ApplyJob.find();
    res.status(200).json(applyjobs);
    } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({
      message: 'Internal Server Error',
        error: error.message,
    });
  }
};

const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const deletedJob = await ApplyJob.findByIdAndDelete(jobId);
        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Applicant deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
module.exports = { applyJob, getAllJobs, deleteJob };
