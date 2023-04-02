const mongoose = require("mongoose");

const timeSlot = {
  type: [String],
  default: undefined,
};

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
  status: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  APRIL_04: timeSlot,
  APRIL_05: timeSlot,
  APRIL_06: timeSlot,
},{
  versionKey:false
});

const DoctorModel = mongoose.model("Doctors", doctorSchema);

module.exports = {
  DoctorModel,
};
