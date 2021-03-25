import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "../Home/components/Nav";
import MobileNav from "../Home/components/MobileNav";
import ToolsNav from "./components/ToolsNav";
import Translator from "./components/Translator";
import Encyclopedia from "./components/Encyclopedia";
import Events from "./components/Events";

const Dashboard = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const params = useParams();

  useEffect(() => {
    window.onresize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
  }, [width, height]);

  return (
    <div>
      {width >= 850 ? <Nav /> : <MobileNav />}
      <div
        className="dashboard-container"
        style={{
          display: "flex",
          height:
            height > 560
              ? width >= 850
                ? "calc(100vh - 66.59px)"
                : "calc(100vh - 62px)"
              : "auto",
          position: "relative",
        }}
      >
        <ToolsNav />
        {params.tool === "translator" && <Translator />}
        {params.tool === "encyclopedia" && <Encyclopedia />}
        {params.tool === "events" && <Events width={width} />}
      </div>
    </div>
  );
};

export default Dashboard;
