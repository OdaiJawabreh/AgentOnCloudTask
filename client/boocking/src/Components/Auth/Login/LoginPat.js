import React, { useState } from "react";
import "./login.css";
import jwt from "jwt-decode";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function LoginPat() {
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
    axios
      .post("http://localhost:5000/login/patient", data)
      .then((result) => {
        let user = jwt(result.data.token);
        localStorage.setItem("token", JSON.stringify(user));
        localStorage.setItem("token1", result.data.token);

        history("/");
      })
      .catch((err) => {
        setMessage("please check your email and password");
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
          placeholder="Email Address"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          class="form-control"
          placeholder="Password"
          onChange={(e) => {
            console.log(e.target.value);
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

export default LoginPat;
/*

<div className="">
      <form className="" onSubmit={login}>
        <h2 className="">Please login</h2>
        <input
          type="text"
          className="form-control"
          name="username"
          placeholder="Email Address"
          required=""
          autoFocus=""
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
        />
        <input
          type="password"
          className="l"
          name="password"
          placeholder="Password"
          required=""
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />

        <button className="" type="submit">
          Login
        </button>
      </form>
      {message}
    </div>
*/
