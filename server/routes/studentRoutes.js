const express = require("express");
const router = express.Router();

const { registerStudent, getStudents } = require("../controllers/studentController");

router.post("/register", registerStudent);

router.get("/", getStudents);

module.exports = router;
