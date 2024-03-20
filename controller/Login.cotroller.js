const _ = require('lodash');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Users = require('../models/Login.modal')
const mongoose = require('mongoose');
const multer = require('multer');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

// Function to send OTP via email using nodemailer
function sendOTPEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    // Configure your email service here
    // Example for Gmail:
    service: 'gmail',
    auth: {
      user: 'mailto:varniinfosoft@gmail.com',
      pass: 'jbnxzraowstvsuji',
    },
  });

  const mailOptions = {
    // from: 'mailto:varniinfosoft@gmail.com',
    from: `"hiya fashion👻" <${email}>`,
    to: email,
    subject: 'OTP Login',
    text: `Your OTP for login is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}



exports.loginUser = async (req, res) => {
  const { email } = req.body;

  try {
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOTP = await bcrypt.hash(generatedOTP, 10);

    const otpCreatedAt = new Date(); // Save the timestamp when OTP is created

    await Users.findOneAndUpdate(
      { email },
      { $set: { email, otp: hashedOTP, otpCreatedAt } },
      { upsert: true, new: true }
    );

    sendOTPEmail(email, generatedOTP);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.verifyotp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the user in the database based on the email
    const user = await Users.findOne({ email });  

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the OTP has expired (1 minute expiration time)
    const expirationTime = 1 * 60 * 1000; // 1 minute in milliseconds
    const currentTime = new Date();

    // Ensure that otpCreatedAt is a valid timestamp
    if (!user.otpCreatedAt || !(user.otpCreatedAt instanceof Date)) {
      return res.status(500).json({ error: 'Invalid OTP creation time' });
    }

    const otpCreationTime = new Date(user.otpCreatedAt);
    const elapsedTime = currentTime - otpCreationTime;

    // Check if the elapsed time since OTP creation is within the expiration time
    if (elapsedTime > expirationTime) {
      // OTP has expired
      return res.status(401).json({ error: 'OTP has expired' });
    }

    // Compare entered OTP with the hashed OTP from the database
    const isOTPValid = await bcrypt.compare(otp, user.otp);

    if (isOTPValid) {
      // Return a success message if OTP is valid
      return res.status(200).json({ message: 'OTP verification successful' });
    } else {
      // Return an error message if OTP is invalid
      return res.status(401).json({ error: 'Invalid OTP' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
