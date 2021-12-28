import React, { useState } from "react";
import "./doctor.css";
import { storage } from "../../Firbase/Firebase";
import axios from "axios";
import { useNavigate  } from "react-router-dom";

function SignUpDoct() {
  const history = useNavigate()
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

  const signUp =  (e)=> {
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
    };
    axios
    .post("http://localhost:5000/signDoc", data )
    .then((result)=>{
      history("/LoginDoctor")
    }).catch(err=>console.log(err))
  }
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
    <div className="container">
      <div>
        <div>
          <h2>Sign up</h2>
          <form onSubmit={signUp}>
            <div>
              <span>Add main Img </span>
              <br></br>
              <input
                placeholder="Main Img"
                type="file"
                className="form-control "
                title="addMainIm"
                id="main"
                onChange={addMainIm}
              />
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
                type="email"
                placeholder="doctor@gmail.com"
                onChange={(e) => {
                  setEmail(e.target.value);
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
              {" "}
              <input
                type="password"
                placeholder="Scout"
                onChange={(e) => {
                  setDoctor_Scout(e.target.value);
                }}
              />{" "}
            </div>
            <div>
              {" "}
              <input
                type="text"
                placeholder="major"
                onChange={(e) => {
                  setMajor(e.target.value);
                }}
              />{" "}
            </div>
            <div>
              <textarea
                id="formGroupExampleInput"
                placeholder="Choose discription"
                onChange={(e) => {
                  setDescriptionn(e.target.value);
                }}
              />
            </div>
            <div>
              <textarea
                id="formGroupExampleInput2"
                placeholder="Enter youre Address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
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
      </div>
    </div>
  );
}

export default SignUpDoct;
