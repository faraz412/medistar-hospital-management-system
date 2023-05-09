const express = require("express");
const cors = require("cors");
require("dotenv").config();
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors());

const { userRouter } = require("./routers/user.router");
const { connection } = require("./config/db");
// const { authenticate } = require("./middlewares/authenticator.mw");
const { doctorRouter } = require("./routers/doctor.router");
const { departmentRouter } = require("./routers/department.router");
const { appointmentRouter } = require("./routers/appointment.router");
const { dashboardRouter } = require("./routers/adminDash.router");



app.use("/user", userRouter);
app.use("/department",departmentRouter);
app.use("/doctor", doctorRouter);
app.use("/appointment",appointmentRouter);
app.use("/admin", dashboardRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
    console.log(`Listening at ${process.env.port}`);
  } catch (error) {
    console.log("Error in DB", error);
  }
});
