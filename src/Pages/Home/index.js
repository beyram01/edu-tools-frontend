import React, { useState, useEffect } from "react";
import MobileNav from "./components/MobileNav";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoginPopup from "./components/LoginPopup";
import RegisterPopup from "./components/RegisterPopup";

const HomePage = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [loginModel, setLoginModel] = useState(false);
  const [registerModel, setRegisterModel] = useState(false);
  useEffect(() => {
    window.onresize = () => setWidth(window.innerWidth);
  }, [width]);
  return (
    <div id="landing-page">
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
      <Header setLoginModel={setLoginModel} />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;
