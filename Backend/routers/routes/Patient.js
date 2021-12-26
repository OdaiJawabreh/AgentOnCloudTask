const express = require("express");
const { createNewPatient } = require("../controllers/patient");


const patientRouter = express.Router();

 

patientRouter.post("/", createNewPatient);


module.exports = patientRouter;
