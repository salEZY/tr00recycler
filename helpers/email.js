const nodeMailer = require("nodemailer");

const createMailOptions = (email, type, info) => {
  const mailOptions = {
    from: "tr00recycler@gmail.com",
    to: email,
  };
  switch (type) {
    case "register":
      return {
        ...mailOptions,
        subject: "Registration conformation!",
        html:
          '<h1 style="color: #026928;margin-bottom: 20px;font-size: 3rem;">Tr00Recycler</h1><p>Welcome to True Recycler! Now you can start adding missing recyclable materials!</p>',
      };
    case "reset":
      return {
        ...mailOptions,
        subject: "Password change",
        html: `<h1 style="color: #026928;margin-bottom: 20px;font-size: 3rem;">Tr00Recycler</h1><p>Your new password is <span style="font-size: 18px;font-weight: bold;">${info}</span>. It is highly advised to change it as soon as possible</p>`,
      };
    default:
      return null;
  }
};

const sendEmail = (email, type, info) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "tr00recycler@gmail.com",
      pass: `${process.env.EMAIL_PASS}`,
    },
  });
  const mailOptions = createMailOptions(email, type, info);
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return console.error(err.message);
    else {
      console.log(`Email is sent! ${info.response}`);
    }
  });
};

module.exports = {
  sendEmail,
};
