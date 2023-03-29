const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
  doctorId: {
    type: Number,
    unique: true,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  qualifications: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  departmentId: {
    type: Number,
    required: true,
  },
});

const DoctorModel = mongoose.model("Doctors", doctorSchema);

module.exports = {
  DoctorModel,
};
