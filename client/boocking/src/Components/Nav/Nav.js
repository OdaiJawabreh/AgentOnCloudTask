import React, { useEffect, useState } from "react";
import jwt from "jwt-decode";
import {
  Button,
  Navbar,
  Container,
  Form,
  FormControl,
  link,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Nav() {
    const [state,setState] = useState("")
  const history = useNavigate();
  function getToken(){
    setState(localStorage.getItem("token"))
  }
  

  function logoutDoctor() {
    localStorage.clear();
  }
  useEffect(() => {
    getToken();
  },[localStorage.getItem("token")]);
  console.log(state);
  return (
    <div>
      {!state ? (
        <div className="container">
        <div className="MainNav">
          <Navbar.Brand href="/">SYT</Navbar.Brand>
          <div className="btn-option">
            <button
              className="btn-signup"
              onClick={() => history("/signselect")}
            >
              {" "}
              Sign Up
            </button>
            <button
              className="btn-Login"
              onClick={() => history("/LoginSelect")}
            >
              {" "}
              Login
            </button>
          </div>
        </div>
      </div>
      ) : state.doctor_id ? (
        <div className="container">
          <div className="MainNav">
            <div className="logoName">
              <span>Hi Dr.{state.firstName}</span>
            </div>
            
              <button
                onClick={() => {
                  logoutDoctor();
                }}
              >
                logout
              </button>
             
           
          </div>
        </div>
      ) : (
        <>
      
       <Navbar bg="light" expand="lg">
       <Container>
         <Form className="d-flex">
           <Navbar.Brand href="/">SYT</Navbar.Brand>
           <Navbar.Brand href="#">MyAppointment</Navbar.Brand>

           <FormControl
             type="search"
             placeholder="name"
             className="me-0.5"
             aria-label="Search"
           />
           <FormControl
             type="search"
             placeholder="mobile"
             className="me-0.5"
             aria-label="Search"
           />
           <FormControl
             type="search"
             placeholder="Scout from"
             className="me-0.5"
             aria-label="Search"
           />
           <FormControl
             type="search"
             placeholder="Scout to"
             className="me-0.5"
             aria-label="Search"
           />
           <Button variant="outline-success">Search</Button>

           <button
             onClick={() => {
               logoutDoctor();
             }}
           >
             logout
           </button>
         </Form>
       </Container>
     </Navbar>
   </>

      )}
    </div>
  );
}

export default Nav;

