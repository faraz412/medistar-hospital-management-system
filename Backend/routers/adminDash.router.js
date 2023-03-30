const { DepartmentModel } = require("../models/department.model");
const { DoctorModel } = require("../models/doctor.model");
const { UserModel } = require("../models/user.model");

const DashboardRouter = require("express").Router();

//!! ALL DETAILS ------------------------------->
DashboardRouter.get("/all", async (req, res) => {
  try {
    let users = await UserModel.findAll();
    let docs = await DoctorModel.findAll();
    let docPending = docs.filter((e) => {
      return e.status === false;
    });
    let docApproved = docs.filter((e) => {
      return e.status === true;
    });
    res.send({
      msg: "Dashboard Done",
      docPending: docPending,
      docApproved:docApproved,
      docs:docs,
      users: users,
    });
  } catch (error) {
    console.log({ msg: "Error" });
  }
});

//!! ALL DOC DETAIl BY------------------------------->
DashboardRouter.get("/alldocs", async (req, res) => {
  try {
  } catch (error) {}
});

//!! DOC DETAIl BY ID ------------------------------->
DashboardRouter.get("/alldocs/:id", async (req, res) => {});

DashboardRouter.post("/alldocs/:id", async (req, res) => {});

DashboardRouter.delete("/alldocs/:id", async (req, res) => {});

DashboardRouter.patch("/alldocs/:id", async (req, res) => {});

//!! All Appointments --------------------------------->
DashboardRouter.patch("/allappoinments", async (req, res) => {});

DashboardRouter.patch("/allappoinments", async (req, res) => {});

module.exports = { DashboardRouter };
