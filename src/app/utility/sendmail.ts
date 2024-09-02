import nodemailer from "nodemailer";
import config from "../../config";

export const sendMail = async (to:string,html:string) => {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.node_dev == "production", // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "sadekali1530@gmail.com",
      pass: "hygm huht cenx umjs",
    },
  });

  await transporter.sendMail({
    from: "sadekali1530@gmail.com", // sender address
    to, // list of receivers
    subject: "password lost the ", // Subject line
    text: "change you password with in 10 min", // plain text body
    html // html body
  });
};
