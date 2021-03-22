import React, { useState, useEffect } from "react";
import api from "./axios.config";
import { useDispatch } from "react-redux";
import { fetch_user, delete_token } from "./Redux/user/userActions";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import HomePage from "./Pages/Home/index.js";
import Dashboard from "./Pages/Dashboard/index.js";
import "./css/App.css";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("access_token");
        if (token) {
          const res = await api.get("/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.status === 200) {
            dispatch(
              fetch_user({
                username: res.data.username,
                email: res.data.email,
                token: token,
              })
            );
          }
        }
        setLoading(false);
      } catch (error) {
        dispatch(delete_token());
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return !loading ? (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/connect/google/redirect">
            <GoogleAuth />
          </Route>
          <PrivateRoute exact path="/dashboard">
            <Redirect to="/dashboard/translator" />
          </PrivateRoute>
          <PrivateRoute exact path="/dashboard/:tool">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/dashboard/:tool/:title">
            <Dashboard />
          </PrivateRoute>
          <Route path="*">
            <h1>404</h1>
          </Route>
        </Switch>
      </Router>
    </>
  ) : (
    <h1>loading...</h1>
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
  const [error, setError] = useState("");
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserInformation = async () => {
      try {
        const res = await api.get(`/auth/google/callback${location.search}`);
        const token = res.data.jwt;
        localStorage.setItem("access_token", token);
        dispatch(
          fetch_user({
            username: res.data.user.username,
            email: res.data.user.email,
            token: token,
          })
        );
        setTimeout(() => history.push("/dashboard"), 3000);
      } catch (error) {
        setError(
          "Sorry your request to login failed. Wait Your page will Redirect automatically..."
        );
        setTimeout(() => history.push("/"), 3000);
      }
    };
    getUserInformation();
  }, []);

  return (
    <>
      <h1>
        {error
          ? error
          : "You logged in successfully, Wait Your page will Redirect automatically..."}
      </h1>
    </>
  );
};

export default App;
