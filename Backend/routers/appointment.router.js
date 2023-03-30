
const { AppointmentModel } = require("../models/appointment.model");

const appointmentRouter = require("express").Router();

appointmentRouter.get("/", (req, res) => {
  res.send("On AppointmentRouter Route ");
});

appointmentRouter.post("/", async (req, res) => {
  let payload = req.body;
  // console.log(payload)
  try {
    let appointment = await AppointmentModel(payload);
    await appointment.save();
    res.status(201).send({ msg: "appointment has been created" });
  } catch (error) {
    res.status(500).send({ msg: "Error in created appointment" });
    console.log(error);
  }
});

appointmentRouter.delete('/:id',async(req,res)=>{
  let id = req.params.id;
  try {
    let appointment =   await AppointmentModel.find({"patientId":id});
    console.log(appointment[0]._id)
    if(!appointment){
      return res.status(404).send({msg: 'Appointment not found'});
    }
    // if(appointment.patientId == req.body.userId){
      await AppointmentModel.findByIdAndDelete({"_id":appointment[0]._id}).then(()=>{
          res.send({msg:"Appointment has been cancelled successfully"})}).catch(()=>{
          res.send({msg:"Error while deleting the appointment"})
        });
      // })
    // res.send({msg:appointment});
  } catch (error) {
    res.send({msg: error.message});
    console.log('error');
  }
});


module.exports = {
  appointmentRouter
};
