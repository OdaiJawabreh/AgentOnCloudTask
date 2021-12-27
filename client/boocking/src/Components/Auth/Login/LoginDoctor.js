import React , {useState ,useContext}from "react";
import "./login.css";
import { tokenContext } from "../../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginDoctor() {
  const history = useNavigate();
  const state = useContext(tokenContext);
  console.log(state);
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  function login(e) {
    e.preventDefault();
    let data = {
      email,
      pass,
    };
    console.log(data);
    axios.post("http://localhost:5000/login/doctor", data).then((result) => {
      localStorage.setItem("token", result.data.token);
      state.setToken(result.data.token);
      history("/");
    });
  }
  return (
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
          onChange={(e) => {
            setEmail(e.target.value);
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
    </div>
  );
}

export default LoginDoctor;
