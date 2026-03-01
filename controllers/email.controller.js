const nodemailer = require("nodemailer");

const emailusers = async (req, res) => {
  try {
    const usersObject = req.body;


    // Convert {0: {...}, 1: {...}} into [{...}, {...}]
    const users = Object.values(usersObject);

    if (!Array.isArray(users) || users.length === 0) {
      return res.status(400).json({ message: "No users provided" });
    }

    // Configure transporter
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



    for (const { email, status ,company } of users) {
      if (!email || !status) continue;

let subject = "";
let html = "";

if (status === "maybe") {
  subject = "Application Update – Under Review";
  html = `
    <p>Dear Candidate,</p>
    <p>Thank you for applying to our company ${company}. We have received your application and it is currently <b>under review</b>.</p>
    <p>Our team will reach out if we need any further details. We appreciate your patience during this process.</p>
    <p>Best regards,<br/>HR Team ${company}</p>
  `;
} else if (status === "interview") {
  subject = "Congratulations! You’re Invited for an Interview";
  html = `
    <p>Dear Candidate,</p>
    <p>We are pleased to inform you that you have been <b>shortlisted for an interview</b> based on your application.</p>
    <p>Our team will contact you shortly with the date, time, and interview details.</p>
    <p>We look forward to speaking with you!</p>
    <p>Best regards,<br/>HR Team ${company}</p>
  `;
} else if (status === "reject") {
  subject = "Application Status – Not Selected";
  html = `
    <p>Dear Candidate,</p>
    <p>Thank you for taking the time to apply. After careful consideration, we regret to inform you that you have not been <b>selected</b> for this position.</p>
    <p>We truly appreciate your interest in our company and encourage you to apply for future openings.</p>
    <p>Wishing you success in your career ahead.</p>
    <p>Best regards,<br/>HR Team ${company}</p>
  `;
} else {
  continue;
}


    await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: email,
  subject,
  html,  // use HTML instead of text
});


      console.log(`Email sent to ${email} with status ${status}`);
    }

    res.json({ message: "Emails processed successfully" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  emailusers,
};
