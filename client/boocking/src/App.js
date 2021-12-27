import React, { createContext, useState } from "react";
import SignSelect from "./Components/SignSelect/SignSelect";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpDoct from "./Components/Auth/SignupDoctor/SignUpDoct";
import LoginDoctor from "./Components/Auth/Login/LoginDoctor";
import LoginPat from "./Components/Auth/Login/LoginPat";
import SignUpPat from "./Components/Auth/SignupPataint/SignUpPat";
export const tokenContext = createContext();

function App() {
  const [token, setToken] = useState();
  const state = { token, setToken };
  return (
    <div>
      <tokenContext.Provider value={state}>
      <Router>
        <Routes>
          <Route exact path="/signselect" element={<SignSelect />} />
          <Route exact path="/doctor" element={<SignUpDoct />} />
          <Route exact path="/pat" element={<SignUpPat />} />
          <Route exact path="/loginDoctor" element={<LoginDoctor />} />
          <Route exact path="/LoginPat" element={<LoginPat />} />
        </Routes>
      </Router>
      </tokenContext.Provider >
    </div>
  );
}

export default App;
