const connection = require("../../db/db")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginPat = (req, res) => {
  let pass = req.body.pass
  let email = req.body.email.toLowerCase()
  const query = "SELECT * FROM patients WHERE patients.email=? "
  const data = [email]
  connection.query(query,data,async(err,result)=>{
      if(!result.length){
        return res.status(404).json({
            success: false,
            message: `The email doesn't exist`,
          });
      }else if(err){
       return res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err,
          });
      }

      const check = await bcrypt.compare(pass, result[0].pass)
      if(!check){
        return res.status(403).json({
            success: false,
            message: `The password you’ve entered is incorrect`,
          });
      }
      const payload = {
        patient_id: result[0].patient_id,
        userName: result[0].firstName,
        mobile: result[0].mobile
      }
      const options = {
        expiresIn: "150000h",
      };
      const token = jwt.sign(payload,process.env.SECRET,options)
      res.status(200).json({
        success: true,
        message: `Email and Password are correct`,
        token: token,
      });
      
  })

};

const loginDoc= async (req, res) => {
    let pass = req.body.pass
    let email = req.body.email.toLowerCase()
    const query = "SELECT * FROM doctors WHERE doctors.email=? "
    const data = [email]
    connection.query(query,data,async(err,result)=>{
      
        if(!result.length){
          return res.status(404).json({
              success: false,
              message: `The email doesn't exist`,
            });
        }else if(err){
         return res.status(500).json({
              success: false,
              message: `Server Error`,
              err: err,
            });
        }
  
        const check = await bcrypt.compare(pass, result[0].pass)
        if(!check){
          return res.status(403).json({
              success: false,
              message: `The password you’ve entered is incorrect`,
            });
        }
        const payload = {
          doctor_id: result[0].doctor_id,
          userName: result[0].firstName,
          mobile: result[0].mobile,
          is_Available: result[0].is_Available ,
          Doctor_Scout_DOUBLE: result[0].Doctor_Scout_DOUBLE
        }
        const options = {
          expiresIn: "150000h",
        };
        const token = jwt.sign(payload,process.env.SECRET,options)
        res.status(200).json({
          success: true,
          message: `Email and Password are correct`,
          token: token,
        });
        
    })
  
};

module.exports = {
    loginPat,
    loginDoc
};
