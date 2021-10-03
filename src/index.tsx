import React from "react";

import ReactDOM from "react-dom";

import App from "./App";

import "config/configureMobX"

import "regenerator-runtime"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
