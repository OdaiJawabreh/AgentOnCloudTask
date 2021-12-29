import React, { useState } from "react";
import "./login.css";
import jwt from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function LoginDoctor() {
  const [message, setMessage] = useState("");

  const history = useNavigate();

  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  function login(e) {
    e.preventDefault();
    let data = {
      email,
      pass,
    };
    console.log(data);
    axios
      .post("http://localhost:5000/login/doctor", data)
      .then((result) => {
        let user = jwt(result.data.token);
        localStorage.setItem("token", JSON.stringify(user));
        localStorage.setItem("token1", result.data.token);
        history("/RequestAppointment");
      })
      .catch((err) => {
        setMessage("Plese check your email ");
      });
  }
  return (
    <center>
      <div class="wrapper">
        <form class="form-signin" onSubmit={login}>
          <h2 class="form-signin-heading">Please login</h2>
          <input
            type="text"
            class="form-control"
            name="username"
            placeholder="Email Address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            class="form-control"
            name="password"
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

export default LoginDoctor;
