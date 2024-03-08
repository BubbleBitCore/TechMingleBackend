import nodemailer from "nodemailer";

export const sendMail = async (
  from,
  pass,
  recipient,
  subject,
  message,
  user_name,
  date = Date.now
) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true, // Use a secure connection (TLS)
    port: process.env.SMTP_PORT,
    auth: {
      user: from,
      pass: pass,
    },
  });

  let mailOptions = {
    from: from,
    to: recipient,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response + date);
    }
  });
};
