const { Signup } = require("../models/signup.model");
const DashboardRouter = require("express").Router();

//!! ALL DETAILS ------------------------------->
DashboardRouter.get("/all", async (req, res) => {
  try {
    let users = await Signup.findAll();
    // let doc = await Doc.findAll()
    // let Appointment = await Appointment.findAll()

    // res.send({
    //   msg: "Dashboard Done",
    //   userTotal: users.length,
    //   users: users,
    //   docTotal: doc.length,
    //   docs: doc,
    //   appTotal: Appointment.length,
    //   appointments: Appointment,
    // });
    res.send({ msg: "Dashboard Done", userTotal: users.length, data: users });
  } catch (error) {
    console.log({ msg: "Error" });
  }
});

//!! ALL DOC DETAIl BY------------------------------->
DashboardRouter.get("/alldocs", async (req, res) => {
  try {
    let doc = await Doc.findAll();
    res.send({ msg: "Docs Details", docTotal: doc.length, docs: doc });
  } catch (error) {
    console.log({ msg: "Error" });
  }
});

//!! DOC DETAIl BY ID ------------------------------->
DashboardRouter.get("/alldocs/:id", async (req, res) => {

});

DashboardRouter.post("/alldocs/:id", async (req, res) => {

});

DashboardRouter.delete("/alldocs/:id", async (req, res) => {

});

DashboardRouter.patch("/alldocs/:id", async (req, res) => {

});


//!! All Appointments ---------------------------------> 
DashboardRouter.patch("/allappoinments", async (req, res) => {

});

DashboardRouter.patch("/allappoinments", async (req, res) => {

});

module.exports = { DashboardRouter };
