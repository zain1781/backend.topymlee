const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer")

const signup = async (req, res) => {
  try {
    const { name, email, password, company, location } = req.body;
    console.log('Signup request received:', { name, email, company, location });


    if (!name || !email || !password || !company || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password.trim(),
      company: company.trim(),
      location: location.trim(),
      // role and subscription will use defaults
    });

    await newUser.save();

    // ✅ Success response
    res.status(201).json({ message: 'User registered successfully', user: newUser });
    
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const Loginuser =  async (req,res) =>{
  try {
    const { email, password } = req.body;
    console.log('Login request received:', { email });
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const finduser = await User.findOne({ email: email.toLowerCase() });
    if (!finduser) {  
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await finduser.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    // Generate JWT token
    const token = jwt.sign(
      { id: finduser._id, email: finduser.email, role: finduser.role , qty: finduser.cvqty, company :finduser.company},
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: finduser._id,
        name: finduser.name,
        email: finduser.email,
        role: finduser.role,
        subscription: finduser.subscription,
      },
      token
    });

  console.log('Login successful for user:', finduser.email);
  
    
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
    
  }

}

const Deleteuser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    } 
    res.status(200).json({ message: 'User deleted successfully' });
  }
  catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  } 
};

const userbyid = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  }
  catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }   
};

const updateuser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

 const resetPass = async (req, res) => {
  try {
    const { email } = req.body;


    console.log(email)

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Create reset link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // Setup Nodemailer
// Change your Node.js/Nodemailer code
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // Use SMTP_HOST
port: parseInt(process.env.SMTP_PORT), // ensure it's a number
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

    // Email options
    const mailOptions = {
      from: `"Support Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `
        <h3>Password Reset</h3>
        <p>You requested to reset your password. Click the link below to reset:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>This link will expire in 24 hours.</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Password reset email sent successfully" });

  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


const NewPass = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: "Token and password are required" });
    }

    // Decode & verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const email = decoded.email;
    

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash new password
   

    // Update user password
    user.password = password;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = {
    signup,
    getAllUsers,
    Loginuser,
    userbyid,
    updateuser,
    Deleteuser,
    resetPass,
    NewPass
}