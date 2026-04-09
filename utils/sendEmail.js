import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// UPDATED FUNCTION
const sendEmail = async ({ to, subject, text, html, attachments }) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text,
      html,
      attachments,
    });
  } catch (error) {
    console.error("Email error:", error);
  }
};

export default sendEmail;