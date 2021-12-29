import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUpPat() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [mobile, setMobile] = useState();

  const history = useNavigate();
  function signUp(e) {
    e.preventDefault();
    let data = {
        firstName,
        lastName,
        email,
        pass,
        mobile
    }
    axios
    .post("http://localhost:5000/signPit",data)
    .then(result=>history("/LoginPat"))
    
  }
  return (
    <div className="container">
      <h2>Sign up</h2>
      <form onSubmit={signUp}>
        <div>
          {" "}
          <input
            type="text"
            placeholder="First name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />{" "}
        </div>
        <div>
          {" "}
          <input
            type="text"
            placeholder="Last name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />{" "}
        </div>
        <div>
          {" "}
          <input
            type="email"
            placeholder="xxxx@gmail.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />{" "}
        </div>

        <div>
          {" "}
          <input
            type="text"
            placeholder="Phone"
            onChange={(e) => {
              setMobile(e.target.value);
            }}
          />{" "}
        </div>
        <div>
          {" "}
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />{" "}
        </div>
        <div>
          <div>
            {" "}
            <button type="submit">
              <span>Create account</span>
            </button>{" "}
          </div>
          <div>
            <p>
              Already have an account?
              <br />
              <a href="#">Sign in</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUpPat;
