const { authenticate } = require("../middlewares/authenticator.mw");
const { AppointmentModel } = require("../models/appointment.model");
const { DoctorModel } = require("../models/doctor.model");
const { UserModel } = require("../models/user.model");
require("dotenv").config();
const nodemailer = require("nodemailer");

const appointmentRouter = require("express").Router();

//!! User Side OPERATION------------------------------>
//  Get All Appointments for a Particular Patient
appointmentRouter.get("/allApp", authenticate, async (req, res) => {
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
appointmentRouter.get(
  "/getApp/:appointmentId",
  authenticate,
  async (req, res) => {
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
  }
);

// !! Check Slots
appointmentRouter.post("/checkSlot/:doctorId", async (req, res) => {
  let { date, slotTime } = req.body;
  let doctorId = req.params.doctorId;
  console.log(date,slotTime)
  try {
    let docName = await DoctorModel.findOne({ _id: doctorId });
    if (!docName) {
      return res.status(404).send({ msg: `Doctor donot exists` });
    }
    if (!docName.isAvailable) {
      return res.send({
        msg: `${docName.doctorName} is not available currently`,
      });
    }
    await DoctorModel.findOne({ _id: doctorId })
      .select(date)
      .exec()
      .then((result) => {
        result.APRIL_04
          ? res.send(checkSlot(result.APRIL_04, slotTime))
          : result.APRIL_05
          ? res.send(checkSlot(result.APRIL_05, slotTime))
          : result.APRIL_06
          ? res.send(checkSlot(result.APRIL_06, slotTime))
          : res.send({
              msg: "Selected Date Not Available, Please Select another Date",
            });
      })
      .catch((error) => {
        console.log(error);
        res.send({
          msg: "Selected Date Not Available, Please Select another Date",
        });
      });
  } catch (error) {
    res.send({ msg: "Error in Check Slot Router" });
  }
});

// !! Appointment Book
appointmentRouter.post("/create/:doctorId", authenticate, async (req, res) => {
  let doctorId = req.params.doctorId;
  let patientId = req.body.userID;
  let patientEmail = req.body.email;
  try {
    let docName = await DoctorModel.findOne({ _id: doctorId });
    let patientName = await UserModel.findOne({ _id: patientId });
    if (!docName) {
      return res.status(404).send({ msg: `Doctor donot exists` });
    }
    if (!patientName) {
      return res.status(404).send({ msg: `Patient donot exists` });
    }
    let docFirstName = docName.doctorName;
    let patientFirstName = patientName.first_name;
    console.log(
      "Appointment Create Console: ",
      docFirstName,
      patientFirstName,
      patientEmail
    );
    let { ageOfPatient, gender, address, problemDescription, appointmentDate } =
      req.body;
      console.log(req.body);
    if (!docName.isAvailable) {
      return res.send({ msg: `${docFirstName}  is currently unavailable` });
    }
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
      auth: {
        user: "medistar.hospital301@gmail.com",
        pass: "inuuywvtlrqvugpp",
      },
    });
    const mailOptions = {
      from: "medistar.hospital301@gmail.com",
      to: patientEmail,
      subject: "Medistar Appointment Confirm",
      html: `
      <!DOCTYPE html>
        <html>
          <head>
            <title>Example Email Template</title>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; line-height: 1.5; color: #333; padding: 20px;">
            <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; border-collapse: collapse;">
              <tr>
                <td style="background-color: #0077c0; text-align: center; padding: 10px;">
                  <h1 style="font-size: 28px; color: #fff; margin: 0;">MEDISTAR HOSPITALS</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px;">
                  <h2 style="font-size: 24px; color: #0077c0; margin-top: 0;">Hello, [${patientFirstName}]</h2>
                  <h5 style="margin-bottom: 20px;">Thank you for your recent appointment with ${docFirstName}. Your appointment has been booked for [${problemDescription}] on [${appointmentDate}]</h5>
                  <p style="margin-bottom: 20px;">If you do have any issues, please don't hesitate to contact our customer service team. We're always happy to help.</p>
                  <p style="margin-bottom: 20px;">Thank you for choosing Medistar Services</p>
                  <p style="margin-bottom: 0;">Best regards,</p>
                  <p style="margin-bottom: 20px;">Medistar Hospitals</p>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    };
    transporter
      .sendMail(mailOptions)
      .then((info) => {
        res.status(201).json({
          message: "Appointment has been created , Check Your Mail",
          status: true,
        });
      })
      .catch((e) => {
        console.log(error);
        return res.status(500).json({ message: "Error Sending Mail" });
      });
  } catch (error) {
    res.status(500).send({ msg: "Error in created appointment" });
    console.log(error);
  }
});

//!! Delete Slot
appointmentRouter.post("/deleteSlot/:doctorId", async (req, res) => {
  let { date, slotTime } = req.body;
  let doctorId = req.params.doctorId;
  await DoctorModel.findOne({ _id: doctorId })
    .then((doc) => {
      date === "APRIL_04"
        ? doc.APRIL_04.pull(slotTime)
        : date === "APRIL_05"
        ? doc.APRIL_05.pull(slotTime)
        : doc.APRIL_06.pull(slotTime);
      return doc.save();
    })
    .then(() => {
      console.log("Element removed from array");
      res.send({ msg: "Slot removed from array" });
    })
    .catch((err) => {
      console.error(err);
      res.send({ msg: "Slot removed " });
    });
});

// Cancel Appointment by user/Patient
appointmentRouter.delete(
  "/cancel/:appointmentId",
  authenticate,
  async (req, res) => {
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
      await AppointmentModel.findByIdAndDelete({
        _id: req.params.appointmentId,
      });
      res.status(200).json({
        message: "Appointment has been Cancelled By Patient successfully",
      });
    } catch (error) {
      res.send({ msg: "Error in Deleting the Appointment By Patient", error });
    }
  }
);

// Reschedule a appointment by Patient
appointmentRouter.patch(
  "/reschedule/:appointmentId",
  authenticate,
  async (req, res) => {
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
  }
);

//!! ADMIN SIDE OPERATIONS------------------------------>
//  Get All Appointments
appointmentRouter.get("/all", authenticate, async (req, res) => {
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

function checkSlot(date, time) {
  if (date.includes(time)) {
    return true;
  }
  return false;
}

module.exports = {
  appointmentRouter,
};
