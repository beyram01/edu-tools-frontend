import React, { useState, useEffect } from "react";
import MobileNav from "../Home/components/MobileNav";
import Nav from "../Home/components/Nav";
import LoginPopup from "../Home/components/LoginPopup";
import RegisterPopup from "../Home/components/RegisterPopup";
import Spinner from "../_GlobalComponents/Spinner";
import { useLocation } from "react-router-dom";
import api from "../../axios.config";
import "./index.css";

const ResetPasswordPage = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [loginModel, setLoginModel] = useState(false);
  const [registerModel, setRegisterModel] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();

  useEffect(() => {
    window.onresize = () => setWidth(window.innerWidth);
  }, [width]);

  const handleChange = (e) => {
    setError("");
    setMessage("");
    if (e.target.name === "new-password") return setPassword(e.target.value);
    return setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const code = location.search.replace("?", "").split("=")[1];

      const res = await api.post("/auth/reset-password", {
        password: password,
        passwordConfirmation: confirmPassword,
        code: code,
      });
      console.log(res);
      if (res.data.error) throw new Error(res.data.error);
      setMessage("Password updated successfully");
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div class="reset-password-page">
      {loginModel && <LoginPopup setLoginModel={setLoginModel} />}
      {registerModel && <RegisterPopup setRegisterModel={setRegisterModel} />}

      {width >= 850 ? (
        <Nav
          setLoginModel={setLoginModel}
          setRegisterModel={setRegisterModel}
        />
      ) : (
        <MobileNav
          setLoginModel={setLoginModel}
          setRegisterModel={setRegisterModel}
        />
      )}
      <form onSubmit={handleSubmit}>
        <h5>Reset Password</h5>
        {message && (
          <div className="message-container">
            <p>
              {message}, <a href="/">Login here</a>
            </p>
          </div>
        )}
        {error && (
          <div className="error-container">
            <p>{error}</p>
          </div>
        )}
        <div>
          <label htmlFor="new-password">New Password</label>
          <input
            value={password}
            type="password"
            name="new-password"
            id="new-password"
            onChange={handleChange}
          />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            value={confirmPassword}
            type="password"
            name="confirm-password"
            id="confirm-password"
            onChange={handleChange}
          />
          <button type="submit">
            {loading ? (
              <Spinner
                cx="10"
                cy="10"
                r="10"
                width="100%"
                height="100%"
                color="#ffffff"
                spinnerWidth="25px"
                spinnerHeight="25px"
                strokeWidth="2px"
                transform="translate(2px, 2px)"
                strokeDasharray="80"
                strokeDashoffset="80"
              />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
