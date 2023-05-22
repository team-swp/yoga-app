const express = require("express");
const router = express.Router();
const Account = require("../models/accounts");
const {Auth, localVariables} = require('../middleware/auth')
require("dotenv").config();
const {registerMail} = require('../controllers/Mailer')
const{generateOTP,verifyOTP,createResetSession,resetPassword} = require('../controllers/OTP')
const{getAllAccount,getAccountById,verifyUser, Login, register,update, getAccountByIdAuth } = require('../controllers/Account')
//Getting all
router.get("/accounts", getAllAccount);
//Getting one
router.get("/accounts/:id", getAccountById, (req, res) => {
  const{password,...rest } = Object.assign({}, res.account.toJSON());
  res.send(rest);
});

//login
router.post("/accounts/login" ,verifyUser,Login);

//Creating one
router.post("/accounts/register",register );
//Updating one
router.patch("/accounts",Auth ,getAccountByIdAuth, update);
//Deleting one

router.delete("/accounts/:id", getAccountById,async (req, res) => {
  try {
    await Account.findByIdAndDelete(res.account.id);
    res.json({ message: "Deleted Account" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
);

router.post('/authenticate',verifyUser, (req, res) => res.end()); 
///End Account
//Genarate OTP

router.get("/genarateOTP", verifyUser,localVariables,generateOTP);
router.get('/verifyOTP',verifyUser, verifyOTP)
router.get('/createResetSession',createResetSession)

//resetPassword
router.put('/accounts/resetpassword',verifyUser,resetPassword)

//mail
router.post('/registerMail',registerMail)//sendMail
module.exports = router;

