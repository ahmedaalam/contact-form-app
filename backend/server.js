const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Send Message API
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // important
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: "Contact Form <" + process.env.EMAIL_USER + ">",
      to: email,
      subject: "New Message from " + name,
      text: message,
    });

    res.json({
      success: true,
      msg: "Message sent successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Error sending message",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Add this above your /contact route
app.get("/", (req, res) => {
  res.send("Backend is running");
});
