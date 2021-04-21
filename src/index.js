import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import store from "./Redux/store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
