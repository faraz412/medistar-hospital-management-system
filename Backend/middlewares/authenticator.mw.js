const express=require('express')
const app=express();
const jwt = require("jsonwebtoken");

require("dotenv").config();

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.send({ msg: "Enter Token First" });
  } else {
    try {
      const blacklistdata = await client.LRANGE("token", 0, -1);
      if (blacklistdata.includes(token)) {
        return res.send({ msg: "You are Blackilsted" });
      }
      const decoded = jwt.verify(token, process.env.key);
      if (decoded) {
        const userID = decoded.userID;
        req.body.userID = userID;
        next();
      } else {
        res.send({ msg: "Wrong Token" });
      }
    } catch (e) {
      res.send({ msg: "Token Expired" });
    }
  }
};
module.exports = {
  authenticate
};
