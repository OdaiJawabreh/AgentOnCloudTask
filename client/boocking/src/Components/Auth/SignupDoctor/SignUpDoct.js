import React, { useState } from "react";
import "./doctor.css";
import { storage } from "../../Firbase/Firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Login/login.css";
import { Button } from "react-bootstrap";
function SignUpDoct() {
  const history = useNavigate();
  const [img, setImg] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [mobile, setMobile] = useState("");
  const [descriptionn, setDescriptionn] = useState("");
  const [address, setAddress] = useState("");
  const [Doctor_Scout, setDoctor_Scout] = useState("");
  const [major, setMajor] = useState("");
  const signUp = (e) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      pass,
      mobile,
      img,
      Doctor_Scout,
      descriptionn,
      address,
      major,
    };
    console.log(data);
    axios.post("http://localhost:5000/signDoc", data).then((result) => {
      history("/LoginDoctor");
    });
  };
  const addMainIm = (e) => {
    if (e.target.files[0]) {
      let doctorImg = e.target.files[0];
      let uploadTask = storage.ref(`images/${doctorImg.name}`).put(doctorImg);
      uploadTask.on(
        "state_change",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(doctorImg.name)
            .getDownloadURL()
            .then(async (url) => {
              setImg(url);
            });
        }
      );
    }
  };
  return (
    <center>
      <div class="wrapper">
        <form class="form-signin" onSubmit={signUp}>
          <h2 class="form-signin-heading">Sign Up</h2>
          <input
            placeholder="Main Img"
            type="file"
            className="form-control "
            title="addMainIm"
            id="main"
            onChange={addMainIm}
          />
          <input
            type="text"
            placeholder="First name"
            className="form-control "
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control "
            placeholder="Last name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control "
            placeholder="Phone"
            onChange={(e) => {
              setMobile(e.target.value);
            }}
          />
          <input
            type="email"
            className="form-control "
            placeholder="doctor@gmail.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            className="form-control "
            placeholder="Password"
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          <input
            type="password"
            className="form-control "
            placeholder="Scout"
            onChange={(e) => {
              setDoctor_Scout(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control "
            placeholder="major"
            onChange={(e) => {
              setMajor(e.target.value);
            }}
          />
          <textarea
            id="formGroupExampleInput"
            placeholder="Choose discription"
            className="form-control "
            onChange={(e) => {
              setDescriptionn(e.target.value);
            }}
          />
          <textarea
            className="form-control "
            id="formGroupExampleInput2"
            placeholder="Enter youre Address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <Button
            class="btn btn-lg btn-primary btn-block"
            type="submit"
            variant="outline-success"
          >
            Create account
          </Button>
        </form>
      </div>
    </center>
  );
}

export default SignUpDoct;

