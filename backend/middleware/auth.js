const jwt = require('jsonwebtoken');
const accounts = require('../models/accounts');
require("dotenv").config();

/** auth middleware */
 module.exports.Auth = async function (req, res, next){
    try {
        console.log('1111',req);
        // access authorize header to validate request
        const token = req.headers.authorization.split(" ")[1];
        // retrive the user details fo the logged in user
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.account = decodedToken;
        next()

    } catch (error) {
        res.status(401).json({ error : "Authentication Failed!"})
    }
}

module.exports.localVariables= function (req, res, next){
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
    next()
}

