import React, { useEffect } from "react";
import api from "axios";
import { useDispatch } from "react-redux";
import { set_token } from "./Redux/user/userActions";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import HomePage from "./Pages/Home/index.js";
import Dashboard from "./Pages/Dashboard/index.js";
import "./css/App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(set_token());
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/connect/google/redirect">
            <GoogleAuth />
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Route path="*">
            <h1>404</h1>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

const PrivateRoute = ({ children, ...rest }) => {
  const token = localStorage.getItem("access_token");
  return (
    <>
      <Route
        {...rest}
        render={({ location }) =>
          token ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location },
              }}
            />
          )
        }
      />
    </>
  );
};
// handle the callback from google.
const GoogleAuth = () => {
  /* From react-router-dom documentation */
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const token = query.get("id_token");

  useEffect(() => {
    const getUserInformation = async () => {
      const res = await api.get(`/auth/google/callback?access_token=${token}`);
      console.log(res);
    };
    getUserInformation();
  }, []);

  return (
    <>
      <h1>Hello</h1>
    </>
  );
};

export default App;
