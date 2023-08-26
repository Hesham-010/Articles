const nodemailer = require("nodemailer");

const sendEmail = (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER_NAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const option = {
    from: "Articles",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  transporter.sendMail(option);
};

module.exports = sendEmail;
