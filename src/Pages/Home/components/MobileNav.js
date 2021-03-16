import React, { useState } from "react";
import { hamberger } from "../../../svgs";
import "../css/MobileNav.css";

const MobileNav = () => {
  const [clicked, setClicked] = useState(false);

  const openMenu = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <div className={clicked ? "hidden-menu clicked" : "hidden-menu"}>
        <ul className="mobile-nav-links">
          <a href="#">
            <li className="mobile-nav-link">Home</li>
          </a>
          <a href="#">
            <li className="mobile-nav-link">Contact us</li>
          </a>
          <a href="#">
            <li className="mobile-nav-link">Login</li>
          </a>
          <a href="#">
            <li className="mobile-nav-link mobile-nav-fill">Register</li>
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
