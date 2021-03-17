import React from "react";
import "../css/Nav.css";

const Nav = ({ setLoginModel, setRegisterModel }) => {
  const openLoginModel = () => {
    setLoginModel(true);
  };
  const openRegisterModel = () => {
    setRegisterModel(true);
  };

  return (
    <div className="nav">
      <p id="logo">LOGO</p>
      <ul className="nav-links">
        <a href="/">
          <li className="nav-link">Home</li>
        </a>
        <a href="#contact">
          <li className="nav-link">Contact us</li>
        </a>
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
      </ul>
    </div>
  );
};

export default Nav;
