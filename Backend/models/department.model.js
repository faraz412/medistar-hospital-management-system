const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema({
  departmentId: {
    type: Number,
    unique: true,
    required: true,
  },
  deptName: { type: String, required: true },
  about: { type: String, required: true },
  image: { type: String, required: true },
},{
  versionKey:false
});

const DepartmentModel = mongoose.model("Department", departmentSchema);

module.exports = {
  DepartmentModel,
};
