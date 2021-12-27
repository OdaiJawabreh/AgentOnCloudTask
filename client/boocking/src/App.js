import React from 'react'
import SignSelect from './Components/SignSelect/SignSelect'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpDoct from './Components/Auth/SignupDoctor/SignUpDoct';


function App() {
  return (
    <div>
      
      <Router>
        <Routes>
          <Route exact path="/signselect" element={<SignSelect/>} />
          <Route exact path="/doctor" element={<SignUpDoct/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

