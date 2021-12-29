import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

function LoginSelect() {
  const history = useNavigate();
  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.target.value === "doctor") {
      history("/loginDoctor");
    } else {
      history("/LoginPat");
    }
  };
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Select One</Form.Label>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Doctor"
          value={"doctor"}
          onChange={(e) => handleChange(e)}
        />
        <Form.Check
          type="checkbox"
          label="patient"
          value={"patient"}
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>
    </div>
  );
}

export default LoginSelect;
