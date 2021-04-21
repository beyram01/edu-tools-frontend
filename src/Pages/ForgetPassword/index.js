import React, { useState, useEffect } from "react";
import MobileNav from "../Home/components/MobileNav";
import Nav from "../Home/components/Nav";
import LoginPopup from "../Home/components/LoginPopup";
import RegisterPopup from "../Home/components/RegisterPopup";
import Spinner from "../_GlobalComponents/Spinner";
import api from "../../axios.config";
import "./index.css";

const ForgetPasswordPage = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [loginModel, setLoginModel] = useState(false);
  const [registerModel, setRegisterModel] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    window.onresize = () => setWidth(window.innerWidth);
  }, [width]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/auth/forgot-password", { email });
      console.log(res);
      if (!res) throw new Error("Error has occured");
      if (res.data.error) throw new Error(res.data.error);
      setMessage(res.data.message);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="forget-password-page">
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
        <h5>Enter your Email Adresse</h5>
        {message && (
          <div className="message-container">
            <p>{message}</p>
          </div>
        )}
        {error && (
          <div className="error-container">
            <p>{error}</p>
          </div>
        )}
        <div>
          <input
            value={email}
            name="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
              setMessage("");
            }}
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
              "Reset Password"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgetPasswordPage;
