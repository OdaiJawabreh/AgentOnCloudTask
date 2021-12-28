import React from "react";
import App from "./App";
import ReactDOM from "react-dom";
import store from "./reducer";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
    ,document.getElementById('root')
);

/*
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Provider } from "react-redux";

import store from "./reducer";
import {
  BrowserRouter as Router
} from "react-router-dom";
ReactDOM.render(
  <Router>

  <Provider store={store}>
    <App />
  </Provider>
  </Router>,
  document.getElementById("root")
);

*/
