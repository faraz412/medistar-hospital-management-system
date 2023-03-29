const patientRouter = require("express").Router();
const { PatientModel } = require("../models/patient.model");

const cors = require("cors");
patientRouter.use(cors());

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

patientRouter.get("/", async (req, res) => {
  res.send({ msg: "Patient Page" });
});

patientRouter.post("/", async (req, res) => {
  let { patientName, email, phone, city, address, problemDescription } =
    req.body;

  const isPresent = await Patient.findOne({ email });
  if (isPresent) {
    return res.status(500).send({
      msg: "User already registered as Patient",
    });
  }

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(500).send({ msg: "Error" });
      } else {
        await Patient.create({
          patientName,
          email,
          phone,
          city,
          address,
          problemDescription,
        });
        res.status(201).send({ msg: " Patient Registration Successfully" });
      }
    });
  } catch (error) {
    res.status(500).send({
      msg: "Error",
    });
  }
});

module.exports = {
  patientRouter,
};
