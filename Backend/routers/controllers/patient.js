const patient = require("../../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const createNewPatient = async (req, res) => {
 
  let {
    firstName,
    lastName,
    email,
    pass,
    mobile
  } = req.body;
  pass = await bcrypt.hash(pass, 10);
  email = email.toLowerCase();
  const query = `INSERT INTO patients
    (firstName,lastName,email,pass,mobile)
    VALUES(?,?,?,?,?)`;
  data = [firstName, lastName, email, pass , mobile];

  patient.query(query, data, (err, result) => {
    if (result) {
      res.status(201).json({
        success: true,
        message: `Welcome to our web site `,
        users: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
  });
};

module.exports = { createNewPatient };
