import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import "../Boocking/boocking.css"
function EditAppt() {
  const history = useNavigate();
  // const [value,setValue] = useState(false)
  let token = "";

  useEffect(() => {
    token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      swal("Please Login Fierst").then((value) => {
        value && history("/LoginSelect");
      });
    }
  }, []);

  const hashToken = localStorage.getItem("token1");
  let appointments_id = Number(useParams().id);
  const [start_Datee, setStart_Datee] = useState();
  const [end_Date, setEnd_Date] = useState();

  function editBoocking() {
    let data = {
      start_Datee,
      end_Date,
    };
    axios
      .put(`http://localhost:5000/app/${appointments_id}`, data ,{
        headers: { Authorization: `Bearer ${hashToken}` },
      })
      .then((result) => {
        swal("Done!", "Your Appointment has been updated!", "success");
        history("/MyAppointment");
      });
  }
  return (
    <div className="Boocking">
      <div className="child">
        <div >
        <label htmlFor="boocking Time">Boocking From</label>
        <input
          type="datetime-local"
          id="birthdaytime"
          name="birthdaytime"
          onChange={(e) => {
            setStart_Datee(e.target.value);
          }}
        />
        </div>
        <div className="date">
        <label htmlFor="boocking Time">Boocking To</label>
        <input
          type="datetime-local"
          id="birthdaytime"
          name="birthdaytime"
          onChange={(e) => {
            setEnd_Date(e.target.value);
          }}
        />
        </div>
        <div>
          <Button  variant="outline-success" onClick={editBoocking}>Edit</Button>
        </div>
      </div>
    </div>
  );
}

export default EditAppt;

/*
<div>
      <label htmlFor="birthdaytime">boocking from</label>
      <input
        type="datetime-local"
        id="birthdaytime"
        name="birthdaytime"
        onChange={(e) => {
          setStart_Datee(e.target.value);
        }}
      />
      <label htmlFor="birthdaytime">boocking to</label>
      <input
        type="datetime-local"
        id="birthdaytime"
        name="birthdaytime"
        onChange={(e) => {
          setEnd_Date(e.target.value);
        }}
      />
      <div>
        <button onClick={editBoocking}>Edit</button>
      </div>
    </div>
*/ 
