import React, { useState ,useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function Boocking() {
    const history = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
 console.log(token);
  useEffect(() => {
    if (!token) {
        swal("Please Login Fierst").then((value) => {
            history("/LoginSelect");
        });
        
      }
  }, []);

  const hashToken = localStorage.getItem("token1");
  let patient_id = token.patient_id;
  let doctor_id = Number(useParams().id);
  const [start_Datee, setStart_Datee] = useState();
  const [end_Date, setEnd_Date] = useState();
  console.log(hashToken);
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
        swal("your appointmebt has been subnited you can check the status in youre appointments").then((value) => {
            history("/");
        });
      });
  }
  return (
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
        <button onClick={postBoocking}>Submit</button>
      </div>
    </div>
  );
}

export default Boocking;
