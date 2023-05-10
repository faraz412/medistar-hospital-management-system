const { UserModel } = require("../models/user.model");
const userRouter = require("express").Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const redis = require("redis");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
userRouter.use(cors());
var otp;

userRouter.get("/", async (req, res) => {
  res.send({ msg: "Home Page" });
});

userRouter.post("/emailVerify", async (req, res) => {
  let { first_name, last_name, email, mobile, password } = req.body;
  const isPresent = await UserModel.findOne({ email });
  if (isPresent) {
    return res.status(500).send({
      msg: "You are already registered. Please login!",
    });
  }  
  otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "medistar.hospital301@gmail.com",
      pass: "inuuywvtlrqvugpp",
    },
  });

  const mailOptions = {
    from: "medistar.hospital301@gmail.com",
    to: email,
    subject: "Here is your OTP for Medistar Login",
    html: `  <!DOCTYPE html>
        <html>
          <head>
            <title>Example Email Template</title>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; line-height: 1.5; color: #333; padding: 20px;">
            <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; border-collapse: collapse;">
              <tr>
                <td style="background-color: #0077c0; text-align: center; padding: 10px;">
                  <h1 style="font-size: 28px; color: #fff; margin: 0;">MEDISTAR HOSPITALS</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px;">
                  <h2 style="font-size: 24px; color: #0077c0; margin-top: 0;">Your OTP for Medistar Login : ${otp}</h2>
                  <p style="margin-bottom: 20px;">Thank you for choosing Medistar Services</p>
                  <p style="margin-bottom: 0;">Best regards,</p>
                  <p style="margin-bottom: 20px;">Medistar Hospitals</p>
                </td>
              </tr>
            </table>
          </body>
        </html>`,
  };

  transporter
    .sendMail(mailOptions)
    .then((info) => {
      console.log(info.response);
      res.send({ msg: "Mail has been Send", otp, email });
    })
    .catch((e) => {
      console.log(e);
      res.send(e);
    });
});

userRouter.post("/signup", async (req, res) => {
  let { first_name, last_name, email, mobile, password } = req.body;
  const isPresent = await UserModel.findOne({ email });
  if (isPresent) {
    return res.status(500).send({
      msg: "User already registered",
    });
  }
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(500).send({ msg: "Error" });
      } else {
        const user = new UserModel({
          first_name,
          last_name,
          email,
          mobile,
          password: hash,
        });
        await user.save();
        res.status(201).send({ msg: " Signup Successfull" });
      }
    });
  } catch (error) {
    res.status(500).send({
      msg: "Error",
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  let { payload, password } = req.body;
  try {
    let userEmail = await UserModel.findOne({ email: payload });
    if (!userEmail) {
      let userMobile = await UserModel.findOne({ mobile: payload });
      if (!userMobile) {
        return res.status(500).send({ msg: "User not Found" });
      } else {
        bcrypt.compare(password, userMobile.password).then(function (result) {
          if (result) {
            const token = jwt.sign(
              { userID: userMobile._id, email: userMobile.email },
              "masai"
            );
            res.send({
              message: "Login Successful",
              token,
              name: userMobile.first_name,
              last_name: userMobile.last_name,
              email: userMobile.email,
              mobile: userMobile.mobile,
            });
          } else {
            res.status(500).send({ mag: "Wrong Password" });
          }
        });
      }
    } else {
      bcrypt.compare(password, userEmail.password).then(function (result) {
        if (result) {
          const token = jwt.sign(
            { userID: userEmail._id, email: userEmail.email },
            "masai"
          );
          res.send({
            message: "Success",
            token,
            name: userEmail.first_name,
            last_name: userEmail.last_name,
            email: userEmail.email,
            mobile: userEmail.mobile,
          });
        } else {
          res.status(500).send({ mag: "Wrong Password" });
        }
      });
    }
  } catch (e) {
    res.send({ msg: "Error in Login" });
  }
});

userRouter.use(express.text());
const client = redis.createClient({
  url:"redis://default:jKnThiUqDr7ko7ESOUban2Rawrt7DSu2@redis-19172.c8.us-east-1-2.ec2.cloud.redislabs.com:19172"
});
// client.on("error", (err) => console.log(err, "ERROR in REDIS"));
// client.connect();
try {
  client.connect();
  console.log('Redis Connected Successfully');
} catch (error) {
  client.on("error", (err) => console.log(err, "ERROR in REDIS"));
  console.log('Error in Redis',error);
}

userRouter.get("/logout", async (req, res) => {
  const token = req.headers.authorization;
  // console.log(token)
  if (!token) {
    return res.status(500).send({ msg: "No Token in Headers" });
  }
  try {
    await client.LPUSH("token", token);
    // await client.lpush("token", token)
    res.status(200).send({ msg: "You are Logged out" });
  } catch (error) {
    return res.status(500).send({ msg: "Error in Redis" });
  }
});

module.exports = {
  userRouter,
};
