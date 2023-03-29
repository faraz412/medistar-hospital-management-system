const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
  patientId: {
    type: Number,
    unique: true,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  problemDescription: {
    type: String,
    required: true,
  },
});

const PatientModel = mongoose.model("Patient", patientSchema);

module.exports = {
  PatientModel,
};
