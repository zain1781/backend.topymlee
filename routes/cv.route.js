const express = require('express');
const router = express.Router();
const { uploadCV, getCVByUserId,allCvs,deleteAllCvs } = require('../controllers/cv.controller.js');
const upload = require('../middleware/mutlter.js');
// Route to upload CV
router.post('/upload', upload.single('resume'), uploadCV);  
router.get('/', allCvs); // Route to get all CVs
router.get('/:userId', getCVByUserId); // Route to get CV by user ID
router.delete('/',deleteAllCvs) // Route to delete all CVs
module.exports = router;