import React, { useState } from "react";
import { close } from "../../../svgs";
import "../css/LoginPopup.css";

const LoginPopup = ({ setLoginModel }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const closeLoginModel = () => {
    setLoginModel(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div onClick={closeLoginModel}>{close}</div>
        <h3>Login</h3>
        <form action="" id="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              value={formData.email}
              type="email"
              name="email"
              id="email"
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
            Login
          </button>
          <p>Or Login with</p>
          <button type="submit" id="google" className="submit">
            Google G
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
