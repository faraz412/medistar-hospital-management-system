const { UserModel } = require("../models/user.model");
const userRouter = require("express").Router();
userRouter.use(express.json());

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
userRouter.use(cors());

userRouter.get("/", async (req, res) => {
  res.send({ msg: "Home Page" });
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
        const user = await UserModel({
          first_name,
          last_name,
          email,
          mobile,
          password: hash,
        });
        await user.save();
        res.status(201).send({ msg: " Signup Successfully" });
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
    let userEmail = await Signup.findOne({  email: payload  });
    if (!userEmail) {
      let userMobile = await Signup.findOne( { mobile: payload  });
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


module.exports = {
  userRouter,
};

// {
//     "first_name":"Abhishek",
//     "last_name":"Jaiswal",
//     "email":"abhishek@gmail.com",
//     "mobile":"7999765866",
//     "password":"12345"
//   }
// {
//   "first_name":"Deepak",
//   "last_name":"Chaurasia",
//   "email":"deepak@gmail.com",
//   "mobile":"7011111111",
//   "password":"123456"
// }
