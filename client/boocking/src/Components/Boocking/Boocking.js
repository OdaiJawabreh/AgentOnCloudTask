import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import "./boocking.css"
import Button from "react-bootstrap/esm/Button";
function Boocking() {
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
  let patient_id = token.patient_id;
  let doctor_id = Number(useParams().id);
  const [start_Datee, setStart_Datee] = useState();
  const [end_Date, setEnd_Date] = useState();
  function postBoocking() {
    let data = {
      patient_id,
      start_Datee,
      end_Date,
      doctor_id,
    };
    axios
      .post("http://localhost:5000/app", data, {
        headers: { Authorization: `Bearer ${hashToken}` },
      })
      .then((result) => {
        swal(
          "your appointmebt has been subnited you can check the status in youre appointments"
        ).then((value) => {
          history("/");
        });
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
          <Button  variant="outline-success" onClick={postBoocking}>Submit</Button>
        </div>
      </div>
    </div>
   
  );
}

export default Boocking;
