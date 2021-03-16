import React from "react";
import MobileNav from "./components/MobileNav";
import Nav from "./components/Nav";
import Header from "./components/Header";

const HomePage = () => {
  return (
    <div id="landing-page">
      {window.innerWidth >= 850 ? <Nav /> : <MobileNav />}
      <Header />
    </div>
  );
};

export default HomePage;
