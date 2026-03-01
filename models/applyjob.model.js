const mongoose  = require('mongoose');

const applyjobschema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Job',
        required: true
    },
    userId: {   
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'User',
        required: true
    },
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    linkedin:{
        type: String,
        required: true,
    },

    
    resume: {
        type: String,
        required: true,
    },
    coverLetter: {
        type: String,
        required: false, // Optional field
    },
    phone:{
        type: String,
        required: true,
    },

    
    
    status: {
        type: String,
        enum: ['applied', 'interviewed', 'hired', 'rejected'],
        default: 'applied'
    },
    appliedAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true    
});     

const ApplyJob = mongoose.model('ApplyJob', applyjobschema);
module.exports = ApplyJob;
