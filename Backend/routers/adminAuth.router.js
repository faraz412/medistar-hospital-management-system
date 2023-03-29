const adminAuth = require("express").Router();
const { AdminAuth } = require("../models/adminAuth.model");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

adminAuth.get("/", async (req, res) => {
  res.send({ msg: "Admin Page" });
});

adminAuth.post("/signup", async (req, res) => {
  let { first_name, last_name, email, password } = req.body;

  const isPresent = await AdminAuth.findOne({
    where: {
      email: email,
    },
  });
  if (isPresent) {
    return res.status(500).send({
      msg: "Admin already registered",
    });
  }

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(500).send({ msg: "Error in Password hashing" });
      } else {
        await AdminAuth.create({
          first_name,
          last_name,
          email,
          password: hash,
        });
        res.status(201).send({ msg: " Admin Registered Successfully" });
      }
    });
  } catch (error) {
    res.status(500).send({
      msg: "Error",
    });
  }
});

adminAuth.post("/signin", async (req, res) => {
  try {
    let { email, password } = req.body;
    let admin = await AdminAuth.findOne({ where: { email } });
    if (!admin) {
      return res.status(500).send({ msg: "Admin not Found" });
    } else {
      bcrypt.compare(password, admin.password).then(function (result) {
        if (result) {
          var token = jwt.sign({ email: admin.email }, "masai");
          res.send({
            message: "Admin Login Successful",
            token,
            email: admin.email,
          });
        } else {
          res.status(500).send({ mag: "Wrong Password" });
        }
      });
    }
  } catch (e) {
    res.send({ msg: "Error in Login" + e });
  }
});

module.exports = { adminAuth };
