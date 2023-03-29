const mongoose = require("mongoose");

// # department model
// - dept_id
// - name
// - about
// - image

const departmentSchema = mongoose.Schema({
  departmentId: {
    type: Number,
    unique: true,
    required: true,
  },
  deptName: { type: String, required: true },
  about: { type: String, required: true },
  image: { type: String, required: true },
});

const DepartmentModel = mongoose.model("Department", departmentSchema);

module.exports = {
  DepartmentModel,
};
