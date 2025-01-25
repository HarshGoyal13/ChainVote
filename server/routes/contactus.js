const express = require("express");
const router = express.Router();
const contactEmail = require("../config/nodeMailer");

require("dotenv").config();

const contactUs = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Mail to the receiver
    const mail = {
      from: name,
      to: process.env.RECEIVER_EMAIL,
      subject: "Contact from Voting-Dapp",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send mail to the receiver
    await new Promise((resolve, reject) => {
      contactEmail.sendMail(mail, (error, info) => {
        if (error) return reject(error);
        console.log("Email sent to receiver: " + info.response);
        resolve(info);
      });
    });

    // Mail to the user
    const mailToUser = {
      from: "VotingDapp@gmail.com",
      to: email,
      subject: "Contact Form Query Received - Dapp",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p>Your message has been received. We will get back to you soon.</p>
      `,
    };

    await new Promise((resolve, reject) => {
      contactEmail.sendMail(mailToUser, (error, info) => {
        if (error) return reject(error);
        console.log("Confirmation email sent to user: " + info.response);
        resolve(info);
      });
    });

    // Final Success Response
    res.status(201).send({
      success: true,
      message: "Emails sent successfully to both receiver and user.",
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send({
      success: false,
      message: "Failed to send emails. Please try again later.",
    });
  }
};

router.post("/contactUs", contactUs);

module.exports = router;
