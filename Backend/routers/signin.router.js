const loginRouter = require("express").Router();
const { Signup } = require("../models/signup.model");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

loginRouter.get("/", async (req, res) => {
  res.send({ msg: "login Route" });
});

loginRouter.post("/", async (req, res) => {
  try {
    let { payload, password } = req.body;
    let userEmail = await Signup.findOne({ where: { email: payload } });
    if (!userEmail) {
      let userMobile = await Signup.findOne({ where: { mobile: payload } });
      if (!userMobile) {
        return res.status(500).send({ msg: "User not Found" });
      } else {
        bcrypt.compare(password, userMobile.password).then(function (result) {
          if (result) {
            var token = jwt.sign(
              { mobile: userMobile.mobile, email: userMobile.email },
              "masai"
            );
            res.send({
              message: "Success",
              token,
              name: userMobile.first_name,
              last_name: userMobile.last_name,
              email: userMobile.email,

            });
          } else {
            res.status(500).send({ mag: "Wrong Password" });
          }
        });
      }
    } else {
      bcrypt.compare(password, userEmail.password).then(function (result) {
        if (result) {
          var token = jwt.sign(
            { email: userEmail.email, mobile: userEmail.mobile },
            "masai"
          );
          res.send({
            message: "Success",
            token,
            name: userEmail.first_name,
            last_name: userEmail.last_name,
            email: userEmail.email,

          });
        } else {
          res.status(500).send({ mag: "Wrong Password" });
        }
      });
    }
  } catch (e) {
    res.send({ msg: "Error in Login 33" + e });
  }
});

module.exports = { loginRouter };

// {
//     "first_name":"Abhishek",
//     "last_name":"Jaiswal",
//     "email":"abhishek@gmail.com",
//     "mobile":"7999765866",
//     "password":"12345"
//   }
