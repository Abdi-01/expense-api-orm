import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_SENDER,
    pass: process.env.MAIL_APP_PASSWORD,
  },
});

export const sendEmail = async (
  emailTo: string,
  subject: string,
  content: string
) => {
  try {
    await transporter.sendMail({
      from: process.env.MAIL_SENDER,
      to: emailTo,
      subject,
      html: content,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
