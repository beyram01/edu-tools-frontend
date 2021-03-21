import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "../Home/components/Nav";
import MobileNav from "../Home/components/MobileNav";
import ToolsNav from "./components/ToolsNav";
import Translator from "./components/Translator";
import Encyclopedia from "./components/Encyclopedia";

const Dashboard = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const params = useParams();

  useEffect(() => {
    window.onresize = () => setWidth(window.innerWidth);
  }, [width]);

  return (
    <div>
      {width >= 850 ? <Nav /> : <MobileNav />}
      <div
        className="dashboard-container"
        style={{
          display: "flex",
          height: width >= 850 ? "calc(100vh - 66.59px)" : "calc(100vh - 62px)",
          position: "relative",
        }}
      >
        <ToolsNav />
        {params.tool === "translator" && <Translator />}
        {params.tool === "encyclopedia" && <Encyclopedia />}
      </div>
    </div>
  );
};

export default Dashboard;
