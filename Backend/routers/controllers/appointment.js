const appointment = require("../../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const gitAllDoctors = (req,res)=>{
  const query = `SELECT *  FROM doctors WHERE doctors.is_Available=${1}`;
  appointment.query(query , (err,result)=>{
    if (err){
      return res.status(500).json({
        success: false,
        message: `server error`,
      });
    }
    return res.status(202).json({
      success: true,
      message: `All doctors`,
      result: result,
    });
  })
  
}
const createAppointments = (req, res) => {
  let patient_id = req.token.patient_id;
  const { start_Datee, end_Date, doctor_id } = req.body;
  const query = `INSERT INTO appointments (patient_id , start_Datee ,end_Date ,doctor_id) VALUES (?,?,?,?)`;
  const data = [patient_id, start_Datee, end_Date, doctor_id];
  appointment.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        error: err,
      });
    }
    if (result) {
      return res.status(200).json({
        success: true,
        message: "successfully added new appointments",
      });
    }
  });
};
const acceptApp = (req, res) => {
  const appointments_id = Number(req.params.appointments_id);
  const checkQuery = `SELECT *  FROM appointments WHERE appointments_id=?`;
  let data = [appointments_id];
  appointment.query(checkQuery, data, async (err, result) => {
    if (err) {
      throw err;
    }

    if (result) {
      currentState = await result[0].statuss;
      let nextState = currentState === 0 ? 1 : 0;
      let data = [nextState, appointments_id];

      const query = `UPDATE appointments SET statuss=? WHERE appointments_id=?`;

      appointment.query(query, data, (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: `server error`,
          });
        }
        if (result.affectedRows) {
          return res.status(202).json({
            success: true,
            message: `Booking is now confirmed`,
            result: result,
          });
        } else {
          return res.status(404).json({
            success: false,
            message: `The result => ${appointments_id} not found`,
          });
        }
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `The result => ${appointments_id} not found`,
      });
    }
  });
};
const rejectApp = (req, res) => {
  const appointments_id = Number(req.params.appointments_id);
  if (appointments_id === 1 || appointments_id === 2) {
    return res.status(404).json({
      success: false,
      message: `the appointments has action before`,
    });
  }
  const checkQuery = `SELECT *  FROM appointments WHERE appointments_id=?`;
  let data = [parseInt(appointments_id)];
  appointment.query(checkQuery, data, async (err, result) => {
    if (err) {
      throw err;
    }

    if (result) {
      currentState = await result[0].statuss;
      let nextState = currentState === 0 ? 2 : 0;
      let data = [nextState, parseInt(appointments_id)];

      const query = `UPDATE appointments SET statuss=? WHERE appointments_id=?`;

      appointment.query(query, data, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: `server error`,
          });
        }
        if (result.affectedRows) {
          return res.status(202).json({
            success: true,
            message: `Booking is now confirmed`,
            result: result,
          });
        } else {
          return res.status(404).json({
            success: false,
            message: `The result => ${appointments_id} not found`,
          });
        }
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `The result => ${appointments_id} not found`,
      });
    }
  });
};
const getAppByPat = (req, res) => {
  let patient_id = Number(req.token.patient_id);
  const query = `SELECT * from appointments INNER JOIN doctors ON appointments.doctor_id=doctors.doctor_id
   WHERE appointments.patient_id=${patient_id}`;
  appointment.query(query, (err, result) => {
    if (!result.length) {
      return res.status(500).json({
        success: false,
        message: `not found any appointments`,
      });
    } else if (err) {
      return res.status(404).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
    return res.status(201).json({
      success: true,
      result: result,
    });
  });
};
const getAppBydoc = (req, res) => {
  let doctor_id = req.token.doctor_id;
  console.log(doctor_id);
  const query = `SELECT * from appointments INNER JOIN patients ON appointments.patient_id=patients.patient_id
       WHERE appointments.doctor_id=${doctor_id}`;
  appointment.query(query, (err, result) => {
    if (!result.length) {
      return res.status(500).json({
        success: false,
        message: `not found any appointments`,
      });
    } else if (err) {
      return res.status(404).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
    return res.status(201).json({
      success: true,
      result: result,
    });
  });
};

const SearchDoctor = (req, res) => {
  const firstName = req.body.name || "";
  const mobile = req.body.mobile || "";
  const Doctor_Scout_from = req.body.Doctor_Scout_from || 0;
  const Doctor_Scout_to = req.body.Doctor_Scout_to || 1000;

  const query = `SELECT * FROM doctors 
          WHERE firstName LIKE "%${firstName}"  
          AND mobile LIKE "${mobile}%" 
          AND Doctor_Scout BETWEEN ${Doctor_Scout_from} AND ${Doctor_Scout_to}
         `;

  appointment.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    } else if (!result.length) {
      return res.status(404).json({
        success: false,
        message: `not found any Doctor`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "filtered Doctors",
      result: result,
    });
  });
};
const deletApp = (req, res) => {
  const appointments_id = Number(req.params.appointments_id);
  const query = `DELETE from  appointments where appointments.appointments_id=${appointments_id} `;
  appointment.query(query, (err, result) => {
    if (!result.affectedRows) {
      return res.status(404).json({
        success: false,
        message: `no appointment`,
      });
    } else if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
    return res.status(200).json({
      success: true,
      message: "deleted",
      result: result,
    });
  });
};

const updateApp = (req, res) => {
  const appointments_id = Number(req.params.appointments_id);
  const {start_Datee, end_Date} = req.body;
  let data = [start_Datee, end_Date];
  const query = `SELECT *  FROM appointments WHERE appointments_id=${appointments_id}`;
  appointment.query(query,(err,result)=>{
      console.log(result);
      if(err){
        return res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err,
          });
      }else if (!result.length){
        return res.status(204).json({
            success: false,
            message: `not found`,
          });
      }
      if(result[0].statuss===1 || result[0].statuss===2){
        return res.status(404).json({
            success: false,
            message: `you can not update after confirmed`,
          }); 
      }
  

  const query2 = `UPDATE appointments SET start_Datee=?,end_Date=? WHERE appointments_id=${appointments_id}`;


  appointment.query(query2,data,(err,result)=>{
     if(err){
        return res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err,
          });  
     }else if (!result.affectedRows){
        return res.status(204).json({
            success: false,
            message: `plese check youre filled`,
          });
     }
     return res.status(200).json({
        success: true,
        message: "updated succefully",
        result: result,
      });
  })
  })
};

module.exports = {
  createAppointments,
  acceptApp,
  rejectApp,
  getAppByPat,
  getAppBydoc,
  SearchDoctor,
  deletApp,
  updateApp,
  gitAllDoctors
};
