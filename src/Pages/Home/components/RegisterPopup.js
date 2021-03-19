import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../functions";
import { fetch_user } from "../../../Redux/user/userActions";
import { useHistory } from "react-router-dom";
import { close } from "../../../svgs";
import "../css/LoginPopup.css";

const RegisterPopup = ({ setRegisterModel }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const history = useHistory();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (formData.username.length < 3) {
        throw new Error("username is too short.");
      }
      /*
      if (formData.password.length < 8) {
        throw new Error("password is too short.");
      }*/
      if (formData.confirmPassword !== formData.password) {
        throw new Error("You need to confirm your password");
      }
      const res = await registerUser({
        username: formData.username,
        email: formData.email,
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

  const closeRegisterModel = () => {
    setRegisterModel(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div onClick={closeRegisterModel}>{close}</div>
        <h3>Register</h3>
        {error && (
          <div className="error-container">
            <p>{error}</p>
          </div>
        )}
        <form method="POST" action="" id="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              required={true}
              value={formData.username}
              type="username"
              name="username"
              id="username"
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              required={true}
              value={formData.email}
              type="email"
              name="email"
              id="register-email"
              placeholder="Address Email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              required={true}
              value={formData.password}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm Password</label>
            <input
              required={true}
              value={formData.confirmPassword}
              type="password"
              name="confirmPassword"
              id="confirm-password"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
          </div>
          <button type="submit" id="register" className="submit">
            {loading ? "..." : "Register"}
          </button>
          <p>Or Register with</p>
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

export default RegisterPopup;
