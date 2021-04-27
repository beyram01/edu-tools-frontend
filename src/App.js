import React, { useState, useEffect } from "react";
import api from "./axios.config";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetch_user, delete_token } from "./Redux/user/userActions";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import HomePage from "./Pages/Home/index.js";
import Dashboard from "./Pages/Dashboard/index.js";
import ForgetPasswordPage from "./Pages/ForgetPassword/index.js";
import ResetPasswordPage from "./Pages/ResetPassword/index.js";
import Spinner from "./Pages/_GlobalComponents/Spinner";
import "./css/App.css";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (token) {
          const res = await api.get("/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cancelToken: source.token,
          });
          console.log(res);
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

    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    if (location.hash) {
      const contactContainer = document.querySelector(location.hash);
      if (contactContainer) {
        contactContainer.scrollIntoView();
      }
    }
  });

  return !loading ? (
    <>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/forget-password">
          <ForgetPasswordPage />
        </Route>
        <Route exact path="/reset-password">
          <ResetPasswordPage />
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
    </>
  ) : (
    <Spinner cx="20" cy="20" r="20" width="100%" height="100vh" />
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
          "Sorry your request to login failed. Wait Your page will Redirect automatically... 😦 "
        );
        setTimeout(() => history.push("/"), 3000);
      }
    };
    getUserInformation();
  }, []);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>
        {error
          ? error
          : "You logged in successfully, Wait Your page will Redirect automatically... 🙂 "}
      </h2>
    </>
  );
};

export default App;
