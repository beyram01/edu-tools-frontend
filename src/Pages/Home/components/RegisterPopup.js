import React, { useState } from "react";
import { close } from "../../../svgs";
import "../css/LoginPopup.css";

const RegisterPopup = ({ setRegisterModel }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
        <form action="" id="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
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
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm Password</label>
            <input
              value={formData.confirmPassword}
              type="password"
              name="confirmPassword"
              id="confirm-password"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
          </div>
          <button type="submit" id="register" className="submit">
            Register
          </button>
          <p>Or Register with</p>
          <button type="submit" id="google" className="submit">
            Google G
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPopup;
