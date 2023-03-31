const { DoctorModel } = require("../models/doctor.model");
const doctorRouter = require("express").Router();

// get all
doctorRouter.get("/allDoctor", async (req, res) => {
  try {
    let doctor = await DoctorModel.find();
    res.status(201).send({ total: doctor.length, doctor });
  } catch (error) {
    res.status(500).send({ msg: "Error in getting dr info.." });
  }
});

// Add a Doctor
doctorRouter.post("/addDoctor", async (req, res) => {
  let {
    doctorName,
    email,
    qualifications,
    experience,
    phoneNo,
    city,
    departmentId,
    status,
    image,
  } = req.body;
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
    res.status(500).send({ msg: "Error in created doctor due to Non unique email/mob" });
  }
});

// DOCTORS BY DEPARTMENT
doctorRouter.get("/allDoctor/:id", async (req, res) => {
  let id = req.params.id;
  console.log(id);
  let isDoctorPresent = await DoctorModel.find({ departmentId: id });
  if (isDoctorPresent.length === 0) {
    return res.status(404).send({ msg: "This Department have No doctor" });
  }
  try {
    let doctor = await DoctorModel.find({ departmentId: id });
    res.status(201).send({ total: doctor.length, doctor });
  } catch (error) {
    res.status(500).send({ msg: "Error in getting Dr. info.." });
  }
});

// DELETE A DOCTOR..
doctorRouter.delete("/removeDoctor/:id", async (req, res) => {
  let id = req.params.id;
  let isDoctorPresent = await DoctorModel.findById({ _id: id });
  if (!isDoctorPresent) {
    return res.status(500).send({ msg: "Doctor not found" });
  }
  try {
    let doctor = await DoctorModel.findByIdAndDelete({ _id: id })
      .then(() => {
        res.status(201).send({ msg: "Doctor deleted" });
      })
      .catch(() => {
        res.status(500).send({ msg: "Error in deleting the doctor" });
        console.log("Error deleting the doctor");
      });
  } catch (error) {
    res.status(500).send({ msg: "Error in deleting the doctor" });
  }
});

// DOCTOR PENDING FOR APPROVAL
doctorRouter.get("/docPending", async (req, res) => {
  try {
    var docPending = await DoctorModel.find({ status: false });
    if (!docPending || docPending.length === 0) {
      return res.send({ msg: "No Doc Pending for Approval" });
    }
    res.status(201).send({ msg: "Doc Pending", docPending });
  } catch (error) {
    console.log(error);
  }
});

// UPDATE THE DOCTOR STATUS..
doctorRouter.patch("/updateDoctorStatus/:id", async (req, res) => {
  let id = req.params.id;
  let isDoctorPresent = await DoctorModel.findById({ _id: id });
  if (!isDoctorPresent || isDoctorPresent.length === 0) {
    return res.status(404).send({ msg: "Doctor not found, check Id" });
  }
  try {
    if (req.body.status === true) {
      let payload = {
        ...isDoctorPresent._doc,
      };
      payload.status = true;
      console.log(payload);
    } else if (req.body.status === false) {
      await DoctorModel.findByIdAndDelete({ _id: id });
      return res.status(201).send({ msg: "Doctor Application Rejected" });
    }
    await DoctorModel.findByIdAndUpdate(id, { status: true });
    res.status(201).send({ msg: "Doctor Application Approved" });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Server error while updating the doctor Status" });
  }
});

module.exports = {
  doctorRouter,
};

// DOCTORS DATA...
// {
//     "doctorName":"Abhishek Jaiswal",
//     "email":"abhisek@gmail.com",
//     "qualification":"MBBS from AIMS Delhi",
//     "experience":"14 years of experience",
//     "phoneNo":"7011144555",
//     "city":"Mumbai",
//     "departmentId":1,
//     "status":true,
//     "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJO1Bmu2stkBmmOJXmyHN5G7UHmeA4xr5z0whR9JZF&s"
// }
