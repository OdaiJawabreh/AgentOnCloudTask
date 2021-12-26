const express = require("express");
const { loginDoc  , loginPat } = require("../controllers/login");


const loginRouter = express.Router();

 

loginRouter.post("/doctor", loginDoc);
loginRouter.post("/patient", loginPat);


module.exports = loginRouter;
