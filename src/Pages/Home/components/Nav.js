import React from "react";
import "../css/Nav.css";

const Nav = () => {
  return (
    <div className="nav">
      <p id="logo">LOGO</p>
      <ul className="nav-links">
        <a href="#">
          <li className="nav-link">Home</li>
        </a>
        <a href="#">
          <li className="nav-link">Contact us</li>
        </a>
        <a href="#">
          <li className="nav-link">Login</li>
        </a>
        <a href="#">
          <li className="nav-link nav-fill">Register</li>
        </a>
      </ul>
    </div>
  );
};

export default Nav;
