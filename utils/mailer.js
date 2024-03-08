import nodemailer from "nodemailer";

export const sendMail = (
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
    port: 465,
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
