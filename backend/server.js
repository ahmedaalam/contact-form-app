const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

//Send Message API
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: "YOUR_EMAIL@gmail.com",
      to: email, // 👈 user entered email
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
  console.log("Server running on port 5000" + PORT);
});
