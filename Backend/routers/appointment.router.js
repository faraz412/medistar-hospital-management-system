

const appointmentRouter = require("express").Router();
const AppointmentModel = require("../models/appointment.model")


appointmentRouter.get("/appointmentRouter", (req, res) => {
  res.send("On AppointmentRouter Route ");
});

appointmentRouter.post("/addDoctor", async (req, res) => {
  let pa = req.body;
  try {
    let doctor = await DoctorModel({
      doctorName,
      email,
      qualifications,
      experience,
      phoneNo,
      city,
      departmentId,
      status,
      image,
    });
    await doctor.save();
    res.status(201).send({ msg: "Doctor has been created", doctor });
  } catch (error) {
    res.status(500).send({ msg: "Error in created doctor" });
  }
});