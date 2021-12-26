const appointment = require("../../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
  const appointments_id = req.params.appointments_id;
  const checkQuery = `SELECT *  FROM appointments WHERE appointments_id=?`;
  let data = [parseInt(appointments_id)];
  appointment.query(checkQuery, data, async (err, result) => {
    if (err) {
      throw err;
    }

    if (result) {
      currentState = await result[0].statuss;
      let nextState = currentState === 0 ? 1 : 0;
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
const rejectApp = (req, res) => {
  const appointments_id = req.params.appointments_id;
  if (parseInt(appointments_id) === 1 || parseInt(appointments_id) === 1) {
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
  let patient_id = req.token.patient_id;
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


module.exports = {
  createAppointments,
  acceptApp,
  rejectApp,
  getAppByPat,
  getAppBydoc,
  SearchDoctor,
};
