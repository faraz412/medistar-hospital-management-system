const { AppointmentModel } = require("../models/appointment.model");
const { DoctorModel } = require("../models/doctor.model");
const { UserModel } = require("../models/user.model");
require("dotenv").config();

const appointmentRouter = require("express").Router();

//!! User Side OPERATION------------------------------>
//  Get All Appointments for a Particular Patient
appointmentRouter.get("/allApp", async (req, res) => {
  let id = req.body.userID;
  console.log(id);
  try {
    const appointments = await AppointmentModel.find({ patientId: id });
    res.status(200).json({
      message: "All appointments By A Pateint retrieved successfully",
      appointments: appointments,
    });
  } catch (error) {
    res
      .status(501)
      .send({ msg: "Error in Getting All Appointments By a Patient", e });
  }
});

// Details according to Appointment ID
appointmentRouter.get("/getApp/:appointmentId", async (req, res) => {
  try {
    const appointment = await AppointmentModel.find({
      _id: req.params.appointmentId,
    });
    res.status(200).json({
      message: "Particular Appointments Details",
      appointment: appointment,
    });
  } catch (error) {
    res
      .status(501)
      .send({ msg: "Error in Getting All Appointments By a Patient", e });
  }
});

// Create a new appointment By Selecting a Doctor by User
appointmentRouter.post("/create/:doctorId", async (req, res) => {
  let doctorId = req.params.doctorId;
  let patientId = req.body.userID;
  let docName = await DoctorModel.findOne({ doctorId });
  let patientName = await UserModel.findOne({ patientId });
  let docFirstName = docName.doctorName;
  let patientFirstName = patientName.first_name;
  let patientEmail = patientName.email;
  console.log(docFirstName,patientFirstName,patientEmail)
  let { ageOfPatient, gender, address, problemDescription, appointmentDate } =
    req.body;
  try {
    const appointment = new AppointmentModel({
      patientId,
      doctorId,
      patientFirstName,
      docFirstName,
      ageOfPatient,
      gender,
      address,
      problemDescription,
      appointmentDate,
    });
    const createdAppointment = await appointment.save();
    // !!-NODE MAILER-//
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: "abhi.jaiswal1494@gmail.com",
        pass: process.env.nodeMailer,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: "abhi.jaiswal1494@gmail.com",
      to: `${patientEmail}`,
      subject: "LOGIN Successfull",
      text: `${createdAppointment} `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Error Sending Mail" });
      } else {
        console.log("mail send");
        // return res
        //   .status(200)
        //   .json({ message: "OTP Send", otp: otp, email: email });
          res.status(201).json({
            message: "Appointment has been created , Check Your Mail",
          });
        }
    });

  } catch (error) {
    res.status(500).send({ msg: "Error in created appointment" });
    console.log(error);
  }
});

// Cancel Appointment by user/Patient
appointmentRouter.delete("/cancel/:appointmentId", async (req, res) => {
  let id = req.body.userID;
  try {
    let appointment = await AppointmentModel.findOne({
      patientId: id,
      _id: req.params.appointmentId,
    });
    // console.log(appointment);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    await AppointmentModel.findByIdAndDelete({ _id: req.params.appointmentId });
    res.status(200).json({
      message: "Appointment has been Cancelled By Patient successfully",
    });
  } catch (error) {
    res.send({ msg: "Error in Deleting the Appointment By Patient", error });
  }
});

// Reschedule a appointment by Patient
appointmentRouter.patch("/reschedule/:appointmentId", async (req, res) => {
  const userId = req.body.userID;
  const payload = req.body;
  try {
    // Find the appointment by appointmentId and patientId
    let appointment = await AppointmentModel.findOne({
      patientId: userId,
      _id: req.params.appointmentId,
    });
    // console.log(appointment);
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

//!! ADMIN SIDE OPERATIONS------------------------------>
//  Get All Appointments
appointmentRouter.get("/all", async (req, res) => {
  try {
    const appointments = await AppointmentModel.find();
    res.status(200).json({
      message: "All appointments retrieved successfully",
      appointments: appointments,
    });
  } catch (error) {
    res.status(501).send({ msg: "Error in Getting All Appointments", e });
  }
});

//  Get All Pending Appointments
appointmentRouter.get("/allPending", async (req, res) => {
  try {
    const appointments = await AppointmentModel.find({ status: false });
    res.status(200).json({
      message: "All Pending appointments",
      appointments: appointments,
    });
  } catch (error) {
    res.status(501).send({ msg: "Error in Getting Pending Appointments", e });
  }
});

// Reject Appointment by ADMIN
appointmentRouter.delete("/reject/:appointmentId", async (req, res) => {
  try {
    let appointment = await AppointmentModel.findOne({
      _id: req.params.appointmentId,
    });
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    await AppointmentModel.findByIdAndDelete({ _id: req.params.appointmentId });
    res.status(200).json({
      message: "Appointment has been Cancelled By Patient successfully",
    });
  } catch (error) {
    res.send({ msg: "Error in Deleting the Appointment By Patient", error });
  }
});

// Approve Appointment by ADMIN
appointmentRouter.patch("/approve/:appointmentId", async (req, res) => {
  try {
    let appointment = await AppointmentModel.findOne({
      _id: req.params.appointmentId,
    });
    console.log(appointment);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    await AppointmentModel.findByIdAndUpdate(req.params.appointmentId, {
      status: true,
    });
    res.status(200).json({
      message: "Appointment has been Approved",
    });
  } catch (error) {
    res.send({ msg: "Error in Deleting the Appointment By Patient", error });
  }
});

module.exports = {
  appointmentRouter,
};
