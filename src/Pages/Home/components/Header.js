import React from "react";
import { education_svg } from "../../../svgs";
import "../css/Header.css";

const Header = ({ setRegisterModel }) => {
  const openRegisterModel = () => {
    setRegisterModel(true);
  };

  return (
    <section className="header">
      <div className="hero">
        <h1 className="hero-title">
          Lorem Ipsum is simply <span className="pirple">Dummy</span>
        </h1>
        <p className="hero-description">
          A new tool that blends your everyday work apps into one. It's the
          all-in-one workspace for you
        </p>
        <div className="call-to-action">
          <a href="/#contact" className="btn btn-stroke">
            Contact Us
          </a>
          <button className="btn btn-fill" onClick={openRegisterModel}>
            Get Started
          </button>
        </div>
      </div>
      {education_svg}
    </section>
  );
};

export default Header;
