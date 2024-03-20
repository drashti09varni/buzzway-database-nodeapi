const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt'); 


function sendOTPEmail(email, otp) {
    const transporter = nodemailer.createTransport({
      // Configure your email service here
      // Example for Gmail:
      service: 'gmail',
      auth: {
        user: 'mailto:nidhivarniinfoteach@gmail.com',
        pass: 'zgdxgvvoshnmilbi',
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



  module.exports = {sendOTPEmail}