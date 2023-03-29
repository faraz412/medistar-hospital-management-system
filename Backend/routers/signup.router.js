
const signupRouter = require("express").Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

signupRouter.get("/", async (req, res) => {
  res.send({ msg: "Home Page" });
});

signupRouter.post("/", async (req, res) => {
  let { first_name, last_name, email, mobile, password,role} = req.body;

  const isPresent = await Signup.findOne({
    where: {
      email: email,
    },
  });
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
        await Signup.create({
          first_name,
          last_name,
          email,
          mobile,
          password: hash,
          role
        });
        res.status(201).send({ msg: " Signup Successfully" });
      }
    });
  } catch (error) {
    res.status(500).send({
      msg: "Error",
    });
  }
});

module.exports = {
  signupRouter,
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