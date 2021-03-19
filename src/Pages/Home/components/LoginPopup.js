import React, { useState } from "react";
import { close } from "../../../svgs";
import { loginUser } from "../../functions";
import { fetch_user } from "../../../Redux/user/userActions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import "../css/LoginPopup.css";

const LoginPopup = ({ setLoginModel }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const closeLoginModel = () => {
    setLoginModel(false);
    setError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await loginUser({
        identifier: formData.email,
        password: formData.password,
      });
      const resData = {
        username: res.data.user.username,
        email: res.data.user.email,
        token: res.data.jwt,
      };
      dispatch(fetch_user(resData));
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div onClick={closeLoginModel}>{close}</div>
        <h3>Login</h3>
        {error && (
          <div className="error-container">
            <p>{error}</p>
          </div>
        )}

        <form method="POST" id="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              value={formData.email}
              type="email"
              name="email"
              id="login-email"
              placeholder="Address Email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={formData.password}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <a href="#">
              <p id="password-forget">forget your password?</p>
            </a>
          </div>
          <button type="submit" id="login" className="submit">
            {loading ? "..." : "Login"}
          </button>
          <p>Or Login with</p>
          <a
            href="https://edu-tools.herokuapp.com/connect/google"
            target="_blank"
            type="submit"
            id="google"
            className="submit"
          >
            Google G
          </a>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
