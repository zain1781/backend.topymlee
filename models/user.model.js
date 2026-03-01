const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
  name: {
    type: String,   
    required: true,
    trim: true, 
    },
    email: {
    type: String,
    required: true,
    unique: true,
    trim: true, 
    lowercase: true,
    },
    password: {
    type: String,   
    required: true,
    minlength: 6, 
    },
    company:{
    type: String,
    required: true,
    },
    location:{
    type: String,
    required: true,
    },
    subscription: {
    type: String,
    
    enum: ['free', 'premium'], // Example subscription types
    default: 'free', // Default subscription type
    },
    role: {
    type: String,   
    
    enum: ['user', 'admin','superadmin'], // Example roles
    default: 'user', // Default role
    },
    cvqty:{
    type: Number,
enum: ['10', '250', '500'], // Example CV quantity options
    default: '10', // Default CV quantity
    },
    createdAt: {
    type: Date,     
    default: Date.now, // Automatically set the creation date
    },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields  
});


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
  } catch (error) {
      console.error(error);
      process.exit(1);
  }
});
  userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };


const User = mongoose.model('User', userSchema);
module.exports = User;