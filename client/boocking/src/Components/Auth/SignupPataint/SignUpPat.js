import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Login/login.css";
import { Button } from "react-bootstrap";

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
      mobile,
    };
    axios
      .post("http://localhost:5000/signPit", data)
      .then((result) => history("/LoginPat"));
  }
  return (
    <center>
      <div class="wrapper">
        <form class="form-signin" onSubmit={signUp}>
          <h2 class="form-signin-heading">Please SignUp</h2>
          <input
            type="text"
            class="form-control"
            placeholder="First name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <input
            type="text"
            class="form-control"
            placeholder="Last name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <input
            type="text"
            class="form-control"
            placeholder="Phone"
            onChange={(e) => {
              setMobile(e.target.value);
            }}
          />
          <input
            type="email"
            class="form-control"
            placeholder="xxxx@gmail.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />

          <Button
            class="btn btn-lg btn-primary btn-block"
            type="submit"
            variant="outline-success"
          >
            Login
          </Button>
        </form>
      </div>
    </center>
  );
}

export default SignUpPat;
/*
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
*/
