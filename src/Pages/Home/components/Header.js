import React from "react";
import { education_svg } from "../../../svgs";
import "../css/Header.css";

const Header = () => {
  return (
    <section className="header">
      <div className="hero">
        <h1 className="hero-title">
          Lorem Ipsum is simply <span className="pirple">Dummy</span>
        </h1>
        <p className="hero-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </p>
        <div className="call-to-action">
          <button className="btn btn-stroke">Try Our Tools</button>
          <button className="btn btn-fill">Get Started</button>
        </div>
      </div>
      {education_svg}
    </section>
  );
};

export default Header;