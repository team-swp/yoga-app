const jwt = require("jsonwebtoken");
const accounts = require("../models/accounts");
require("dotenv").config();

//admin
//staff
//instructor
//user
/** auth middleware */
module.exports.Auth = async function (req, res, next) {
  try {
    // access authorize header to validate request
    const token = req.headers.authorization.split(" ")[1];
    // retrive the user details fo the logged in user
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTimestamp) {
      throw new Error("Token has expired");
    }
    req.account = decodedToken; //chuyển qa cho thg tiếp theo
      next();
  } catch (error) {
    res.status(401).send({ error: "Authentication Failed!" });
  }
};

module.exports.AuthStaff = async function (req, res, next) {
  try {
    // access authorize header to validate request
    const token = req.headers.authorization.split(" ")[1];
    // retrive the user details fo the logged in user
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.role === "staff") {
      req.account = decodedToken; //chuyển qa cho thg tiếp theo
    } else {
      res.status(401).json({ error: "Authentication Failed!" });
      return;
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication Failed!" });
  }
};

module.exports.AuthAdmin = async function (req, res, next) {
  try {
    // access authorize header to validate request
    const token = req.headers.authorization.split(" ")[1];
    // retrive the user details fo the logged in user
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.role === "admin") {
      req.account = decodedToken; //chuyển qa cho thg tiếp theo
    } else {
      res.status(401).json({ error: "Authentication Failed!" });
      return;
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication Failed!" });
  }
};

module.exports.localVariables = function (req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
};
