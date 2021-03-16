import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./Pages/Home/index.js";
import "./css/App.css";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="*">
            <h1>404</h1>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
