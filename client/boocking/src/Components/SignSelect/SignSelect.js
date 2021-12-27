import React from "react";
import { useNavigate  } from "react-router-dom";
import Form from "react-bootstrap/Form";
function SignSelect() {
  const history = useNavigate();
  const handleChange = (e) => {
      console.log(e.target.value );
    if (e.target.value == "doctor") {
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
      {/* <div className="container">
        <div className="MainLogin">
          <div className="child-Login login-option">
            <h2>Sign up</h2>
            <Form.Select
              className="select-box"
              size="sm"
              defaultValue="login as a seller or buyer"
              onChange={SignupWithOption}
            >
              <option hidden value="0">
                {" "}
                Choose one{" "}
              </option>
              <option value="buyer">User</option>
              <option value="seller">Doctor</option>
            </Form.Select>
            <button className="cssbuttons-io-button">
              {" "}
              Get started
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default SignSelect;
