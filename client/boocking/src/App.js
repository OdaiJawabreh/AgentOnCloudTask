import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import SignSelect from "./Components/SignSelect/SignSelect";
import LoginSelect from "./Components/LoginSelect/LoginSelect";
import { Route, Routes } from "react-router-dom";
import SignUpDoct from "./Components/Auth/SignupDoctor/SignUpDoct";
import LoginDoctor from "./Components/Auth/Login/LoginDoctor";
import LoginPat from "./Components/Auth/Login/LoginPat";
import SignUpPat from "./Components/Auth/SignupPataint/SignUpPat";
import NavbarApp from "./Components/Nav/Nav";
import SearchResult from "./Components/SearchResulr/SearchResult";
import Boocking from "./Components/Boocking/Boocking";
import MyAppointment from "./Components/MyAppointment/MyAppointment";
import SubimtedAppts from "./SubimtedAppts/SubimtedAppts";
import EditAppt from "./Components/EditAppt/EditAppt";
import MainPage from "./Components/MainPage/MainPage";
import RequestAppointment from "./Components/RequestAppointments/RequestAppointment";
function App() {
  return (
    <>
      <NavbarApp />
      <Routes>
        <Route exact path="/signselect" element={<SignSelect />} />
        <Route exact path="/LoginSelect" element={<LoginSelect />} />
        <Route exact path="/doctor" element={<SignUpDoct />} />
        <Route exact path="/pat" element={<SignUpPat />} />
        <Route exact path="/loginDoctor" element={<LoginDoctor />} />
        <Route exact path="/LoginPat" element={<LoginPat />} />
        <Route exact path="/searchResult" element={<SearchResult />} />
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/boocking/:id" element={<Boocking />} />
        <Route
          exact
          path="/RequestAppointment"
          element={<RequestAppointment />}
        />
        <Route exact path="/MyAppointment" element={<MyAppointment />} />
        <Route
          exact
          path="/MyAppointment3/boockings/:id"
          element={<EditAppt />}
        />

        <Route exact path="/SubimtedAppts" element={<SubimtedAppts />} />
      </Routes>
    </>
  );
}

export default App;
