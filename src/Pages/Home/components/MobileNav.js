import React, { useState, useEffect } from "react";
import { hamberger } from "../../../svgs";
import { checkAuthentication, logoutUser } from "../../functions";
import { useHistory } from "react-router-dom";
import "../css/MobileNav.css";

const MobileNav = ({ setLoginModel, setRegisterModel }) => {
  const [clicked, setClicked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setAuthenticated(checkAuthentication());
  }, []);

  const openMenu = () => {
    setClicked(!clicked);
  };

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
    <>
      <div className={clicked ? "hidden-menu clicked" : "hidden-menu"}>
        <ul className="mobile-nav-links">
          <a href="/">
            <li className="mobile-nav-link" onClick={openMenu}>
              Home
            </li>
          </a>
          <a href="/#contact">
            <li className="mobile-nav-link" onClick={openMenu}>
              Contact us
            </li>
          </a>
          {authenticated ? (
            <>
              <a href="/dashboard/translator">
                <li className="mobile-nav-link">Dashboard</li>
              </a>
              <a href="">
                <li
                  className="mobile-nav-link mobile-nav-fill"
                  onClick={logout}
                >
                  Logout
                </li>
              </a>
            </>
          ) : (
            <>
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
            </>
          )}
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
