import React from "react";
import { useNavigate  } from "react-router-dom";
import Form from "react-bootstrap/Form";
function SignSelect() {
  const history = useNavigate();
  const handleChange = (e) => {
    if (e.target.value === "doctor") {
      history("/doctor");
    } else {
      history("/pat");
    }
  };
  return (
    <>
   <>
  <Form.Group className="mb-3">
    <Form.Label>Select One</Form.Label>
  
  </Form.Group>
  
  <Form.Group className="mb-3">
    <Form.Check type="checkbox" label="Doctor" value={"doctor"}  onChange={e => handleChange(e)}/>
    <Form.Check type="checkbox" label="patient" value={"patient"} onChange={e => handleChange(e)} />
  </Form.Group>
</>
     
    </>
  );
}

export default SignSelect;
