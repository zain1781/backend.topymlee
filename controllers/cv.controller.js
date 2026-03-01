const CV = require('../models/cv.model.js');

const uploadCV = async (req, res) => {
    try {
        const userId = req.body.userId;
      
        let resume = req.body.resume;
        const file = req.file;  
        if (file) {
            // If a file is uploaded, use its path as the resume
            resume = file.filename;
        }   

          const email = req.body.email;
        console.log(email);
        // Validate required fields
        if (!userId || !resume || !email) {
            return res.status(400).json({ message: 'Fields are required.' });
        }
        // Check if a CV already exists for the user
        const existingCV = await CV.findOne({ userId });
        if(!existingCV && !file){
            return res.status(400).json({ message: 'Please upload a CV file.' });



        }
        
        if (existingCV) {
            // If a CV exists, update it
                existingCV.resume = resume;

            const updatedCV = await existingCV.save();
            return res.status(200).json({ message: 'CV updated successfully', cv: updatedCV });
        }

        // Create a new CV
        const newCV = new CV({
            userId,
            email,
            resume
            
        });

        const savedCV = await newCV.save();     
        console.log(savedCV);
        res.status(201).json({ message: 'CV uploaded successfully', cv: savedCV });
        
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
        console.error(error);
    }


}


const getCVByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const cv = await CV.findOne({ userId });
        if (!cv) {
            return res.status(404).json({ message: 'CV not found for the user' });
        }
        res.status(200).json(cv);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

const allCvs = async (req, res) => {
    try {
        const cvs = await CV.find();
        res.status(200).json(cvs);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}


const deleteAllCvs = async (req, res) => {
    try {
        await CV.deleteMany({});
        res.status(200).json({ message: 'All CVs deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }   
}
    

module.exports = {
    uploadCV,
    allCvs,
    deleteAllCvs,
    getCVByUserId
};