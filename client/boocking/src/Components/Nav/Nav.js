import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useLocation } from "react-router";
import { setSearches } from "../../actions/search";
import { Button, Navbar, Container, Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Nav() {
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
    const data = {
      firstName,
      mobile,
      Doctor_Scout_from,
      Doctor_Scout_to,
    };
    await axios
      .post("http://localhost:5000/app/search", data)
      .then((res) => {
        dispatch(setSearches(res.data.result));
        if (location.pathname !== "/searchResul") {
          history("/searchResult");
        }
      })
      .catch((err) => {
        console.log(err);
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
        <div className="container">
          <div className="MainNav">
            <Navbar.Brand href="/">SYT</Navbar.Brand>
            <FormControl
              type="search"
              placeholder="name"
              className="me-0.5"
              aria-label="Search"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <FormControl
              type="search"
              placeholder="mobile"
              className="me-0.5"
              aria-label="Search"
              onChange={(e) => {
                setMobile(e.target.value);
              }}
            />
            <FormControl
              type="search"
              placeholder="Scout from"
              className="me-0.5"
              aria-label="Search"
              onChange={(e) => {
                setDoctor_Scout_from(e.target.value);
              }}
            />
            <FormControl
              type="search"
              placeholder="Scout to"
              className="me-0.5"
              aria-label="Search"
              onChange={(e) => {
                setDoctor_Scout_to(e.target.value);
              }}
            />
            <Button
              variant="outline-success"
              onClick={() => {
                submitSearch();
              }}
            >
              Search
            </Button>
            <div className="btn-option">
              <button
                className="btn-signup"
                onClick={() => history("/signselect")}
              >
                Sign Up
              </button>
              <button
                className="btn-Login"
                onClick={() => history("/LoginSelect")}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      ) : state.doctor_id ? (
        <div className="container">
          <div className="MainNav">
            <span>Hi Dr.{state.userName}</span>

            <Link className="nav-item nav-link active" to="/SubimtedAppts">
              Submited Appointments
            </Link>
            <Link className="nav-item nav-link active" to="/RequestAppointment">
              Request Appointments
            </Link>

            <button
              onClick={() => {
                logout();
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
                <Link to="/MyAppointment">MyAppointment</Link>
                {/* <Link to='/MyAppointment'>MyAppointment</Link> */}
                {/* <Navbar.Brand href="/MyAppointment">MyAppointment</Navbar.Brand> */}

                <FormControl
                  type="search"
                  placeholder="name"
                  className="me-0.5"
                  aria-label="Search"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <FormControl
                  type="search"
                  placeholder="mobile"
                  className="me-0.5"
                  aria-label="Search"
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                />
                <FormControl
                  type="search"
                  placeholder="Scout from"
                  className="me-0.5"
                  aria-label="Search"
                  onChange={(e) => {
                    setDoctor_Scout_from(e.target.value);
                  }}
                />
                <FormControl
                  type="search"
                  placeholder="Scout to"
                  className="me-0.5"
                  aria-label="Search"
                  onChange={(e) => {
                    setDoctor_Scout_to(e.target.value);
                  }}
                />
                <Button
                  variant="outline-success"
                  onClick={() => {
                    submitSearch();
                  }}
                >
                  Search
                </Button>

                <button
                  onClick={() => {
                    logout();
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
