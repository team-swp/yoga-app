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
    logo: "https://png.pngtree.com/template/20191108/ourmid/pngtree-yoga-logo-design-stock-meditation-in-lotus-flower-illustration-image_328924.jpg",
  },
});

module.exports.registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;
  // body of the email
  var email = {
    body: {
      name: username || "No Name",
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
    subject: subject || "Login Succesful",
    html: emailBody,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .send({ msg: "You should receive an email from us." });
    })
    .catch((error) => res.status(500).send({ error }));
};

module.exports.MailExpire3DaysBefore = async (username, userEmail) => {
  try {
    // Configure email content
  const email = {
    body: {
      name: username || "Yoga Member",
      intro:
        "We hope this email finds you well. We wanted to inform you that your premium package is set to expire in just 3 days. To ensure uninterrupted access to all the exclusive features and benefits of our premium service, we kindly request you to take action before the expiration date. Please note that we will maintain your account for an additional 3 days from the expiration date.",
      outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  // Generate email body using MailGenerator library
  const emailBody = MailGenerator.generate(email);

  // Configure email message
  const message = {
    from: process.env.SMTP_USERNAME,
    to: userEmail,
    subject: "Premium Package Expiring in 3 Days",
    html: emailBody,
  };

  // Send email using the configured transporter
    await transporter.sendMail(message);

    console.log("Email sent successfully");
  } catch (error) {
    console.error("An error occurred while sending email:", error);
  }
};


module.exports.MailExpired = async (username, userEmail) => {
  try {
    // Configure email content
  const email = {
    body: {
      name: username || "Yoga Member",
      intro:"We hope this email finds you well. We wanted to inform you that your premium package and membership have expired. To continue enjoying all the exclusive features and benefits of our premium service, we kindly request you to renew your subscription. Please take action as soon as possible to avoid any interruption in your access. If you have any questions or need assistance, please feel free to reach out to us. Thank you for being a valued member.",
        outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  // Generate email body using MailGenerator library
  const emailBody = MailGenerator.generate(email);

  // Configure email message
  const message = {
    from: process.env.SMTP_USERNAME,
    to: userEmail,
    subject: "Premium Package Is Expired",
    html: emailBody,
  };

  // Send email using the configured transporter
    await transporter.sendMail(message);

    console.log("Email sent successfully");
  } catch (error) {
    console.error("An error occurred while sending email:", error);
  }
};
