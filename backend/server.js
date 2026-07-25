const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Resend } = require("resend");

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running ");
});

// Send Message API
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev", // default sender (works instantly)
      to: email, // receiver email
      subject: `New Message from ${name}`,
      text: message,
    });

    console.log("Email sent:", data);

    res.json({
      success: true,
      msg: "Message sent successfully",
    });
  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).json({
      success: false,
      msg: "Error sending message",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
