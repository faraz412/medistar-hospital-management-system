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
    isAvailable,
    APRIL_04,
    APRIL_05,
    APRIL_06,
  } = req.body;
  try {
    let doctor = new DoctorModel({
      doctorName,
      email,
      qualifications,
      experience,
      phoneNo,
      city,
      departmentId,
      status,
      image,
      isAvailable,
      APRIL_04,
      APRIL_05,
      APRIL_06,
    });
    await doctor.save();
    res.status(201).send({ msg: "Doctor has been created", doctor });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Error in created doctor due to Non unique email/mob" });
  }
});

//SEARCH BY NAME
doctorRouter.get("/search", async (req, res) => {
  let query = req.query;
  //console.log(query);
  try {
    const result = await DoctorModel.find({
      doctorName: { $regex: query.q, $options: "i" },
    });
    res.send(result);
  } catch (err) {
    res.send({ "err in getting doctor details": err });
  }
});

// DOCTORS BY DEPARTMENT ID
doctorRouter.get("/allDoctor/:id", async (req, res) => {
  let id = req.params.id;
  // console.log(id);
  let isDoctorPresent = await DoctorModel.find({ departmentId: id });
  console.log(isDoctorPresent);
  if (isDoctorPresent.length === 0) {
    return res.status(201).send({ msg: "This Department have no doctors" });
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

// Update the availability status of a doctor by ID
doctorRouter.patch("/isAvailable/:doctorId", async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    // Check if the doctor with the given ID exists
    const doctor = await DoctorModel.findById({ _id: doctorId });
    if (!doctor) {
      return res
        .status(404)
        .json({ msg: "Doctor not found, please check the ID" });
    }

    // Update the availability status of the doctor
    const payload = { isAvailable: req.body.isAvailable };
    const updatedDoctor = await DoctorModel.findByIdAndUpdate(doctorId, {
      isAvailable: payload.isAvailable,
    });
    res.json({
      msg: "Doctor's status has been updated",
      doctor: updatedDoctor,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Server error while updating the doctor status" });
  }
});

doctorRouter.post("/addTimeSlots", async (req, res) => {
  let payload = "11-12";
  try {
  } catch (error) {}
});

module.exports = {
  doctorRouter,
};

// DOCTORS DATA...
// {
//     "doctorName":"Abhishek Jaiswal",
//     "email":"abhisek@gmail.com",
//     "qualifications":"MBBS from AIMS Delhi",
//     "experience":"14 years of experience",
//     "phoneNo":"7011144555",
//     "city":"Mumbai",
//     "departmentId":1,
//     "status":true,
// isAvailable:true;
//     "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJO1Bmu2stkBmmOJXmyHN5G7UHmeA4xr5z0whR9JZF&s"
// }
