import nodemailer from "nodemailer";

const mailConfig = {
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_SECURE === "true",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};

const transporter = nodemailer.createTransport(mailConfig);

// transporter.verify((error, success) => {
//   if (error) {
//     logger.error("Error verifying mail transporter:", error);
//     throw new Error("Mail transporter verification failed");
//   } else {
//     logger.info("Mail transporter is ready to send messages");
//     return transporter;
//   }
// });
