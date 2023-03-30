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

});

module.exports = {
  patientRouter,
};
