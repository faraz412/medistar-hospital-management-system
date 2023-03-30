const { AppointmentModel } = require("../models/appointment.model");
const appointmentRouter = require("express").Router();

appointmentRouter.get("/all", async (req, res) => {
  console.log(req.body.userID);
  try {
    const appointments = await AppointmentModel.find();
    res.status(200).json({
      message: "All appointments retrieved successfully",
      appointments: appointments,
    });
  } catch (error) {
    res.send(error);
  }
});

appointmentRouter.post("/:doctorId", async (req, res) => {
  let doctorId = req.params.doctorId;
  let patientId = req.body.userID;
  let {
    ageOfPatient,
    gender,
    address,
    problemDescription,
    appointmentDate,
    status,
    paymentStatus,
  } = req.body;
  try {
    const appointment = new AppointmentModel({
      patientId,
      doctorId,
      ageOfPatient,
      gender,
      address,
      problemDescription,
      appointmentDate,
      status,
      paymentStatus,
    });
    const createdAppointment = await appointment.save();
    res.status(201).json({
      message: "Appointment has been created",
      appointment: createdAppointment,
    });
  } catch (error) {
    res.status(500).send({ msg: "Error in created appointment" });
    console.log(error);
  }
});

appointmentRouter.delete("/:appointmentId", async (req, res) => {
  let id = req.body.userID;
  try {
    let appointment = await AppointmentModel.findOne({
      patientId: id,
      _id: req.params.appointmentId,
    });
    console.log(appointment);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    await AppointmentModel.findByIdAndDelete({ _id: req.params.appointmentId });
    res
      .status(200)
      .json({ message: "Appointment has been cancelled successfully" });
  } catch (error) {
    res.send({ msg: error.message });
    console.log("error");
  }
});

appointmentRouter.patch("/:appointmentId", async (req, res) => {
    // Get the userId from the request body and the update data from the request body 
  const userId = req.body.userID;
  const payload = req.body;
  try {
        // Find the appointment by appointmentId and patientId
    let appointment = await AppointmentModel.findOne({
      patientId: userId,
      _id: req.params.appointmentId,
    });
    console.log(appointment);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    await AppointmentModel.findByIdAndUpdate(
      { _id: req.params.appointmentId },
      payload
    );
    res.status(200).json({ message: "Appointment updated successfully" });
  } catch (error) {
    res.send({ msg: error.message });
    console.log("error");
  }
});

module.exports = {
  appointmentRouter,
};
