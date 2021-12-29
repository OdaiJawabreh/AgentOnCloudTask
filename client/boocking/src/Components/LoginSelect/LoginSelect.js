import React from "react";
import { useNavigate } from "react-router-dom";

import { Container, Form } from "react-bootstrap";
function LoginSelect() {
  const history = useNavigate();
  const handleChange = (e) => {
    if (e.target.value === "doctor") {
      history("/loginDoctor");
    } else {
      history("/LoginPat");
    }
  };
  return (
    <div style={{ paddingTop: "45px" }} className="container">
      <select
        class="form-select"
        aria-label="Default select example"
        onChange={(e) => handleChange(e)}
      >
        <option selected>Select One </option>
        <option value="doctor">Doctor</option>
        <option value="2">Patient</option>
      </select>
    </div>
  );
}

export default LoginSelect;
