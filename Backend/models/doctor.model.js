const mongoose = require("mongoose");
const { STRING } = require("sequelize");

const doctorSchema = mongoose.Schema({
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
  city: {
    type: String,
    required: true,
  },
  departmentId: {
    type: Number,
    required: true,
  },
  status:{
    type:Boolean,
    default:false
  },
  image:{
    type:String
  }
});

const DoctorModel = mongoose.model("Doctors", doctorSchema);

module.exports = {
  DoctorModel,
};
