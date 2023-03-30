const mongoose = require("mongoose");


const appointmentSchema = mongoose.Schema({
  patientId: {
    type: Number,
    required: true,
  },
  doctorId: {
    type: Number,
    required: true,
  },
  ageOfPatient:{
   type:Number,
   required:true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: 'male'
  },
  address: {
    type: String,
    required: true,
  },
  problemDescription: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  paymentStatus:{
    type:Boolean,
    default:false
  }
});

const AppointmentModel = mongoose.model("Appointment", appointmentSchema);

module.exports = {
  AppointmentModel
};





// appontmentid
// dateTime
// patientName
// payment
// doctorID
// doctorname
// patientName
// patientID
// problem