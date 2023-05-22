const express = require("express");
require("dotenv").config();
const otpGenarate = require("otp-generator");
const Account = require("../models/accounts");
const bcrypt = require("bcrypt");

module.exports.generateOTP = async (req, res) => {
  req.app.locals.OTP = await otpGenarate.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).send({ code: req.app.locals.OTP });
};

module.exports.verifyOTP = async (req, res) => {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null;
    req.app.locals.resetSession = true;
    res.status(201).send({ msg: "Verify Successfully!" });
  } else {
    res.status(400).send({ error: "Invalid OTP" });
  }
};

module.exports.createResetSession = async function (req, res) {
  if (req.app.locals.resetSession) {
    return res.status(201).send({ flag: req.app.locals.resetSession });
  }
  return res.status(440).send({ error: "Session expired!" });
};

module.exports.resetPassword = async function (req, res) {
  try {
    if (!req.app.locals.resetSession)
      return res.status(440).send({ error: "Session expired!" });

    const { email, password } = req.body;
    try {
      Account.find({ email })
        .then((user) => {
          bcrypt
            .hash(password, 10)
            .then(async (hashedPassword) => {
              let check = await Account.updateOne(
                { email },
                { password: hashedPassword }
              );
              if(check) {
                req.app.locals.resetSession = false; // reset session
                return res.status(201).send({ msg: "Record Updated...!" });
              }else{
                return res.status(500).send({
                  error: "Can't change password",
                });
              }
             
              //  Account.findOneAndUpdate({ email: user.email },{ password: hashedPassword },{
              //   run: (async function (err, data) {
              //     if (err) throw err;
              //     req.app.locals.resetSession = false; // reset session
              //     await user.save();
              //     return res.status(201).send({ msg: "Record Updated...!" });
              //   })()
              //  }
              // );
            })
            .catch((e) => {
              return res.status(500).send({
                error: "Enable to hashed password",
              });
            });
        })
        .catch((error) => {
          return res.status(404).send({ error: "Email not Found" });
        });
    } catch (error) {
      return res.status(500).send({ error });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
};
