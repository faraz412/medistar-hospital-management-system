const { DepartmentModel } = require("../models/department.model");
const departmentRouter = require("express").Router();

// FOR TESTING
departmentRouter.get("/department", (req, res) => {
  res.send("On Department Route ");
});

// CREATE A DEPARTMENT-----------------------------------------------------

departmentRouter.post("/createDepartment", async (req, res) => {
  let payload = req.body;
  try {
    let department = await DepartmentModel(payload);
    await department.save();
    res.status(201).send({ msg: "Department has been created", department });
  } catch (error) {
    console.log("Error while creating department");
    res.status(400).send({ msg: "Error while creating department", error });
  }
});

// GET DEPARTMENT BY ID----------------------------------------------------------

departmentRouter.get("/getDepartment/:id", async (req, res) => {
  let departmentId = req.params.id;
  try {
    let isPresent = await DepartmentModel.findOne({ departmentId });
    if (isPresent) {
      res
        .status(201)
        .send({ msg: "Department is present", department: isPresent });
    } else res.send({ msg: "Department not found " });
  } catch (error) {
    res.status(404).send({ msg: "Error in finding department" });
  }
});

// GET ALL DEPARTMENTS-----------------------------------------------------------------

departmentRouter.get("/getAllDepartment", async (req, res) => {
  try {
    let allDepartments = await DepartmentModel.find();
    res.status(201).send({ msg: "All Departments", allDepartments });
  } catch (error) {
    res.status(404).send({ msg: "Server Error" });
  }
});

// DELETE DEPARTMENT-----------------------------------------------------------------

departmentRouter.delete("/deleteDepartment/:id", async (req, res) => {
  try {
    let departmentId = req.params.id;
    let isDepartmentPresent = await DepartmentModel.findOne({
      departmentId: departmentId,
    });
    if (!isDepartmentPresent) {
      return res
        .status(404)
        .send({ message: "Department with associated id not found" });
    } else {
      await DepartmentModel.findByIdAndDelete({ _id: isDepartmentPresent._id });
      res
        .status(200)
        .send({ msg: "Deleted the department from the system successfully" });
    }
  } catch (error) {
    res.send({ msg: "Error in deleting department" });
  }
});

// UPDATE DEPARTMENT-----------------------------------------------------------------

departmentRouter.patch("/updateDepartment/:id", async (req, res) => {
  try {
    let departmentId = req.params.id;
    let payload = req.body;
    let isDepartmentPresent = await DepartmentModel.findOne({
      departmentId: departmentId,
    });
    if (!isDepartmentPresent) {
      return res
        .status(404)
        .send({ message: "Department with associated id not found" });
    } else {
      let department = await DepartmentModel.findByIdAndUpdate(
        { _id: isDepartmentPresent._id },
        payload
      );
      res
        .status(200)
        .send({ msg: "Update the department successfully", department });
    }
  } catch (error) {
    res.send({ msg: "Error in Updating department" });
  }
});

module.exports = {
  departmentRouter,
};

// DEPARTMENT OBJECTS --------------------------------
// {
//   "departmentId":1,
//   "deptName":"Neourology",
//   "about":"medical specialty concerned with the nervous system and its functional or organic disorders",
//   "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzUT8yBJiQiKk-odQuEGmnFx5f2dDkg5iYrg&usqp=CAU"
// }
