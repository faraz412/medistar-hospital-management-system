const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  doctorId: {
    type: String,
    required: true,
  },
  patientFirstName:{
    type: String,
    required: true,
  },
  docFirstName:{
    type: String,
    required: true,
  },
  ageOfPatient:{
   type:Number,
   required:true
  },
  gender: {
    type: String,
    required:true
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
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status:{
    type:Boolean,
    default: false 
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



// APPOINTMENT MODEL
// {
//   "patientId":"64256f28b1fc4d36b5a12be7",
//   "doctorId":"6425319914291e303a3cf2c4",
//   "ageOfPatient":40,
//   "gender":"male",
//   "address":"Mumbai woribali",
//   "problemDescription":"having some problem related to neourology ",
//   "appointmentDate":"30-03-2023",
//   "createdAt":,
//   "updatedAt":,
//   "paymentStatus":false,
//   }
  

// appontmentid
// dateTime
// patientName
// payment
// doctorID
// doctorname
// patientName
// patientID
// problem