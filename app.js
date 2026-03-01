const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file
const { connectDB } = require('./lib/dbconnection'); // Uncomment if you have a database connection
const app = express();
const port = 8000;

app.use(cors());

app.use('/uploads', express.static('uploads'));

app.use(express.json());


const userRoutes = require('./routes/user.route.js');
const applyJobRoutes = require('./routes/applyjob.route.js');
const JobsRoutes = require ("./routes/jobs.route.js")
const messageRoutes = require("./routes/message.route.js");
const cvRoutes = require('./routes/cv.route.js');
const emailRoutes = require("./routes/email.route.js")
app.use('/api/users', userRoutes); // Use user routes under /api/users path
app.use('/api/applyjob',applyJobRoutes); // Use apply job routes under /api/applyjob path
app.use('/api/jobs',JobsRoutes)
app.use("/api/messages", messageRoutes); // Use message routes under /api/messages path
app.use('/api/cv', cvRoutes); // Use CV routes under /api/cv path
app.use('/api/send',emailRoutes)
// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!')});

app.listen(port, () => { 
  connectDB(); // Uncomment if you have a database connection
  console.log(`Server is running on http://localhost:${port}`);
});