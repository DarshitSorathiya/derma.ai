import nodemailer from "nodemailer";
import { asyncHandler } from "./asyncHandler.js";

const sendEmail = asyncHandler(async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    text,
  });
});

export { sendEmail };
