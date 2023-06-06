const express = require("express");
require("dotenv").config();
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

let nodeConfig = {
  service: "gmail",
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
};

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Heart Beat",
    link: "heartbeat.com",
    logo:"https://png.pngtree.com/template/20191108/ourmid/pngtree-yoga-logo-design-stock-meditation-in-lotus-flower-illustration-image_328924.jpg"
  },
});

module.exports.registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;
  console.log(username,userEmail);
  // body of the email
  var email = {
    body: {
      name: username||'No Name',
      intro:
        text ||
        "Welcome to Yoga HeartBeat! We're very excited to have you join with us.",
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
  var emailBody = MailGenerator.generate(email);

  let message = {
    from: process.env.SMTP_USERNAME,
    to: userEmail,
    subject : subject || "Login Succesful",
    html:emailBody
  };

  transporter.sendMail(message)
    .then(() => {
      return res
        .status(200)
        .send({ msg: "You should receive an email from us." });
    })
    .catch((error) => res.status(500).send({ error }));
};
