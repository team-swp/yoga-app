const express = require("express");
const router = express.Router();
const Account = require("../models/accounts");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const Auth = require('../middleware/auth')
require("dotenv").config();

module.exports.getAllAccount = async (req, res) => {
  try {
    const accounts = await Account.find();
    const temp = [];
    accounts.filter((acc,index)=>{
      const{password,...rest } = Object.assign({}, acc.toJSON());
      temp[index]= rest
    })
    res.send(temp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports.getAccountByIdAuth = async (req, res, next) => {
  let account;
  console.log('222',req);
  try {
    account = await Account.findById(req.account.userId);
    if (account === null) {
      return res.status(404).json({ message: "Cannot Find Account" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.account = account;
  next();
}

module.exports.getAccountById = async (req, res, next) => {
  let account;
  try {
    account = await Account.findById(req.params.id);
    if (account === null) {
      return res.status(404).json({ message: "Cannot Find Account" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.account = account;
  next();
}

module.exports.verifyUser = async function (req, res, next){
  try {
      
      const { email } = req.method == "GET" ? req.query : req.body;

      // check the user existance
      let exist = await Account.findOne({ email });
      if(!exist) return res.status(404).send({ error : "Can't find User!"});
      next();

  } catch (error) {
      return res.status(404).send({ error: "Authentication Error"});
  }
}

module.exports.delete = async (req, res) => {
  try {
    await Account.findByIdAndDelete(res.account.id);
    res.json({ message: "Deleted Account" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports.update = async (req, res) => {
  console.log(req.account);
  if (req.body.username != null) {
    res.account.username = req.body.username;
  }
  if (req.body.password != null) {
    res.account.password = req.body.password;
  }
  if (req.body.phone != null) {
    res.account.phone = req.body.phone;
  }
  if (req.body.role != null) {
    res.account.role = req.body.role;
  }
  if (req.body.avatar != null) {
    res.account.avatar = req.body.avatar;
  }
  if (req.body.meta_data != null) {
    res.account.meta_data = req.body.meta_data;
  }

  try {
    const updateUser = await res.account.save();
    res.json(updateUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports.register =  async (req, res) => {
  const { username, email, password, phone, avatar } = req.body;
  try {
    if (password) {
      bcrypt.hash(password, 10)
      .then((hashedPassword) => {
        const account = new Account({
          username: username,
          email: email,
          password: hashedPassword,
          phone: phone||'',
          avatar: avatar||'', //base 64
        });
        // return save result as a response
        account.save()
          .then((result) =>
            res.status(201).send({ msg: "User Register Successfully" })
          )
          .catch((error) => res.status(500).send({ error }));
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports.Login =  async (req, res) => {
  const { email, password } = req.body;
  try {
    Account.findOne({ email })
      .then((account) => {
        bcrypt.compare(password,account.password)
          .then((passwordCheck) => {
            if (!passwordCheck)
              return res.status(500).send({ error: "Don't have Password" });

            // create jwt token
            const token = jwt.sign(
              {
                userId: account._id,
                email: account.email,
              },
              process.env.JWT_SECRET,
              { expiresIn: "24h" }
            );
          
            return res.status(200).send({
              msg: "Login Successful...!",
              email: account.email,
              token,
              username:account.username,
              _id:account._id
            });
          })
          .catch((error) => {
            return res.status(500).send({ error: "Password does not Match" });
          });
      })
      .catch((error) => {
        return res.status(500).send({ error: "Username not Found" });
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
}