const admin = require("firebase-admin");
const credentials = require("./credentials.json");
const Account = require("../models/accounts");
const jwt = require("jsonwebtoken");
require("dotenv").config();

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

module.exports.verifyTokenGoogle = async (req, res, next) => {
  try {
    const { authToken } = req.body;
    const authUser = await admin.auth().verifyIdToken(authToken);
    if (authUser) {
      req.authUser = authUser;
      next();
    } else {
      return res.status(401).send("Authenticate fail");
    }
  } catch (error) {
    return res.status(401).send("Authenticate fail");
  }
};

module.exports.CheckExistAccount = async (req, res) => {
  try {
    const { email } = req.authUser;
    const existAccount = await Account.findOne({ email });
    if (existAccount) {
      if (existAccount.status) {
        const token = jwt.sign(
          {
            userId: existAccount._id,
            email: existAccount.email,
            role: existAccount.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );
        return res.status(200).send({
          msg: "Login Successful...!",
          email: existAccount.email,
          token,
          username: existAccount.username,
          _id: existAccount._id,
          role: existAccount.role,
          avatar: existAccount.avatar,
          meta_data: existAccount.meta_data,
          phone: existAccount.phone,
        });
      } else {
        return res.status(500).send({ error: "Your account have been banned" });
      }
    } else {
      const { name, email, phone, picture, meta_data } = req.authUser;
      const account = new Account({
        username: name,
        email: email,
        phone: phone || null,
        avatar: picture || null,
        meta_data: meta_data || "", //base 64
      });

      account
        .save()
        .then((result) =>
          res.status(201).send({ msg: "User Register Successfully" })
        )
        .catch((error) => res.status(500).send({ error }));
    }
  } catch (error) {
    return res.status(401).send("Authenticate fail");
  }
};
// module.exports.verifyTokenGooglettt = async (req, res, next) => {
//   try {
//     const { authToken } = req.body;
//     const authUser = await admin.auth().verifyIdToken(authToken);
//     if (authUser) {
//       const { email } = authUser;
//       const check = await Account.findOne({ email });
//       if (check) {
//         const loginGG = LoginGoogle(authUser);
//         loginGG
//           .then((account) => {
//             return res.status(200).send(account);
//           })
//           .catch(() => {
//             return res.status(401).send("Cannot Login by Google");
//           });
//       } else {
//         const newUser = registerGoogle(authUser);
//         newUser
//           .then(() => {
//             return res.status(200).send(authUser);
//           })
//           .catch(() => {
//             return res.status(401).send(data);
//           });
//       }
//     }
//   } catch (error) {
//     return res.status(401).send("Authenticate fail");
//   }
// };
// const LoginGoogle = async (authUser) => {
//   const { email } = authUser;
//   try {
//     Account.findOne({ email })
//       .then((account) => {
//         if (account.status) {
//           console.log(account);
//           // create jwt token
//           const token = jwt.sign(
//             {
//               userId: account._id,
//               email: account.email,
//               role: account.role,
//             },
//             process.env.JWT_SECRET,
//             { expiresIn: "24h" }
//           );
//           account = Object.assign(account, token);
//           return Promise.resolve(account);
//         } else {
//           return Promise.reject({ error: "Your account have been banned" });
//         }
//       })
//       .catch((error) => {
//         return Promise.reject({ error: "Username not Found" });
//       });
//   } catch (error) {
//     return Promise.reject({ error });
//   }
// };

// registerGoogle = async (authUser) => {
//   try {
//     const { name, email, phone, picture, meta_data } = authUser;
//     const account = new Account({
//       username: name,
//       email: email,
//       phone: phone || null,
//       avatar: picture || null,
//       meta_data: meta_data || "", //base 64
//     });
//     // return save result as a response
//     account
//       .save()
//       .then((result) => Promise.resolve({ msg: "User Register Successfully" }))
//       .catch((error) => Promise.reject("Cannot register"));
//   } catch (error) {
//     return Promise.reject({ message: error.message });
//   }
// };
