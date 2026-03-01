const  mongoose = require("mongoose")


const CvSchema =  new mongoose.Schema({
      userId: {   
          type: mongoose.Schema.Types.ObjectId,  
          ref: 'User',
          required: true
      },
      email:{
        type: String,
      },
      resume: {
        type: String,
        required: true,
    },
},{
    timestamps: true
})
const CV = mongoose.model('CV', CvSchema);
module.exports = CV;   


