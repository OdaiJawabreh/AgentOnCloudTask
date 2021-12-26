const express = require("express");
const { createNewDoctor } = require("../controllers/doctor");


const doctorRouter = express.Router();

 

doctorRouter.post("/", createNewDoctor);


module.exports = doctorRouter;
