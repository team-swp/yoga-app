const express = require("express");
const router = express.Router();
const Account = require("../models/accounts");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const Auth = require('../middleware/auth')
require("dotenv").config();
const{getAllAccount, getAccountById,verifyUser, Login, register,update } = require('../controllers/Account')

//Getting all
router.get("/accounts", getAllAccount);
//Getting one
router.get("/accounts/:id", getAccountById, (req, res) => {
  res.send(res.account);
});

//login
router.post("/accounts/login" ,verifyUser,Login);

//Creating one
router.post("/accounts/register",register );
//Updating one
router.patch("/accounts/:id",Auth ,getAccountById, update);
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

module.exports = router;
