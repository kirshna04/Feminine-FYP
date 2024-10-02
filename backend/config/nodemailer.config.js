const nodemailer = require("nodemailer");

const send_email = (email, subject, h1, msg) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "samtabatra4@gmail.com",
        pass: "nfhfsbqfawcyyoad",
      },
    });
    const mailOptions = {
      from: "samtabatra4@gmail.com",
      to: email,
      subject: subject,
      html: `
        <h1>${h1}</h1>
        <h3>${msg}</h3>
        `,
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { send_email };
