import React, { useState, useRef } from "react";
import { close } from "../../../svgs";
import { loginUser } from "../../functions";
import { fetch_user } from "../../../Redux/user/userActions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useOnClickOutside from "use-onclickoutside";
import Spinner from "../../_GlobalComponents/Spinner";
import "../css/LoginPopup.css";

const BACKEND_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:1337"
    : "https://edu-tools.herokuapp.com";

const LoginPopup = ({ setLoginModel }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const modalRef = useRef(null);
  const closeLoginModel = () => {
    setLoginModel(false);
    setError("");
  };
  useOnClickOutside(modalRef, closeLoginModel);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await loginUser({
        identifier: formData.email,
        password: formData.password,
      });
      const errorExist = res.data[0];
      if (errorExist) {
        const errorMessage = res.data[0].messages[0].message;
        throw new Error(errorMessage);
      } else {
        const resData = {
          username: res.data.user.username,
          email: res.data.user.email,
          token: res.data.jwt,
        };
        dispatch(fetch_user(resData));
        setLoading(false);
        history.push("/dashboard");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="login-background">
      <div ref={modalRef} className="login-container">
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
            <a href="/forget-password">
              <p id="password-forget">forget your password?</p>
            </a>
          </div>
          <button type="submit" id="login" className="submit">
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
              "Login"
            )}
          </button>
          <p>Or Login with</p>
          <a
            href={`${BACKEND_URL}/connect/google`}
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
