import React from "react";
import { checkAuthentication, logoutUser } from "../../functions";
import { useHistory } from "react-router-dom";
import "../css/Nav.css";

const Nav = ({ setLoginModel, setRegisterModel }) => {
  const history = useHistory();

  const openLoginModel = () => {
    setLoginModel(true);
  };
  const openRegisterModel = () => {
    setRegisterModel(true);
  };
  const logout = () => {
    logoutUser();
    history.push("/");
  };

  return (
    <div className="nav">
      <p id="logo">LOGO</p>
      <ul className="nav-links">
        <a href="/">
          <li className="nav-link">Home</li>
        </a>
        <a href="/#contact">
          <li className="nav-link">Contact us</li>
        </a>
        {checkAuthentication() ? (
          <>
            <a href="/dashboard/translator">
              <li className="nav-link">Dashboard</li>
            </a>
            <a href="">
              <li className="nav-link nav-fill" onClick={logout}>
                Logout
              </li>
            </a>
          </>
        ) : (
          <>
            <a href="#">
              <li className="nav-link" onClick={openLoginModel}>
                Login
              </li>
            </a>
            <a href="#">
              <li className="nav-link nav-fill" onClick={openRegisterModel}>
                Register
              </li>
            </a>
          </>
        )}
      </ul>
    </div>
  );
};

export default Nav;
