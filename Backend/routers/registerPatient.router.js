const { Patient } = require("../models/patient.model");
const patientRegisterationRouter = require("express").Router();

// - patientId
// - name
// - email
// - phone
// - city
// - Address
// - problemDescription
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

patientRegisterationRouter.get("/", async (req, res) => {
  res.send({ msg: "Home Page" });
});

patientRegisterationRouter.post("/", async (req, res) => {
  let { name, email, phone, city, address, problemDescription } = req.body;

  const isPresent = await Patient.findOne({
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
        await Patient.create({
          name,
          email,
          phone,
          city,
          address,
          problemDescription,
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
  patientRegisterationRouter,
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
