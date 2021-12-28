import React , {useState}from "react";
import "./login.css";
import jwt from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginDoctor() {
  const [message , setMessage] = useState("")

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
    axios.post("http://localhost:5000/login/doctor", data).then((result) => {
      let user = jwt(result.data.token)
      localStorage.setItem("token", JSON.stringify(user));
      localStorage.setItem("token1",result.data.token);
      history("/");
    }).catch((err)=>{
      setMessage("Plese check your email ")
     })
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
      {message}
    </div>
  );
}

export default LoginDoctor;
