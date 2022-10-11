const nodemailer = require("nodemailer");

const sendEmail = (anchorLink) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDINGEMAIL,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.SENDINGEMAIL,
      to: "roze.hope@yahoo.com",
      subject: "trying to reset password",
      html: anchorLink,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error: ", error);
      } else {
        console.log("email sent successfully" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
  } catch (error) {
    res.status(201).json({ status: 401, error });
  }
};

module.exports = sendEmail;
