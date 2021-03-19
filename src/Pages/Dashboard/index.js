import React, { useState, useEffect } from "react";
import Nav from "../Home/components/Nav";
import MobileNav from "../Home/components/MobileNav";

const Dashboard = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.onresize = () => setWidth(window.innerWidth);
  }, [width]);

  return (
    <div>
      {width >= 850 ? <Nav /> : <MobileNav />}
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
