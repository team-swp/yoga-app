const express = require("express");
const router = express.Router();
const Account = require("../models/accounts");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Auth = require("../middleware/auth");
const { pagingnation } = require("./Pagingnation");
const { startSession } = require("mongoose");
require("dotenv").config();

module.exports.getAllAccount = async (req, res) => {
  try {
    const accounts = await Account.find({ role: { $ne: "admin" } });
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
  const { _id } = req.body;

  const accountUpdate = await Account.findOne({ _id: _id });
  console.log(accountUpdate);
  const fieldsToUpdate = ["username", "role", "status", "phone", "meta_data"];
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
            .status(404)
            .send({ message: "Your account have been banned" });
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

module.exports.updateHolidayMember = async (req, res, next) => {
  const session = await startSession();
  session.startTransaction();
  try {
    const arrUpdateMem = [];
    const { holiday,startDate } = req.body;
    //them ngày để bắt đầu chạy function
    const members = await Account.find({
      meta_data: { $regex: `"isMember":true`, $options: "i" },
    }).session(session);
    const lengthMem = members.length;
    if (lengthMem > 0) {
      //[]
      members.forEach((member) => {
        let metaData = JSON.parse(member.meta_data);
        console.log(metaData.startDateMember);
        const startDateMember = metaData.startDateMember
          ? new Date(metaData.startDateMember)
          : new Date();
        startDateMember.setDate(startDateMember.getDate() + parseInt(holiday));
        Object.assign(metaData, { startDateMember });
        Object.assign(member, { meta_data: JSON.stringify(metaData) });
        arrUpdateMem.push(member);
      });

      for(let i =0 ; i<lengthMem;i++){
        await arrUpdateMem[i].save();
      }
    await session.commitTransaction();
     return res.status(200).send(arrUpdateMem);
    }
  } catch (error) {
    await session.abortTransaction();
    res.status(400).send({ error: error.message });
  } finally {
    session.endSession(); // End the session
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
module.exports.charDataAccount = async (req, res) => {
  try {
    //output {amount:value,percentage:% }
    const today = new Date();
    const yearNow = today.getFullYear();
    const month = today.getMonth() + 1;
    const startDate = new Date(`${yearNow}-${month}-01`);
    const endDate = new Date(`${yearNow}-${month}-31`);
    endDate.setHours(23, 59, 59, 999);

    const startDateLast = new Date(`${yearNow}-${month - 1}-01`);
    const endDateLast = new Date(`${yearNow}-${month - 1}-31`);
    endDateLast.setHours(23, 59, 59, 999);

    const userByMonth = Account.find({
      createdAt: { $gte: startDate, $lt: endDate },
    });

    const userByLastMonth = Account.find({
      createdAt: { $gte: startDateLast, $lt: endDateLast },
    });
    let [DataMonth, DataLastMonth] = await Promise.all([
      userByMonth,
      userByLastMonth,
    ]);
    const currentMonthCount = DataMonth.length;
    const previousMonthCount = DataLastMonth.length;
    let percentage;
    if (currentMonthCount - previousMonthCount < 0) {
      percentage = (
        (Math.abs(currentMonthCount - previousMonthCount) /
          (previousMonthCount === 0 ? currentMonthCount : previousMonthCount)) *
        100
      )
        .toFixed(2)
        .toString();
      percentage = "-" + percentage;
    } else {
      percentage = (
        (Math.abs(currentMonthCount - previousMonthCount) /
          (previousMonthCount === 0 ? currentMonthCount : previousMonthCount)) *
        100
      )
        .toFixed(2)
        .toString();
      percentage = "+" + percentage;
    }
    ///
    const membersByMonth = Account.find({
      createdAt: { $gte: startDate, $lt: endDate },
      meta_data: { $regex: `"isMember":true`, $options: "i" },
    });
    const membersByLastMonth = Account.find({
      createdAt: { $gte: startDateLast, $lt: endDateLast },
      meta_data: { $regex: `"isMember":true`, $options: "i" },
    });
    let [DataMonthMembers, DataLastMonthMembers] = await Promise.all([
      membersByMonth,
      membersByLastMonth,
    ]);

    const currentMonthCountMembers = DataMonthMembers.length;
    const previousMonthCountMembers = DataLastMonthMembers.length;
    console.log(currentMonthCountMembers, previousMonthCountMembers);
    let percentage2;
    if (currentMonthCountMembers - previousMonthCountMembers < 0) {
      percentage2 = (
        (Math.abs(currentMonthCountMembers - previousMonthCountMembers) /
          previousMonthCountMembers) *
        100
      )
        .toFixed(2)
        .toString();
      percentage2 = "-" + percentage2;
    } else {
      percentage2 = (
        (Math.abs(currentMonthCountMembers - previousMonthCountMembers) /
          previousMonthCountMembers) *
        100
      )
        .toFixed(2)
        .toString();
      percentage2 = "+" + percentage2;
    }

    res.status(201).send([
      { amount: DataMonth.length, percentage: percentage + "%" },
      { amount: currentMonthCountMembers, percentage: percentage2 + "%" },
    ]);
  } catch (error) {
    console.log(error);
    return res.status(404).send({ error });
  }
};

module.exports.charDataSparkLine = async (req, res) => {
  try {
    const { month, year } = req.body;
    const today = new Date();
    const yearNow = today.getFullYear();
    const startDate = new Date(`${year || yearNow}-${month || "01"}-01`);
    const endDate = new Date(`${year || yearNow}-${month || "12"}-31`);
    endDate.setHours(23, 59, 59, 999);
    const membersByYear = await Account.find({
      createdAt: { $gte: startDate, $lt: endDate },
      meta_data: { $regex: `"isMember":true`, $options: "i" },
    });

    let arrJan = { x: 1, yval: 0 };
    let arrFeb = { x: 2, yval: 0 };
    let arrMar = { x: 3, yval: 0 };
    let arrApr = { x: 4, yval: 0 };
    let arrMay = { x: 5, yval: 0 };
    let arrJun = { x: 6, yval: 0 };
    let arrJul = { x: 7, yval: 0 };
    let arrAug = { x: 8, yval: 0 };
    let arrSep = { x: 9, yval: 0 };
    let arrOct = { x: 10, yval: 0 };
    let arrNov = { x: 11, yval: 0 };
    let arrDec = { x: 12, yval: 0 };

    const result = membersByYear.map((obj) => {
      let date = new Date(obj.createdAt);
      let month = date.getMonth() + 1;
      switch (month) {
        case 1:
          Object.assign(arrJan, {
            x: 1,
            yval: arrJan.yval + 1,
          });
          break;
        case 2:
          Object.assign(arrFeb, {
            x: 2,
            yval: 1 + arrFeb.yval,
          });
          break;
        case 3:
          Object.assign(arrMar, {
            x: 3,
            yval: 1 + arrMar.yval,
          });
          break;
        case 4:
          Object.assign(arrApr, {
            x: 4,
            yval: 1 + arrApr.yval,
          });
          break;
        case 5:
          Object.assign(arrMay, {
            x: 5,
            yval: 1 + arrMay.yval,
          });
          break;
        case 6:
          Object.assign(arrJun, {
            x: 6,
            yval: 1 + arrJun.yval,
          });
          break;
        case 7:
          Object.assign(arrJul, {
            x: 7,
            yval: 1 + arrJul.yval,
          });
          break;
        case 8:
          Object.assign(arrAug, {
            x: 8,
            yval: 1 + arrAug.yval,
          });
          break;
        case 9:
          Object.assign(arrSep, {
            x: 9,
            yval: 1 + arrSep.yval,
          });
          break;
        case 10:
          Object.assign(arrOct, {
            x: 10,
            yval: 1 + arrOct.yval,
          });
          break;
        case 11:
          Object.assign(arrNov, {
            x: 11,
            yval: 1 + arrNov.yval,
          });
          break;
        case 12:
          Object.assign(arrDec, {
            x: 12,
            yval: 1 + arrDec.yval,
          });
          break;
        default:
          break;
      }
    });

    const chartData = [
      arrJan,
      arrFeb,
      arrMar,
      arrApr,
      arrMay,
      arrJun,
      arrJul,
      arrAug,
      arrSep,
      arrOct,
      arrNov,
      arrDec,
    ];
    res.status(201).send({ data: chartData, total: membersByYear.length });
  } catch (error) {
    return res.status(404).send({ error });
  }
};
