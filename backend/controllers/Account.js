const express = require("express");
const router = express.Router();
const Account = require("../models/accounts");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Auth = require("../middleware/auth");
const { pagingnation } = require("./Pagingnation");
require("dotenv").config();

module.exports.getAllAccount = async (req, res) => {
  try {
    const accounts = await Account.find();
    const temp = [];
    accounts.filter((acc, index) => {
      const { password, ...rest } = Object.assign({}, acc.toJSON());
      temp[index] = rest;
    });
    res.send(temp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAccountByIdAuth = async (req, res, next) => {
  let account;

  try {
    account = await Account.findById(req.account.userId); //lấy req tìm còn có .role
    if (account === null) {
      return res.status(404).json({ message: "Cannot Find Account" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  console.log(account);
  res.account = account; //gửi respone account qa bên kia
  next();
};

module.exports.getAccountPaging = async (req, res) => {
  try {
    const pagingPayload = await pagingnation(Account, "username", req.query);
    res.send(pagingPayload);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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
};

module.exports.verifyUser = async function (req, res, next) {
  try {
    const { email } = req.method == "GET" ? req.query : req.body;
    console.log(email);

    // check the user existance
    let exist = await Account.findOne({ email });
    if (!exist) return res.status(404).send({ error: "Can't find User!" });
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error" });
  }
};

module.exports.delete = async (req, res) => {
  try {
    await Account.findByIdAndDelete(res.account.id);
    res.json({ message: "Deleted Account" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateUserForAdmin = async (req, res) => {
const {_id} = req.body

  const accountUpdate = await Account.findOne({_id:_id})
  console.log(accountUpdate);
  const fieldsToUpdate = [
    "username",
    "role",
    "status",
    "phone",
    "meta_data"
  ];
  for (const field of fieldsToUpdate) {
    if (req.body[field] != null) {
      accountUpdate[field] = req.body[field];
    }
  }
  try {
    const updateAccountNow = await accountUpdate.save();
    res.status(201).send(updateAccountNow);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.update = async (req, res) => {
  if (req.body.username != null) {
    res.account.username = req.body.username;
  }
  if (req.body.password != null) {
    console.log(req.body.password);
    bcrypt.hash(req.body.password, 10).then(async (hashedPassword) => {
      res.account.password = hashedPassword;

      //  Account.findOneAndUpdate({ email: user.email },{ password: hashedPassword },{
      //   run: (async function (err, data) {
      //     if (err) throw err;
      //     req.app.locals.resetSession = false; // reset session
      //     await user.save();
      //     return res.status(201).send({ msg: "Record Updated...!" });
      //   })()
      //  }
      // );
      console.log(res.account, "123");
    });
  }
  if (req.body.phone != null) {
    res.account.phone = req.body.phone;
  }
  if (req.body.avatar != null) {
    res.account.avatar = req.body.avatar;
  }
  if (req.body.meta_data != null) {
    res.account.meta_data = req.body.meta_data;
  }
  try {
    const updateUser = await res.account.save();
    console.log(updateUser, "132233");
    console.log(req.body.password);
    res.status(201).send(updateUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updatePassword = async (req, res) => {
  try {
    bcrypt.hash(req.body.password, 10).then(async (hashedPassword) => {
      res.account.password = hashedPassword;

      const updateUser = await res.account.save();

      res.json(updateUser);
      //  Account.findOneAndUpdate({ email: user.email },{ password: hashedPassword },{
      //   run: (async function (err, data) {
      //     if (err) throw err;
      //     req.app.locals.resetSession = false; // reset session
      //     await user.save();
      //     return res.status(201).send({ msg: "Record Updated...!" });
      //   })()
      //  }
      // );
      console.log(res.account, "123");
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// module.exports.register =  async (req, res) => {
//   try {
//     const { username, email, password, phone,avatar,meta_data } = req.body;
//     if (password) {
//       bcrypt.hash(password, 10)
//       .then((hashedPassword) => {
//         const account = new Account({
//           username: username,
//           email: email,
//           password: hashedPassword,
//           phone: phone||'',
//           avatar: avatar||'',
//           meta_data:meta_data||'' //base 64
//         });
//         // return save result as a response
//         account.save()
//           .then((result) =>
//             res.status(201).send({ msg: "User Register Successfully" })
//           )
//           .catch((error) => res.status(500).send({ error }));
//       });
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// }

module.exports.register = async (req, res) => {
  try {
    const { username, email, password, phone, avatar, meta_data } = req.body;
    if (password) {
      bcrypt.hash(password, 10).then((hashedPassword) => {
        const account = new Account({
          username: username,
          email: email,
          password: hashedPassword,
          phone: phone || "",
          avatar: avatar || "",
          meta_data: meta_data || "", //base 64
        });
        // return save result as a response
        account
          .save()
          .then((result) =>
            res.status(201).send({ msg: "User Register Successfully" })
          )
          .catch((error) => res.status(500).send({ error }));
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    Account.findOne({ email })
      .then((account) => {
        if (account.status) {
          bcrypt
            .compare(password, account.password)
            .then((passwordCheck) => {
              if (!passwordCheck)
                return res.status(500).send({ error: "Don't have Password" });

              // create jwt token
              const token = jwt.sign(
                {
                  userId: account._id,
                  email: account.email,
                  role: account.role,
                },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
              );
              return res.status(200).send({
                msg: "Login Successful...!",
                email: account.email,
                token,
                username: account.username,
                _id: account._id,
                role: account.role,
                avatar: account.avatar,
              });
            })
            .catch((error) => {
              return res.status(500).send({ error: "Password does not Match" });
            });
        } else {
          return res
            .status(500)
            .send({ error: "Your account have been banned" });
        }
      })
      .catch((error) => {
        return res.status(500).send({ error: "Username not Found" });
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

module.exports.updateRoleAccount = async (req, res) => {
  const { _id, role } = req.body;

  try {
    // Find the user by _id
    const account = await Account.findById(_id);
    if (!account) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the role
    account.role = role;

    // Save the updated user
    const updatedAccount = await account.save();

    res.json(updatedAccount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateAccountForStaff = async (req, res) => {
  const { _id } = req.body;

  try {
    // Find the user by _id
    const account = await Account.findById(_id);
    if (!account) {
      return res.status(404).json({ message: "User not found" });
    }
    if (req.body.username != null) {
      account.username = req.body.username;
    }
    if (req.body.password != null) {
      account.password = req.body.password;
    }
    if (req.body.phone != null) {
      account.phone = req.body.phone;
    }
    if (req.body.avatar != null) {
      account.avatar = req.body.avatar;
    }
    if (req.body.meta_data != null) {
      account.meta_data = req.body.meta_data;
    }

    try {
      const updateUser = await account.save();
      res.json(updateUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
