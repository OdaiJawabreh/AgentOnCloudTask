const doctor = require("../../db/db");
const bcrypt = require("bcrypt");
require("dotenv").config();
const createNewDoctor = async (req, res) => {
  console.log(req.body);
  let {
    firstName,
    lastName,
    email,
    pass,
    mobile,
    img,
    Doctor_Scout,
    descriptionn,
    address,
    major
  } = req.body;
  pass = await bcrypt.hash(pass, 10);
  email = email.toLowerCase();
  const query = `INSERT INTO doctors
    (firstName,lastName,email,pass,mobile,img,Doctor_Scout,descriptionn,address,major)
    VALUES(?,?,?,?,?,?,?,?,?,?)`;
  data = [firstName, lastName, email, pass , mobile ,img,Doctor_Scout,descriptionn,address,major];

  doctor.query(query, data, (err, result) => {
    if (result) {
      res.status(201).json({
        success: true,
        message: `Welcome to our web site Doctor`,
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

module.exports = { createNewDoctor };
