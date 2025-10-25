const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String },
  gender: { type: String },
  bloodGroup: { type: String },
  course: { type: String },
  semester: { type: String },
  guardianName: { type: String },
  guardianPhone: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
