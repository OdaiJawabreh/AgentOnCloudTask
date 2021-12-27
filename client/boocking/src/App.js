import React from 'react'
import SignSelect from './Components/SignSelect/SignSelect'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpDoct from './Components/Auth/SignupDoctor/SignUpDoct';
import LoginDoctor from './Components/Auth/Login/LoginDoctor';
import LoginPat from './Components/Auth/Login/LoginPat';
import SignUpPat from './Components/Auth/SignupPataint/SignUpPat';
function App() {
  return (
    <div>
      
      <Router>
        <Routes>
          <Route exact path="/signselect" element={<SignSelect/>} />
          <Route exact path="/doctor" element={<SignUpDoct/>} />
          <Route exact path="/pat" element={<SignUpPat/>} />
          <Route exact path="/loginDoctor" element={<LoginDoctor/>} />
          <Route exact path="/LoginPat" element={<LoginPat/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

