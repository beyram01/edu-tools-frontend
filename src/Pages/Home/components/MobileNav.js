import React, { useState } from "react";
import { hamberger } from "../../../svgs";
import "../css/MobileNav.css";

const MobileNav = ({ setLoginModel, setRegisterModel }) => {
  const [clicked, setClicked] = useState(false);

  const openMenu = () => {
    setClicked(!clicked);
  };

  const openLoginModel = () => {
    setLoginModel(true);
  };

  const openRegisterModel = () => {
    setRegisterModel(true);
  };

  return (
    <>
      <div className={clicked ? "hidden-menu clicked" : "hidden-menu"}>
        <ul className="mobile-nav-links">
          <a href="/">
            <li className="mobile-nav-link" onClick={openMenu}>
              Home
            </li>
          </a>
          <a href="#contact">
            <li className="mobile-nav-link" onClick={openMenu}>
              Contact us
            </li>
          </a>
          <a href="#">
            <li
              className="mobile-nav-link"
              onClick={() => {
                openLoginModel();
                openMenu();
              }}
            >
              Login
            </li>
          </a>
          <a href="#">
            <li
              className="mobile-nav-link mobile-nav-fill"
              onClick={() => {
                openMenu();
                openRegisterModel();
              }}
            >
              Register
            </li>
          </a>
        </ul>
      </div>
      <div className="mobile-nav">
        <span id="logo">LOGO</span>
        <span onClick={openMenu}>{hamberger}</span>
      </div>
    </>
  );
};

export default MobileNav;
