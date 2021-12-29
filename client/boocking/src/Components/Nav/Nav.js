import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useLocation } from "react-router";
import {
  Button,
  Navbar,
  Container,
  Form,
  FormControl,
  Nav,
} from "react-bootstrap";
import "./nav.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { setSearches } from "../../actions/search";
import { BiLogInCircle } from "react-icons/bi";
import { RiLogoutCircleLine } from "react-icons/ri";
function NavbarApp() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();
  const [state, setState] = useState("");
  const [firstName, setFirstName] = useState("");
  const [mobile, setMobile] = useState("");
  const [Doctor_Scout_from, setDoctor_Scout_from] = useState("");
  const [Doctor_Scout_to, setDoctor_Scout_to] = useState("");
  function getToken() {
    setState(JSON.parse(localStorage.getItem("token")));
    // doctor = jwt(localStorage.getItem("token"))
  }

  const submitSearch = async () => {
    console.log("ddddddddddd");
    const data = {
      firstName,
      mobile,
      Doctor_Scout_from,
      Doctor_Scout_to,
    };
    await axios.post("http://localhost:5000/app/search", data).then((res) => {
      console.log(res.data.result);
      dispatch(setSearches(res.data.result));
      if (location.pathname !== "/searchResul") {
        history("/searchResult");
      }
    });
  };

  function logout() {
    localStorage.clear();
    setState("");
    history("/LoginSelect");
  }
  useEffect(() => {
    getToken();
  }, [localStorage.getItem("token")]);

  return (
    <div>
      {!state ? (
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#" style={{color:"green"}}>SYT</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse
              id="navbarScroll"
              className="d-flex justify-content-center"
            >
              <Form className="d-flex ">
                <FormControl
                  type="search"
                  placeholder="name"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <FormControl
                  type="search"
                  placeholder="mobile"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                />
                <FormControl
                  type="search"
                  placeholder="Scout from"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {
                    setDoctor_Scout_from(e.target.value);
                  }}
                />
                <FormControl
                  type="search"
                  placeholder="Scout to"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {
                    setDoctor_Scout_to(e.target.value);
                  }}
                />
                <Button
                  variant="outline-success"
                  className="me-2"
                  onClick={() => {
                    submitSearch();
                  }}
                >
                  Search
                </Button>
              </Form>
            </Navbar.Collapse>
            <div className="d-flex justify-content-end">
              <Button
                variant="outline-success"
                className="me-2"
                onClick={() => history("/signselect")}
              >
                SignUP
              </Button>
              <Button
                variant="outline-success"
                className="me-2"
                onClick={() => history("/LoginSelect")}
              >
                {" "}
                <BiLogInCircle></BiLogInCircle>
              </Button>
            </div>
          </Container>
        </Navbar>
      ) : state.doctor_id ? (
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#">
              WLC Dr.<span style={{ color: "green" }}>{state.userName}</span>
            </Navbar.Brand>
            <Navbar.Collapse
              id="navbarScroll"
              className="d-flex justify-content-center"
            >
              <Nav className=" my-2 my-lg-0 " navbarScroll>
                <Link to="/SubimtedAppts" className="mynav">
                  Submited Appointments
                </Link>
                <Link to="/RequestAppointment" className="mynav">
                  Request Appointments
                </Link>
              </Nav>
            </Navbar.Collapse>
            <Button
              variant="outline-success"
              className="me-2 d-flex justify-content-end"
              onClick={() => {
                logout();
              }}
            >
              <RiLogoutCircleLine></RiLogoutCircleLine>
            </Button>
          </Container>
        </Navbar>
      ) : (
        <>
          <Navbar bg="light" expand="lg">
          <Container fluid>
          <Navbar.Brand href="#">
          WLC MR.<apan style={{ color: "green" }}>{state.userName}</apan>
              
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse
              id="navbarScroll"
              className="d-flex justify-content-center"
            >
              <Nav className=" my-0.2 my-lg-0 " navbarScroll>
                <Link to="/MyAppointment" className="app ">
                  Appointments
                </Link>
                
              </Nav>
            
              <Form className="d-flex ">
                <FormControl
                  type="search"
                  placeholder="name"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <FormControl
                  type="search"
                  placeholder="mobile"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                />
                <FormControl
                  type="search"
                  placeholder="Scout from"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {
                    setDoctor_Scout_from(e.target.value);
                  }}
                />
                <FormControl
                  type="search"
                  placeholder="Scout to"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {
                    setDoctor_Scout_to(e.target.value);
                  }}
                />
                <Button
                  variant="outline-success"
                  className="me-2"
                  onClick={() => {
                    submitSearch();
                  }}
                >
                  Search
                </Button>
              </Form>
            </Navbar.Collapse>
            <div className="d-flex justify-content-end">
            <Button
              variant="outline-success"
              className="me-2 d-flex justify-content-end p-2"
              onClick={() => {
                logout();
              }}
            >
              <RiLogoutCircleLine ></RiLogoutCircleLine>
            </Button>
            </div>
          </Container>
        </Navbar>
      
        </>
      )}
    </div>
  );
}

export default NavbarApp;
