const mongoose = require('mongoose');


const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },  
    company: {
        type: String,
        required: true,
        trim: true
    },

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    location: {
        type: String,
        required: true,
        trim: true
    },
    experience: {
        type: Number,
        required: true,
        trim: true
    },
    salary: {
        type: Number,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
       
    },
    applylink: {
        type: String,
        required: true,
        trim: true
    },
       description: {
        type: String,
        required: true,
        trim: true
    },
  
}, {
    timestamps: true
});


const Job = mongoose.model('Job', jobSchema);
module.exports = Job;   
